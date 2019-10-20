<template>
    <section class="h-100">
        <div class=" w-100 fl" >
            <img src="@/assets/img/logo.png" class="db center h2" />
        </div>
        <div class="w-100 fl">

            <div class="pa2 cf w-100 center relative" style="max-width:320px">
                <notify :notifications="notifications" />
            </div>

            <div class="fl w-100 dn bg-white" :class="{'db':curView=='identity'}">
                <div class="fl w-100" style="min-height:14em;">
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
                        <div class="fr w-100 pt3" @click="curPage='name'">
                            <buttonsmall class="fl ml2" title="Go Back"/>
                        </div>
                    </span>

                    <span class="dn" :class="{'db':curPage=='otp'}">
                        <div class="fl w-100 ph2 ">
                            <pinbox class="fl w-100" :pin="otp" title="Enter the OTP sent to your Mobile" @update="setOtp" />
                        </div>

                        <div class="fl w-50 pt3 ph2" @click="curPage='mobile'">  <buttonsmall class="fl" icon="fa-repeat" title="Retry" />  </div>
                        <div class="fl w-50 pt3 ph2" @click="verifyOtp">  <buttonsmall class="fr" icon="fa-check" title="Verify"/>  </div>
                    </span>
                </div>
            </div>
            
            <div class="fl w-100 dn" :class="{'db':curView=='seedphrase'}">

                <span class="dn" :class="{'db':curPage=='animate'}">
                    <seedphrase class="relative" :class="{'dn':curPage!=='animate'}" :position="seedAnimation.position" :icon="seedAnimation.icon" :seed="seedAnimation.seed" :details="seedAnimation.details" :text="seedAnimation.text"/>
                </span>

                <span class="dn" :class="{'db':curPage=='backup'}">

                    <div class="fl w-100 fw6 f5 pv2 tc">These are your 12 seed phrases</div>

                    <div class="w-third fl tc pb1 " v-for="(phrase, index) in seedphrases" :key="index">
                        <div class="br-pill w3 h3 tc inline-flex items-center bg-black white ba"  :class="{'':((index)%3==1)}">
                            <div class="w-100 tc f7">
                                {{phrase}}
                            </div>
                        </div>
                        <p class="ma0 pa0 gray f6">{{index+1}}</p>
                    </div>

                    <div class="fl w-100 f7 ">There are two saving options</div>

                    <div class="fl w-50 pt3 ph2" >
                        <div class="fl-100"  @click="setViewPage('security','pin')">
                            <buttonsmall class="fl fb" title="Save with Tessa" />  
                        </div>
                        <div class="w-80 fl pt3"> <i @click="curPage='savewithtessa'" class="db fal fa-info-circle"></i> </div>
                    </div>



                    <div class="fl w-50 pt3 ph2 tr"> 
                        <div class="fl-100"  @click="setViewPage('security','pin')"> 
                            <buttonsmall class="" title="Write it Down" />
                        </div>  
                        <div class="w-70 fl pt3"> <i @click="curPage='writeitdown'" class="db fal fa-info-circle"></i> </div>
                    </div>

                </span>

                <span class="dn h-100 w-100 ph2 fl" :class="{'db':curPage=='savewithtessa'}">
                    <div class="fl w-100 fw6 f5 pv2 tc">
                        <h4 class="fw9">SAVE KEYWORD WITH TESSA</h4>
                        <article class="mb4 tl">Tessa saves your keywords to the cloud by storing the keywords assigned to you directly with your account.</article>
                        <article class="tl mb4">This means that at any point if you forget your keyword, you can recover it by going through the security recovery process. </article>

                        <p class="f7 tl">PROCESS OF SAVING THE KEYWORDS</p>
                        <ul>
                            <li class="tl f7 mb4">Click on the 'Save with Tessa' button</li>
                            <li class="tl f7 mb4">Create a 4 unique digit pin.<br>This pin will always be used to sign in.</li>
                            <li class="tl f7">Write down 3 security questions and answers. <br/>This will be used in case you forget your pin</li>
                        </ul>
                        
                        <div class="fl w-100 pv3" @click="curPage='backup'">
                            <buttonsmall class="fl" title="Close"/>  
                        </div>
                    </div>
                </span>

                <span class="dn h-100 w-100 ph2 fl" :class="{'db':curPage=='writeitdown'}">
                    <h4 class="fw9">WRITING DOWN KEYWORD</h4>
                    <article class="mb4 tl">Writing down your keywords means that you are fully responsible for protecting the words against any person who could see it.</article>
                    <article class="tl">It is advisable that if you choose this route, you could write it in a digital note like Google Keep so that it is safe in your Google account than actually writing it on a paper.</article>
                    
                    <div class="fl w-100 pv3" @click="curPage='backup'">
                        <buttonsmall class="fl" title="Close"/>  
                    </div>
                </span>

            </div>

            <div class="fl w-100 dn bg-white" :class="{'db':curView=='security'}">

                <span class="dn fl w-100" :class="{'db':curPage=='pin'}">
                    <div class=" w-100 vh-50 fl dt">
                        <div class="dtc v-mid tc">
                        
                            <p class="fw6 f5 black">Create Unique 4 Digit Pin</p>
                            
                            <div class="fl w-100 mv2"></div>

                            <div class="fl w-100 ph2 ">
                                <pinbox class="fl w-100" :pin="pinCreate" title="CREATE PIN" @update="createPin" />
                            </div>
                            
                            <div class="fl w-100 mv2"></div>

                            <div class="fl w-100 ph2 ">
                                <pinbox class="fl w-100" :pin="pinConfirm" title="CONFIRM PIN" @update="confirmPin" />
                            </div>

                        </div>
                    </div>
                    <div class=" w-100 min-h-25 fl dt">
                        <div class="dtc v-mid tc" @click="gotoQuestions">
                            <genericbutton title="Create Pin" />
                        </div>
                    </div>
                </span>
                
                <span class="dn" :class="{'db':curPage=='questions'}">
                    <div class=" w-100 h-100 fl dt">
                        <div class="dtc v-mid tc ph2">
                        
                            <p>Create Three Security Questions</p>
                            <div class="mt3">
                                <label class="db fw4 f7 lh-copy f6 tl pb3">QUESTION ONE</label>
                                <input type="text" class="pa3 input-reset ba b--black bg-transparent w-100 black bw1" v-model="questionOne">
                            </div>
                            <div class="mt3">
                                <label class="db fw4 f7 lh-copy f6 tl pb3">QUESTION TWO</label>
                                <input type="text" class="pa3 input-reset ba b--black bg-transparent w-100 black bw1" v-model="questionTwo">
                            </div>
                            <div class="mt3">
                                <label class="db fw4 f7 lh-copy f6 tl pb3">QUESTION THREE</label>
                                <input type="text" class="pa3 input-reset ba b--black bg-transparent w-100 black bw1" v-model="questionThree">
                            </div>
                            <div class="bg-light-gray pa1 dib br-button mt4 w-100" @click="createQuestions">
                                <div class="bg-black pa2 pv3 center br-button fw6 tracked white"> CREATE QUESTIONS </div>
                            </div>

                        </div>
                    </div>
                </span>

                <span class="dn" :class="{'db':curPage=='answers'}">
                    <div class=" w-100 h-100 fl dt">
                        <div class="dtc v-mid tc ph2">
                        
                            <p>Create Three Security Answers</p>
                            <div class="mt3">
                                <label class="db fw4 f7 lh-copy f6 tl pb3">ANSWER TO QUESTION ONE</label>
                                <input type="text" class="pa3 input-reset ba b--black bg-transparent w-100 black bw1" v-model="answerOne">
                            </div>
                            <div class="mt3">
                                <label class="db fw4 f7 lh-copy f6 tl pb3">ANSWER TO QUESTION TWO</label>
                                <input type="text" class="pa3 input-reset ba b--black bg-transparent w-100 black bw1" v-model="answerTwo">
                            </div>
                            <div class="mt3">
                                <label class="db fw4 f7 lh-copy f6 tl pb3">ANSWER TO QUESTION THREE</label>
                                <input type="text" class="pa3 input-reset ba b--black bg-transparent w-100 black bw1" v-model="answerThree">
                            </div>
                            <div class="bg-light-gray pa1 dib br-button mt4 w-100" @click="createAnswers">
                                <div class="bg-black pa2 pv3 center br-button fw6 tracked white"> CREATE ANSWERS </div>
                            </div>

                        </div>
                    </div>
                </span>


                <span class="dn" :class="{'db':curPage=='confirm'}">
                    <div class=" w-100 h-100 fl dt">
                        <div class="dtc v-mid tc">
                        
                            <p>Confirm Question And Answers</p>
                            <h3 class="fw9">Q. {{questionOne}}? </h3>
                            <div>A. {{answerOne}} </div>

                            <h3 class="fw9">Q. {{questionTwo}}? </h3>
                            <div>A. {{answerTwo}}</div>

                            <h3 class="fw9">Q. {{questionThree}}? </h3>
                            <div>A. {{answerThree}}</div>

                            <div class="bg-light-gray pa1 dib br-button mt4 w-100" @click="signUp">
                                <div class="bg-black pa2 pv3 center br-button fw6 tracked white"> CONFIRM </div>
                            </div>

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
        created(){ 
            this.getMnemonic()
            // setTimeout(this.backupSeedphrase, 1500)
            // setTimeout(this.animateSeedphrase, 1500)
        },
        data() {return{
            url: "/api/mnemonic",
            start: true,
            isSave: true,

            curPage:"name",
            curView:"identity",
            // curPage:["name","mobile","otp"],
            // curView:["identity","seedphrase","security"],

            answersList:[],
            questionsList:[],
            mnemonicConfirm:[],
            seedphrases: [],
            notifications: [],
            record: {
                Firstname: '',
                Username: '',
                Password: '',
            },
            name:"", mobile:"", pin:"", otp:"", seedAnimation:{position:0, icon:"", seed:"", details:"", text:""},
            questionOne:"", questionTwo:"", questionThree:"", answerOne:"", answerTwo:"", answerThree:"",
            pinConfirm:"", pinCreate:""
        }},
        components: {
            notify, loading, mnemonic, pinbox, mobilebox, namebox, genericbutton, buttonsmall, seedphrase
        },
        methods: {
            setViewPage(view, page){
                this.curView = view
                this.curPage = page
            },
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
                this.pinCreate = pin;
                this.notifications = []
            },
            confirmPin(pin){
                this.pinConfirm = pin;
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
                    Code: this.otp,
                    Username: app.record.Username,
                }).then((response) => {
                    app.notifications.push(response.data)
                    if (response.data.Code === 200) {
                        this.animateSeedphrase()
                    } else {
                        app.curPage = "otp"
                    }
                    setTimeout(function(){console.log(response.data.Body)},1500)

                }).catch((e) => { 
                    console.log(e)
                    app.curPage = "otp"
                })
                // SEND ONE TIME PIN
            },
            animateSeedphrase(){
                var app = this
                app.curView = "seedphrase"
                app.curPage = "animate"
                app.notifications = []
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

                var animationPosition = 0;
                app.seedAnimation = seedAnimation[0]
                var intervalId = setInterval(function(){
                    var timoutId = setTimeout(function(){ 
                        animationPosition++
                        if( animationPosition > seedAnimation.length ){
                            app.backupSeedphrase()
                            clearInterval(timoutId)
                            clearInterval(intervalId)
                            return
                        }
                        if (seedAnimation[animationPosition] !== undefined){
                            app.seedAnimation = seedAnimation[animationPosition] 
                        }
                    }, 1500);
                }, 1500);

            },
            backupSeedphrase(){
                var app = this
                app.curView = "seedphrase"
                app.curPage = "backup"

            },
            signUp(){
                var app = this
                app.url = "/api/signup"
                app.record.Username = app.mobile;
                if (app.record.Username.length != 11 ) {
                    app.notifications.push({
                        Code: 500,
                        Message: "Mobile is not complete"
                    })
                    console.log(app.record)
                    return
                } 

                

                app.record.Password = app.pinCreate;
                if (app.record.Password.length != 4) {
                    app.notifications.push({
                        Code: 500,
                        Message: "Pin is not complete"
                    })
                }

                if (app.pinCreate !== app.pinConfirm) {
                    app.notifications.push({
                        Code: 500,
                        Message: "Create and Confirm Pin does not match"
                    })
                }


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
            },
            gotoQuestions(){
                var app = this

                console.log("app.createPin")
                console.log(app.pinCreate)
                console.log("app.confirmPin")
                console.log(app.pinConfirm)
                if (app.pinCreate.length !== 4) {
                    app.notifications.push({
                        Code: 500,
                        Message: "Pin is not complete"
                    })
                    return
                }

                if (app.pinConfirm.length !== 4) {
                    app.notifications.push({
                        Code: 500,
                        Message: "Confirm Pin is not complete"
                    })
                    return
                }

                if (app.pinCreate !== app.pinConfirm) {
                    app.notifications.push({
                        Code: 500,
                        Message: "Pin and Confirm Pin does not match"
                    })
                    return
                }

                app.curPage='questions'
            },
            createQuestions(){
                this.notifications = []
                if (this.questionOne == "") {
                    this.notifications.push({Message:"Question One is required",Code:500})
                    return
                }

                if (this.questionTwo == "") {
                    this.notifications.push({Message:"Question Two is required",Code:500})
                    return
                }

                if (this.questionThree == "") {
                    this.notifications.push({Message:"Question Three is required",Code:500})
                    return
                }


                this.questionsList = [this.questionOne,this.questionTwo,this.questionThree]
                this.curPage = "answers"
            },
            createAnswers(){
                this.notifications = []
                if (this.answerOne == "") {
                    this.notifications.push({Message:"Answer One is required",Code:500})
                    return
                }

                if (this.answerTwo == "") {
                    this.notifications.push({Message:"Answer Two is required",Code:500})
                    return
                }

                if (this.answerThree == "") {
                    this.notifications.push({Message:"Answer Three is required",Code:500})
                    return
                }

                this.answersList = [this.answerOne,this.answerTwo,this.answerThree]
                this.curPage = "confirm"
            },
            getMnemonic () {
                const app = this;
                app.seedphrases = ["X X X","X X X","X X X","X X X","X X X","X X X","X X X","X X X","X X X","X X X","X X X","X X X"];
                HTTP.get(app.url).then((response) => {
                    app.seedphrases = response.data.Body.mnemonic
                }).catch((e) => { console.log(e) })
            }
        }
    }
</script>

