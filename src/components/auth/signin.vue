<template>
    <section class="h-100 tc">
        <div class=" w-100 fl pt3">
            <img src="@/assets/img/logo.png" class="db center h2" />
            <div class="fl w-100" style="min-height:14em;">
                <img src="@/assets/img/icon-signin.png" class="db center w-90" />
            </div>
        </div>
        <div class=" w-100  fl dt">
            <div class="dtc v-top bg-white">
                <div class="fl w-100"> 
                    <p class="f4 fw1 tracked black">Sign In </p>
                </div>
                
                <div class="pa2 cf w-100 center relative" style="max-width:320px">
                    <notify :notifications="notifications" />
                </div>

                <div class="w-100 center pv2 ">
                    <div class="dn center w-80" :class="{'db':!mobileHide}">
                        <mobilebox :mobile="mobile" @update="updateMobile"/>

                        <div class="cf center w-100">
                            <router-link to="/signup" class="cf no-underline items-center inline-flex mt3">
                                <p class="near-black f8 fl tl">Don't have a wallet yet? </p>
                                <buttonsmall class="fr ml3" title="Setup Wallet"/>
                            </router-link>
                        </div>
                    </div>

                    <div class="dn center w-80" :class="{'db':mobileHide}">
                        
                        <pinbox class="" :pin="pin" title="Enter your Pin" @update="updatePin" />
                        

                        <div class="fl w-50 pt3" @click="mobileToggle">  <buttonsmall class="fl" icon="fa-repeat" title="Retry" />  </div>
                        <div class="fl w-50 pt3" @click="signin">  <buttonsmall class="fr" icon="fa-check" title="Verify"/>  </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common";
  import {checkRedirect} from "@/common";

  import notify from "@/components/generics/notify";
  import pinbox from "@/components/generics/pinbox";
  import mobilebox from "@/components/generics/mobilebox";

  import buttonsmall from "@/components/generics/buttonsmall";

  export default {
    data() {return{
        notifications: [],
        lSignin: true, walletsList: [], curWallet:0,
        record : {Username: '', Password: ''},
        mobileHide:false, mobileState:"Hide",
        mobile:"", pin:"", url: '/api/login'
    }},
    components: {
        notify, pinbox, mobilebox, buttonsmall
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
            this.mobileHide = !this.mobileHide   
            if(this.record.Username.length == 11) {
                this.setUsername()
            }
        },
        getUsername(){
            var username = window.localStorage.getItem('username');
            if(username !== null && username.length == 11) {
                this.mobile = this.record.Username = username
                // this.mobileToggle()
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
        submitMobile(){
            if (this.mobile.length == 11) {
                this.mobileToggle()
            }
        },
        keyUPMobile(event){
            if(event.code.includes("Arrow")) { return }

            this.mobile = this.mobile.replace(/[^0-9\.]+/g, '');
            if(this.mobile.length>11){
                this.mobile = this.mobile.slice(0, 11);
            }

            if(event.code == "Backspace") { return }

            if(event.keyCode < 48 || event.keyCode > 57) {
                if(this.mobile.length>0) {
                    this.mobile = this.mobile.slice(0, -1);
                }
            }

            if (this.mobile.length == 11) {
                this.mobileToggle()
            }
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
            app.notifications = [{ Code:500, Message: 'verifying credentials...'}]
            console.log(app.notifications[0].Code)
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
