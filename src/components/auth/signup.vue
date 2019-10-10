<template>
    <section class="h-100">
        <div class=" w-100 fl">
            <img src="@/assets/img/logo.png" class="db center h2" />
        </div>
        <div class="w-100 fl">

            <div class="pa2 cf w-100 center relative" style="max-width:320px">
                <notify :notifications="notifications" />
            </div>

            <div class="fl w-100 dn" :class="{'db':start}">
                <div class="fl w-100">
                    <img src="@/assets/img/icon-signup.png" class="db center w-90 w-40-l" />
                </div>

                <div class="fl w-100"> 
                    <p class="f4 fw1 tracked black">Sign Up </p>
                </div>
                
                <div class="w-40-l w-100 center pv2 ">
                    <span class="dn" :class="{'db':!startMobile}">
                        <mobilebox :mobile="mobile" @update="updateMobile"/>

                        <div class="fr w-100 pt3">
                            <router-link to="/signin" class="cf no-underline items-center inline-flex">
                                <p class="near-black f7 fl tl">Do you have an account? </p>
                                <buttonsmall class="fr ml3" title="Sign In"/>
                            </router-link>
                        </div>
                    </span>

                    <span class="dn" :class="{'db':startMobile}">
                        <div class="fl w-100 ph2 ">
                            <pinbox class="fl w-100" :pin="pin" title="Enter the OTP sent to your Mobile" @update="updatePin" />
                        </div>

                        <div class="fl w-50 pt3 ph2" @click="mobileToggle">  <buttonsmall class="fl" icon="fa-repeat" title="Retry" />  </div>
                        <div class="fl w-50 pt3 ph2" click="signin">  <buttonsmall class="fr" icon="fa-check" title="Verify"/>  </div>
                    </span>
                </div>
            </div>

            
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

    import buttonsmall from "@/components/generics/buttonsmall";


    export default {
        created(){
            this.showNext("mobile")
        },
        data() {return{
            url: "/api/mnemonic",
            start: true,
            startMobile:false, 

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
            notify, loading, mnemonic, pinbox, mobilebox, buttonsmall
        },
        methods: {
            mobileToggle(){
                this.startMobile = !this.startMobile   
                if(this.record.Username.length == 11) {
                    this.setUsername()
                }
            },
            updateOtp(otp) {
                this.otp = otp
            },
            updatePin(pin) {
                this.pin = pin
            },
            updateMobile(mobile) {
                this.mobile = mobile
            },
            verifyOTP(){
                var app = this

                app.pin = ""
                app.otp = ""

                app.record.Username = app.mobile;

                // SEND ONE TIME PIN
                
                app.notifications = []
                app.url = "/api/otpsend"                
                HTTP.post(app.url, {
                Username: app.record.Username,
                }).then((response) => {
                    if (response.data.Code === 200) {
                        // app.start = false
                        // app.warning = false
                        // app.seedphrase = false
                        // app.confirm = false
                        // app.mobileEnter = false
                        // app.otpVerify = true
                        // app.pinSet = false
                    }
                    app.notifications.push(response.data)
                    setTimeout(function(){console.log(response.data.Body)},1500)

                }).catch((e) => { console.log(e) })
                // SEND ONE TIME PIN
            },
            showNext (formName) {
                switch (formName) {
                    case "mobile":
                        this.mobile = true

                        // if (this.beginner) {
                        //     this.getMnemonic()
                        //     this.start = false
                        //     this.warning = false
                        //     this.seedphrase = false
                        //     this.confirm = false
                            
                        //     this.mobileEnter = true
                        //     this.otpVerify = false
                        //     this.pinSet = false

                        // } else {
                        //     var lSuccess = true;
                            
                        //     if (this.mnemonicConfirm.length == 0) {
                        //         lSuccess = false
                        //     }

                        //     for (var i = 0; i < this.mnemonicConfirm.length; i++) {
                        //         var mnemonic = this.mnemonicConfirm[i];
                        //         if(mnemonic.phrase !== mnemonic.value) {
                        //             lSuccess = false
                        //         }
                        //     }

                        //     if(lSuccess) {
                        //         this.start = false
                        //         this.warning = false
                        //         this.seedphrase = false
                        //         this.confirm = false
                            
                        //         this.mobileEnter = true
                        //         this.otpVerify = false
                        //         this.pinSet = false

                        //         this.notifications = [{Code: 200, Message: "Mnemonic verfied!"}]
                        //         return
                        //     }

                        //     this.notifications = [{Code: 500, Message: "Mnemonic confirmation failed!"}]
                        // }
                        
                        // console.log(this.seedphrases)
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

