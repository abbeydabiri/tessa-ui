<template>
    <section class="h-100">
        <div class=" w-100 fl">
            <img src="@/assets/img/logo.png" class="db center h2" />
        </div>
        <div class="w-100 fl">

            <div class="pa2 cf w-100 center relative" style="max-width:320px">
                <notify :notifications="notifications" />
            </div>

            <div class="fl w-100 dn bg-white" :class="{'db':curView=='identity'}">
                <div class="fl w-100">
                    <img src="@/assets/img/icon-signup.png" class="db center w-90 w-40-l" />
                </div>

                <div class="fl w-100"> 
                    <p class="f4 fw1 tracked black">Sign Up </p>
                </div>
                
                <div class="w-40-l w-100 center pv2 ">
                    <span class="dn" :class="{'db':curPage=='name'}">
                        <namebox :name="name" @update="updateName"/>
                        <div class="fr w-100 pt3">
                            <router-link to="/signin" class="cf no-underline items-center inline-flex">
                                <p class="near-black f7 fl tl">Do you have an account? </p>
                                <buttonsmall class="fr ml3" title="Sign In"/>
                            </router-link>
                        </div>
                    </span>
                    
                    <span class="dn" :class="{'db':curPage=='mobile'}">
                        <mobilebox :mobile="mobile" @update="updateMobile"/>
                        <div class="fr w-100 pt3">
                            <div @click="curPage='name'" class="cf no-underline items-center inline-flex w-100">
                                <buttonsmall class="fl ml2" title="Go Back"/>
                            </div>
                        </div>
                    </span>

                    <span class="dn" :class="{'db':curPage=='otp'}">
                        <div class="fl w-100 ph2 ">
                            <pinbox class="fl w-100" :pin="pin" title="Enter the OTP sent to your Mobile" @update="setOtp" />
                        </div>

                        <div class="fl w-50 pt3 ph2" @click="curPage='mobile'">  <buttonsmall class="fl" icon="fa-repeat" title="Retry" />  </div>
                        <div class="fl w-50 pt3 ph2" @click="verifyOtp">  <buttonsmall class="fr" icon="fa-check" title="Verify"/>  </div>
                    </span>
                </div>
            </div>
            
            <div class="fl w-100 dn" :class="{'db':curView=='seedphrase'}">

                <seedphrase :position="seedAnimation.position" :icon="seedAnimation.icon" :seed="seedAnimation.seed" :details="seedAnimation.details" :text="seedAnimation.text"/>

            </div>

            <div class="fl w-100 dn bg-white" :class="{'db':curView=='security'}">

                <span class="dn" :class="{'db':curPage=='pin'}">
                    <div class=" w-100 min-h-75 fl dt">
                        <div class="dtc v-mid tc">
                        
                            <p class="fw6 f5 black">Create Unique 4 Digit Pin</p>
                            
                            <div class="fl w-100 ph2 ">
                                <pinbox class="fl w-100" :pin="pin" title="CREATE PIN" @update="createPin" />
                            </div>

                            <div class="fl w-100 ph2 ">
                                <pinbox class="fl w-100" :pin="pin" title="CONFIRM PIN" @update="confirmPin" />
                            </div>

                        </div>
                    </div>
                    <div class=" w-100 min-h-25 fl dt">
                        <div class="dtc v-mid tc">
                            <genericbutton title="Create Pin"/>
                        </div>
                    </div>
                </span>
                
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
    import namebox from "@/components/generics/namebox";
    import mobilebox from "@/components/generics/mobilebox";

    import genericbutton from "@/components/generics/button";
    import buttonsmall from "@/components/generics/buttonsmall";
    import seedphrase from "@/components/generics/seedphrase";


    export default {
        created(){ this.animateSeedphrase() },
        data() {return{
            url: "/api/mnemonic",
            start: true,
            
            curPage:"name",
            curView:"identity",
            // curPage:["name","mobile","otp"],
            // curView:["identity","seedphrase","security"],


            mnemonicConfirm:[],
            seedphrases: [],
            notifications: [],
            record: {
                Firstname: '',
                Username: '',
                Password: '',
            },
            name:"", mobile:"", pin:"", otp:"", seedAnimation:{},
        }},
        components: {
            notify, loading, mnemonic, pinbox, mobilebox, namebox, genericbutton, buttonsmall, seedphrase
        },
        methods: {
            setOtp(otp) {
                this.otp = otp
                if (this.otp.length == 4) {
                    this.verifyOtp()
                }
            },
            updateMobile(mobile) {
                this.mobile = mobile
            },
            updateName(name) {
                this.name = name
            },
            createPin(pin){
                this.createPin = pin;
            },
            confirmPin(pin){
                this.confirmPin = pin;
            },
            submitName(){
                var app = this
                app.record.Firstname = app.name;
                if (app.record.Firstname.length < 3) {
                    app.notifications.push({Message:"Name is required",Code:500})
                    return
                }

                app.curPage = "mobile"
                app.curView = "identity"
            },
            submitMobile(){
                var app = this
                app.record.Username = app.mobile;
                if (app.mobile.length != 11) {
                    app.notifications.push({Message:"Mobile is required",Code:500})
                    return
                }

                // SEND ONE TIME PIN
                app.curPage = ""
                app.curView = "identity"
                app.notifications = []
                app.url = "/api/otpsend"                
                HTTP.post(app.url, {
                Username: app.record.Username,
                }).then((response) => {
                    if (response.data.Code === 200) {
                        app.curPage = "otp"
                    } else {
                        app.curPage = "mobile"
                    }
                    app.notifications.push(response.data)
                    setTimeout(function(){console.log(response.data.Body)},1500)

                }).catch((e) => { 
                    console.log(e) 
                    app.curPage = "mobile"
                })
                // SEND ONE TIME PIN
            },
            verifyOtp(){
                var app = this

                app.pin = ""
                app.otp = ""
    
                app.record.Username = app.mobile;
                if (app.mobile.length != 11) {
                    app.notifications.push({Message:"OTP must be 4 digits",Code:500})
                    return
                }
                // SEND ONE TIME PIN
                app.curPage = ""
                app.curView = "identity"
                app.notifications = []
                app.url = "/api/otpverify"
                HTTP.post(app.url, {
                    Code: app.record.Code,
                    Username: app.record.Username,
                }).then((response) => {
                    if (response.data.Code === 200) {
                        app.viewPage = "security"
                        app.curPage = "pin"
                    } else {
                        app.curPage = "otp"
                    }
                    app.notifications.push(response.data)
                    setTimeout(function(){console.log(response.data.Body)},1500)

                }).catch((e) => { 
                    console.log(e)
                    app.curPage = "otp"
                })
                // SEND ONE TIME PIN
            },
            animateSeedphrase(){
                this.getMnemonic()

                var app = this
                app.curView = "seedphrase"
                app.curPage = "animate"
                
                var seedAnimation = [
                    {position:0, icon:"", seed:"", details:"", text:""},
                    {position:0, icon:"fa-check", seed:"", details:"", text:""},
                    {position:0, icon:"fa-check", seed:"", details:"SUCCESS", text:""},
                    {position:0, icon:"", seed:"", details:"", text:"Hold On"},
                    {position:0, icon:"", seed:"", details:"", text:"We are creating 12 unique keywords for you"},
                ]

                for (var i = 0; i < app.seedphrases.length; i++) {
                    var mnemonic = app.seedphrases[i];
                    seedAnimation.push({position:i, icon:"", seed:mnemonic, details:"", text:""})
                }

                app.seedAnimation = seedAnimation[0]

                
                // for (let i = 0; i < seedAnimation.length; i++) {
                    
                //     setTimeout(function(seedAnimation){
                //         // checkRedirect(response.data)
                //         console.log(seedAnimation[i])
                //     }(seedAnimation),750)

                //     // if(i == (seedAnimation.length-1)){
                //     //     setTimeout(function(){
                //     //         app.curPage = "backup"
                //     //     },1500)
                //     // }
                // }
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

