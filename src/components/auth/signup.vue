<template>
    <section class="min-vh-100 w-100 center" >
        
        <nav class="w-100 center bg-black-10 fixed">
            <span class="inline-flex items-center w-100">
                <router-link to="/signin" class="fl ph2 no-underline absolute left-0 top-1">
                    <i class="white center fal fa-arrow-alt-left"></i>
                </router-link>
                <p class="center tracked white">Setup Wallet</p>
            </span>
        </nav>

        <div class="center mw7 mw6-l" >
            <article class="dt center w-100">
                <div class="dtc tc pa0 v-mid vh-100 min-vh-100 f6 near-white">

                    <div class=" cf w-100 center relative" style="max-width:320px">
                        <notify :notifications="notifications" />
                    </div>
                    
                    <img src="@/assets/img/logo-icon.png" class="w4" :class="{'dn':seedphrase}" />

                    <div class="pa2 cf w-100 center dn" style="max-width:320px" :class="{'db':start}">
                        <span class="fl tl no-underline inline-flex items-center br1 white button relative pointer" @click="showNext('mobile')">
                            <i class="bg-black-50 pa2 br1 br--left fal fa-baby"></i> <span class="ph2 tracked ">NEWBIE</span> 
                        </span>
                        
                        <span class="fr tl no-underline inline-flex items-center br1 white button relative pointer" @click="showNext('warning')">
                            <span class="ph2 tracked ">EXPERT</span> <i class="bg-black-50 pa2 br1 br--right fal fa-user-graduate"></i>
                        </span>
                    </div>

                    <div class="pa2 cf w-100 center dn" style="max-width:320px" :class="{'db':warning}">
                        <p class="db w-100 pa2 f5 fw6 white bg-dark-red">
                            <i class="fal fa-exclamation-triangle"></i>
                            Please Read This Warning
                            <i class="fal fa-exclamation-triangle"></i>
                        </p>

                        <p class="db w-100 ph2 pv2 f7 ma0 fw4 bg-black-10 white"> Your 12 words <span class="tracked fw6">seed phrase</span> is on the next page.</p>

                        <p class="db w-100 ph2 pv2 f6 ma0 bt bb b--white-10 fw4 bg-black-10 white"> 
                            You are strongly recommended to keep it away from prying eyes in a secure manner.
                        </p>

                        <p class="db w-100 ph2 pv2 f6 ma0 fw4 bg-black-10 white">
                            <small>
                                You will need the <span class="tracked fw6">seed phrase</span> to migrate balances to other digital financial asset wallets and for recovering your Tessa Wallet, should you forget it.
                            </small>
                        </p>

                        <div class="cf w-100 pv3"></div>
                        
                        <span @click="showNext('seedphrase')" class="cf tl no-underline inline-flex items-center br1 white button relative">
                            <span class="ph2 tracked">NEXT</span> <i class="bg-black-50 pa2 br1 br--right fal fa-angle-right"></i>
                        </span>
                    </div>


                    <div class="pa2 cf w-100 center dn" style="max-width:320px" :class="{'db':seedphrase}">
                        <p class="db w-100 pa2 f4 mt0 fw4 white bg-transparent br2">Your 12 words seed phrase </p>

                        <p class="db w-100 ph2 pv3 f6 ma0 bt bb b--gray fw4 bg-black red mb2"> In the next step, you will have to verify the seed phrase in the right order. </p>

                        <mnemonic :seedphrases="seedphrases"/>

                        <div class="cf w-100 pv3"></div>
                        <span class="fl tr no-underline inline-flex items-center br1 white button relative" @click="showNext('warning')">
                            <i class="bg-black-50 pa2 br1 br--left fal fa-angle-left"></i> <span class="ph2 tracked">BACK</span> 
                        </span>

                        <span class="fr tl no-underline inline-flex items-center br1 white button relative" @click="showNext('confirm')">
                            <span class="ph2 tracked">NEXT</span> <i class="bg-black-50 pa2 br1 br--right fal fa-angle-right"></i>
                        </span>
                    </div>


                    <div class="pa2 cf w-100 center dn relative" style="max-width:320px" :class="{'db':confirm}">
                        <p class="db w-100 pa2 f3 f white bg-transparent mb4 br2"> Verify seed phrase </p>
                        <!-- <p class="db w-100 ph2 pv3 f6 ma0 bt bb b--gray f bg-black-10 red mb2"> Please write down or screen shot this. <br/>It will be required on the next page</p> -->

                        <div class="cf w-100">
                            <div class="" v-for="(confirm, index) in mnemonicConfirm" :key="index" >
                                <div class="w4 tl no-underline inline-flex items-center white relative mb2" :class="{fl: (index + 1) % 2 != 0, fr: (index + 1) % 2 == 0 }" >
                                    <input type="text" v-model="confirm.value" class="fl w-80 pa2 bg-black-60 white bn br0">
                                    <span class="fr w-20 pa2 tc bg-black-10">{{confirm.position}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="cf w-100 pv3"></div>
                        <span class="fl tr no-underline inline-flex items-center br1 white button relative" @click="showNext('seedphrase')">
                            <i class="bg-black-50 pv2 ph2 br1 br--left fal fa-angle-left"></i> <span class="ph2 tracked">BACK</span> 
                        </span>

                        <span class="fr tl no-underline inline-flex items-center br1 white button relative" @click="showNext('mobile')">
                            <span class="ph2 tracked">NEXT</span> <i class="bg-black-50 pa2 br1 br--right fal fa-angle-right"></i>
                        </span>
                    </div>


                    <div class="pa2 cf w-100 center dn" style="max-width:320px" :class="{'db':mobileEnter}">
                        <p class="fl w-100 white f6 tl pl3 pb0 mb1">  
                            Please enter your Name below:
                        </p>

                        <div class="fl w-100">
                            <input class="auth tc f2 fw6 bn pa1 dib h3 w-90 white hover-bg-black-40" type="text" placeholder="X X X X X X X" v-model="record.Firstname" />
                        </div>

                        <div class="w-100 mv3 fl"></div>

                        <p class="fl w-100 white f6 tl pl3 pb0 mb1">  
                            Please enter your Mobile below:
                        </p>

                        <mobilebox class="pb3" :mobile="mobile" @update="updateMobile" />
                        
                        <span @click="showNext('otpin')" class="cf tl no-underline inline-flex items-center br1 white button relative pointer">
                            <span class="ph2 tracked">Send OTP</span> <i class="bg-black-50 pa2 br1 br--right fal fa-mobile-android"></i>
                        </span>
                    </div>


                    <div class="pa2 cf w-100 center db relative" style="max-width:320px" v-if="otpVerify">
                        <p class="fl w-100 white f6 tl pl3"> Please enter the OTP sent to mobile: </p>
                        <pinbox :pin="otp" @update="updateOtp" />
                        

                        <div class="cf w-100 pv3"></div>

                        <div class="cf w-90 center">
                            <span class="fl tr no-underline inline-flex items-center br1 white button relative pointer" @click="showNext('mobile')">
                                <i class="bg-black-50 pa2 br1 br--left fal fa-angle-left"></i> <span class="ph2 tracked">Back</span> 
                            </span>

                            <span class="fr tl no-underline inline-flex items-center br1 white button relative pointer" @click="showNext('pinset')">
                                <span class="ph2 tracked">Verify</span> <i class="bg-black-50 pa2 br1 br--right fal fa-check"></i>
                            </span>
                        </div>
                    </div>
                    
                    <div class="pa2 cf w-100 center dn relative" style="max-width:320px" :class="{'db':pinSet}">
                        <p class="fl w-100 white f6 tl pl3"> Enter New Pin: </p>
                        <pinbox :pin="pin" @update="updatePin" />

                     
                        <div class="cf w-100 pv3"></div>

                        <span v-if="isSave" @click="showNext('finish')" class="cf tl no-underline inline-flex items-center br1 white button relative"> <span class="ph2 tracked">Set New PIN</span> <i class="bg-black-50 pa2 br1 br--right fal fa-lock-alt"></i> </span>
                        <span v-else class="cf tl no-underline inline-flex items-center br1 white button relative"> <span class="ph2 tracked">Creating Wallet</span> <i class="bg-black-50 pa2 br1 br--right fal fa-spinner fa-pulse"></i> </span>


                    </div>

                    

                </div>
            </article>
        </div>
    </section>
</template>

<script type="text/javascript">
    
    import {HTTP} from "@/common.js";
    import {checkRedirect} from "@/common.js";
    
    import mnemonic from "@/components/generics/mnemonic";
    import notify from "@/components/generics/notify";
    import loading from "@/components/generics/loading";

    import pinbox from "@/components/generics/pinbox";
    import mobilebox from "@/components/generics/mobilebox";


    export default {
        created(){
            this.showNext("mobile")
        },
        data() {return{
            url: "/api/mnemonic",
            beginner:true, start: false,
            warning:false, seedphrase:false, 
            confirm:false, create:false,

            mobileEnter:true,
            otpVerify:false,
            pinSet:false,
            isSave:true,

            mnemonicConfirm:[],
            seedphrases: [],
            notifications: [],
            record: {
                Username: '',
                Password: '',
            },
            mobile:"", pin:"", otp:"",
        }},
        components: {
            notify, loading, mnemonic, pinbox, mobilebox
        },
        methods: {
            
            updateOtp(otp) {
                this.otp = otp
            },
            updatePin(pin) {
                this.pin = pin
            },
            updateMobile(mobile) {
                this.mobile = mobile
            },

            showNext (formName) {
                switch (formName) {
                    case "warning":
                        this.beginner = false
                        this.start = false
                        this.warning = true
                        this.seedphrase = false
                        this.confirm = false

                        this.create = false
                        this.mobileEnter = false
                        this.otpVerify = false
                        this.pinSet = false

                        break;

                    case "seedphrase":
                        this.getMnemonic()
                        this.warning = false
                        this.seedphrase = true
                        this.confirm = false
                        
                        this.create = false
                        this.mobileEnter = false
                        this.otpVerify = false
                        this.pinSet = false
                        break;
                    case "confirm":
                        this.mnemonicConfirm = [];
                        
                        var randList = []
                        while(randList.length < 2){
                            var randomnumber = Math.floor(Math.random()*10) + 1;
                            if(randList.indexOf(randomnumber) > -1) continue;
                            randList[randList.length] = randomnumber;
                        }

                        for (var i = 0; i < randList.length; i++) {
                            if (this.seedphrases[randList[i]] !== undefined) {
                                this.mnemonicConfirm.push({position:randList[i]+1, 
                                phrase:this.seedphrases[randList[i]]})
                            }
                        }

                        console.log(this.mnemonicConfirm[0].phrase)
                        console.log(this.mnemonicConfirm[1].phrase)

                        this.start = false
                        this.warning = false
                        this.seedphrase = false
                        this.confirm = true
                        this.create = false
                        break;

                    case "mobile":
                        if (this.beginner) {
                            this.getMnemonic()
                            this.start = false
                            this.warning = false
                            this.seedphrase = false
                            this.confirm = false
                            
                            this.mobileEnter = true
                            this.otpVerify = false
                            this.pinSet = false

                        } else {
                            var lSuccess = true;
                            
                            if (this.mnemonicConfirm.length == 0) {
                                lSuccess = false
                            }

                            for (var i = 0; i < this.mnemonicConfirm.length; i++) {
                                var mnemonic = this.mnemonicConfirm[i];
                                if(mnemonic.phrase !== mnemonic.value) {
                                    lSuccess = false
                                }
                            }

                            if(lSuccess) {
                                this.start = false
                                this.warning = false
                                this.seedphrase = false
                                this.confirm = false
                            
                                this.mobileEnter = true
                                this.otpVerify = false
                                this.pinSet = false

                                this.notifications = [{Code: 200, Message: "Mnemonic verfied!"}]
                                return
                            }

                            this.notifications = [{Code: 500, Message: "Mnemonic confirmation failed!"}]
                        }
                        
                        console.log(app.seedphrases)
                    break;

                    case "otpin":
                        this.pin = ""
                        this.otp = ""

                        

                        this.record.Username = this.mobile;

                        // SEND ONE TIME PIN
                        var app = this
                        app.notifications = []
                        app.url = "/api/otpsend"                
                        HTTP.post(app.url, {
                        Username: app.record.Username,
                        }).then((response) => {
                            if (response.data.Code === 200) {
                                this.start = false
                                this.warning = false
                                this.seedphrase = false
                                this.confirm = false
                                this.mobileEnter = false
                                this.otpVerify = true
                                this.pinSet = false
                            }
                            app.notifications.push(response.data)
                            setTimeout(function(){console.log(response.data.Body)},1500)

                        }).catch((e) => { console.log(e) })
                        // SEND ONE TIME PIN
                        break;

                    case "pinset":
                        this.record.Code = this.otp;
                        this.record.Username = this.mobile;

                        //VERIFY ONE TIME PIN
                        var app = this
                        app.url = "/api/otpverify"
                        HTTP.post(app.url, {
                            Code: app.record.Code,
                            Username: app.record.Username,
                        }).then((response) => {
                            if (response.data.Code === 200) {
                                app.start = false
                                app.warning = false
                                app.seedphrase = false
                                app.confirm = false
                                app.mobileEnter = false
                                app.otpVerify = false
                                app.pinSet = true
                            } 
                            app.notifications.push(response.data)
                            setTimeout(function(){console.log(response.data.Body)},1500)
                        }).catch((e) => { console.log(e) })
                        //VERIFY ONE TIME PIN
                        break;


                    case "finish":
                        this.url = "/api/signup"

                        this.record.Username = this.mobile;
                        if (this.record.Username.length != 11 ) {
                            this.notifications.push({
                                Code: 500,
                                Message: "Mobile is not complete"
                            })
                            console.log(this.record)
                            return
                        } 

                        

                        this.record.Password = this.pin;
                        if (this.record.Password.length != 4) {
                            this.notifications.push({
                                Code: 500,
                                Message: "Pin is not complete"
                            })
                        }

                        var app = this
                        if (!app.isSave){
                            return
                        }
                        app.isSave = false;
                        HTTP.post(app.url, {
                            Firstname: app.record.Firstname,
                            Username: app.record.Username,
                            Password: app.record.Password,
                            Confirm: app.record.Password,
                            Mobile:  app.record.Username,
                            Mnemonic: app.seedphrases.join(" "),
                        }).then((response) => {
                            app.notifications.push(response.data)
                            if (response.data.Code === 200) {
                                window.localStorage.setItem('username', app.record.Username);
                            }
                            // setTimeout(function(){  },500)
                            checkRedirect(response.data)
                            app.isSave = true;
                        }).catch((e) => { app.isSave = true; })
                    break
                }
            },
            getMnemonic () {
                const app = this;
                app.seedphrases = ["X X X","X X X","X X X","X X X","X X X","X X X","X X X","X X X","X X X","X X X","X X X","X X X"];
                HTTP.get(app.url).then((response) => {
                    app.seedphrases = response.data.Body.mnemonic
                    console.log(app.seedphrases)
                }).catch((e) => { console.log(e) })
            }
        }
    }
</script>

