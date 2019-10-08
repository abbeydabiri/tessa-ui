<template>
    <section class="min-vh-100 w-100 center" >
        <nav class="w-100 center bg-black-10">
            <span class="inline-flex items-center w-100">
                <router-link to="/signin" class="fl ph2 no-underline absolute left-0 top-1">
                    <i class="white center fal fa-arrow-alt-left"></i>
                </router-link>
                <p class="center tracked white">Recover Pin</p>
            </span>
        </nav>

        <div class="center mw7 mw6-l" >
            <article class="dt center w-100">
                <div class="dtc tc pa0 v-mid vh-75 min-vh-75 f6 near-white">

                    <div class="cf w-100 pt5-l"></div>

                    <div class=" cf w-100 center relative" style="max-width:320px">
                        <notify :notifications="notifications" />
                    </div>

                    <img src="@/assets/img/logo-icon.png" class="w4" />

                    <div class="pa2 cf w-100 center dn" style="max-width:320px" :class="{'db':showMobile}">
                        <p class="fl w-100 white f6 tl pl3">  
                            Please enter your Mobile in the box below:
                        </p>

                        <mobilebox class="pb3" :mobile="mobile" @update="updateMobile" />
                        
                        <span @click="showNext('otpin')" class="cf tl no-underline inline-flex items-center br1 white button relative pointer">
                            <span class="ph2 tracked">Send OTP</span> <i class="bg-black-50 pa2 br1 br--right fal fa-mobile-android"></i>
                        </span>
                    </div>

                    <div class="pa2 cf w-100 center dn" style="max-width:320px" :class="{'db':showOtpin}">

                        <p class="fl w-100 white f6 tl pl3"> Please enter the OTP sent to mobile: </p>
                        <pinbox :pin="otp" @update="updateOtp" />
                        

                        <div class="cf w-100 pv3"></div>

                        <div class="cf w-90 center">
                            <span class="fl tr no-underline inline-flex items-center br1 white button relative pointer" @click="showNext('mobile')">
                                <i class="bg-black-50 pa2 br1 br--left fal fa-angle-left"></i> <span class="ph2 tracked">Back</span> 
                            </span>

                            <span class="fr tl no-underline inline-flex items-center br1 white button relative pointer" @click="showNext('reset')">
                                <span class="ph2 tracked">Verify</span> <i class="bg-black-50 pa2 br1 br--right fal fa-check"></i>
                            </span>
                        </div>
                    </div>

                    <div class="pa2 cf w-100 center dn relative" style="max-width:320px" :class="{'db':showReset}"> 
                        <p class="fl w-100 white f6 tl pl3"> Enter New Pin: </p>
                        <pinbox :pin="pin" @update="updatePin" />

                     
                        <div class="cf w-100 pv3"></div>

                        <span @click="showNext('finish')" class="cf tl no-underline inline-flex items-center br1 white button relative">
                            <span class="ph2 tracked">Set New PIN</span> <i class="bg-black-50 pa2 br1 br--right fal fa-lock-alt"></i>
                        </span>
                    </div>

                    <div class="cf w-100 pv3"></div>

                    <router-link to="/signin" class="cf no-underline">
                        <p class="near-white f7">remember your pin? <label class="white pl3 underline">Sign In</label></p>
                    </router-link>

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
  import pinbox from "@/components/generics/pinbox";
  import mobilebox from "@/components/generics/mobilebox";

  export default {
    created(){
        this.getUsername()
    },
    data() {return{
      url: "/api/mnemonic",
      showMobile:true, showOtpin:false, 
      showReset:false,
      mnemonicConfirm:[],
      seedphrases: [],
      notifications: [],
      record: {
        Username: '',
        Password: '',
      },
      confirmPassword: '',
      passwordConfirmed: true,
      mobile:"", pin:"", otp:"",
    }},
    components: {
        notify, mnemonic, pinbox, mobilebox
    },
    watch : {
      confirmPassword : function (oldVal, newVal) {
        if (oldVal === this.record.Password ) {
        console.log(newVal)
          this.passwordConfirmed = true
        }else {
        console.log(newVal)
          this.passwordConfirmed = false
        }
      }
    },
    methods: {
        getUsername(){
            var username = window.localStorage.getItem('username');
            if(username !== null && username.length == 11) {
                this.mobile = this.record.Username = username
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
        showNext (formName) {
            const app = this

            switch (formName) {
            case "mobile":
                app.showMobile = true
                app.showOtpin = false
                app.showReset = false
                break;

            case "otpin":
                app.showMobile = false
                app.showOtpin = true
                app.showReset = false

                app.record.Username = app.mobile;
                // SEND ONE TIME PIN
                app.url = "/api/otpsend"                
                HTTP.post(app.url, {
                  Username: app.record.Username,
                }).then((response) => {
                    app.notifications.push(response.data)
					setTimeout(checkRedirect(response.data),1500)
                }).catch((e) => { console.log(e) })
                // SEND ONE TIME PIN
                break;

            case "reset":
                app.record.Code = app.otp;
                app.record.Username = app.mobile;
                //VERIFY ONE TIME PIN
                app.url = "/api/otpverify"
                HTTP.post(app.url, {
                    Code: app.record.Code,
                    Username: app.record.Username,
                }).then((response) => {
                    if (response.data.Code === 200) {
                        app.showMobile = false
                        app.showOtpin = false
                        app.showReset = true
                    } 
                    app.notifications.push(response.data)
                    setTimeout(checkRedirect(response.data),1500)
                }).catch((e) => { console.log(e) })
                //VERIFY ONE TIME PIN
                break;

            case "finish":
                if(app.pin.length != 4) {
                    app.notifications.push({ Code: 500, Message: 'Pin must be 4 characters!' })
                    return
                }
                
                app.record.pin = app.pin
                app.record.username = app.mobile

                
                app.notifications = [{Code: 200, Message: "New PIN Set Successfully"}]

                // this.url = "/api/signup"
                // const app = this
                // HTTP.post(this.url, {
                //   Username: this.record.Username,
                //   Password: this.record.Password,
                //   Confirm: this.confirmPassword,
                //   Mnemonic: this.seedphrases.join(" ")
                // }).then((response) => {
                //   if (response.data.Code === 200) {
                //     checkRedirect(response.data)
                //   }
                // }).catch((e) => { console.log(e) })
            break
            }
        },
        getMnemonic () {
            const app = this;
            HTTP.get(this.url).then((response) => {
            app.seedphrases = response.data.Body.mnemonic
            }).catch((e) => { console.log(e) })
        }
    }
  }
</script>

