<template>
    <section class="min-vh-100 w-100 center bgBlank" >
        <nav class="w-100 center cf inline-flex items-center w-100">
            <span class="inline-flex items-center w-100">
                <p class="center tracked white">BackPocket Wallet</p>
            </span>
        </nav>

        <div class="center mw7 mw6-l" >
            <article class="dt center w-100">
                <div class="dtc tc pa0 v-mid vh-75 min-vh-75 f6 near-white">

                    <section>
                        <div class="cf w-100 pt5-l"></div>    
                        
                        <div class="pa2 cf w-100 center relative" style="max-width:320px">
                            <notify :notifications="notifications" />
                        </div>

                        <img src="@/assets/img/logo-icon.png" class="w4 " />

                        <div class="pa2 cf w-100 center" style="max-width:320px" >

                            <span class="dn" :class="{'db':!mobileHide}">
                                <p class="fl w-100 white f6 tl pl3 mb1"> Enter your Mobile: </p>
                                <mobilebox :mobile="mobile" @update="updateMobile"/>
                            </span>

                            <p class="fl w-100 white f6 tl pl3 mb1"> Enter your Pin:</p>
                            <pinbox :pin="pin" @update="updatePin" />

                            <div class="fl w-100">
                                <span class="fl no-underline" @click="record.Username=''">
                                    <p class="fl white f7 mt1 pl3 pointer"><small @click="mobileToggle"> {{mobileState}} Mobile</small></p>
                                </span>

                                <router-link to="/restore" class="fr no-underline">
                                    <p class="fr white f7 mt1 pr3"><small>Forgot Pin?</small></p>
                                </router-link>
                            </div>

                            <div class="cf w-100"></div>


                            <span v-if="lSignin" @click="signin" class="cf tl br1 no-underline inline-flex items-center white button relative pointer">
                                <span class="ph2 tracked">UNLOCK</span> <i class="bg-black-50 pa2 br1 br--right fal fa-sign-in"></i>
                            </span>

                            <div class="cf w-100 pv3"></div>
                            <router-link to="/signup" class="cf no-underline">
                                <p class="near-white f7">Don't have a wallet yet? <label class="ml3 navy bg-white f7 br2 pa1 ph2">Setup Wallet</label></p>
                            </router-link>
                        
                        </div>
                    </section>

                    <div v-if="walletsList.length>0" class=" f6 avenir white w-100 pa2 ">
                        <div class="bg-white black br1 w-100 pa2 tc">
                        <article class="w-100 pv3">
                            Please select Wallet to open
                        </article>
                        <div class=" overflow-scroll w-100" style="max-height:16rem">
                            <article v-for="(wallet, index) in walletsList" :key="index"  class="w-100 pv2 bt b--black-05" @click="walletSelected=index, walletsListTemp = walletsList, walletsList = [], walletsList = walletsListTemp">
                            <span class="cf tl w-75 inline-flex  items-center">
                                <span class="oi f2 " data-glyph="media-record" :class="{'dark-green':walletSelected==index, 'near-white':walletSelected!==index}"></span>
                                <label class="pl1 mb2">{{wallet.Title}}</label> 
                            </span>
                            </article>
                        </div>
                        </div>

                        <div class="cf mv2"></div>
                        <div class="tr">
                        <span onclick="open" class="cf w3 tr no-underline inline-flex items-center pa2 white button relative">
                            OPEN
                            <img src="@/assets/arrow-right.png" class="absolute right-0 pr2"/>
                        </span>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common";
  import {checkRedirect} from "@/common";

  import notify from "@/components/generics/notify";
  import pinbox from "@/components/generics/pinbox";
  import mobilebox from "@/components/generics/mobilebox";

  export default {
    data() {return{
        notifications: [], 
        lSignin: true, walletsList: [], curWallet:0,
        record : {Username: '', Password: ''},
        mobileHide:false, mobileState:"Hide",
        mobile:"", pin:"", url: '/api/login'
    }},
    components: {
        notify, pinbox, mobilebox
    },
    created(){
        if (this.$route.query.extraData == 'signup') {
            this.notifications.push({
                Code: 200,
                Message: 'Wallet created successfully!'
            })
        } else {
            this.getUsername()
        }
    },
    methods: {
        mobileToggle(){
            this.record.Username = this.mobile;
            this.mobileHide = !this.mobileHide   
            if(this.record.Username.length !== 11) {
                this.mobileHide = false;
            }else {
                this.setUsername()
            }
            if(this.mobileHide) {
                this.mobileState = "Change"
            } else {
                this.mobileState = "Hide"
            }
        },
        getUsername(){
            var username = window.localStorage.getItem('username');
            if(username !== null && username.length == 11) {
                this.mobile = this.record.Username = username
                this.mobileToggle()
            }
        },
        setUsername(){
            if(this.record.Username.length == 11) {
                window.localStorage.setItem('username', this.record.Username);
            }
        },
        updatePin(pin) {
            this.pin = pin
            if (pin.length == 4) {
                this.signin()
            }
        },
        updateMobile(mobile) {
            this.mobile = mobile
        },
        signin() {
            this.record.Username = this.mobile;

            if(this.record.Username.length == 11) {
                this.setUsername()
            }
            
            if (this.record.Username == '') {
                this.notifications.push({
                Code: 500,
                Message: 'Mobile is required!'
                })
                return
            }
            if(this.record.Username.length != 11) {
                this.notifications.push({ Code: 500, Message: 'Mobile must be 11 digits!' })
                return
            }
            
            
            this.record.Password = this.pin;
            if (this.record.Password == '') {
                this.notifications.push({
                Code: 500,
                Message: 'Pin is required!'
                })
                return
            }
            if(this.record.Password.length != 4) {
                this.notifications.push({ Code: 500, Message: 'Pin must be 4 characters!' })
                return
            }

            const app = this
            app.lSignin = false;
            app.notifications = [{ Message: 'verifying credentials...'}]
            HTTP.post('/api/login',app.record,{withCredentials: true}).then((response) => {
                app.notifications = [];
                app.notifications.push(response.data)
                if (response.data.Body !== null && response.data.Body !== undefined) {
                    var respBody = response.data.Body;
                    if (respBody.Wallets !== null && respBody.Wallets !== undefined && respBody.Wallets !== "") {
                        app.walletSelected = 0;
                        app.walletsList = respBody.Wallets
                        // page.switchWallet();
                        // page.showNext("wallets");
                    }
                }
                
                setTimeout(function(){checkRedirect(response.data)},500)
                app.lSignin = true;

            }).catch((e) => { app.lSignin = true; console.log(e) })
        }
    }
  }
</script>
