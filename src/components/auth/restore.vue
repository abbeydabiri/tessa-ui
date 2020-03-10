<template>
    <section class="h-100 tc">
        <div class=" w-100 fl pt3">
            <img src="@/assets/img/logo.png" class="db center h2" />
            <div class="fl w-100" style="min-height:13em;">
                <img src="@/assets/img/icon-signin.png" class="db center w-90-l w-70" />
            </div>
        </div>
        <div class=" w-100  fl dt">
            <div class="dtc v-top bg-white black">
              
                <div class="fl w-100"> 
                    <p class="mv2 f4 fw1 tracked ">Reset your Pin </p>
                </div>
                
                <div class="ph2 cf w-100 center relative" style="max-width:320px">
                    <notify :notifications="notifications" />
                </div>

                <div class="ph2 cf w-100 center dn" style="max-width:320px" :class="{'db':showMobile}">
                    <p class="fl w-100 f6 tc pl3"> Please enter your mobile number: </p>
                    <mobilebox class="pb3" :mobile="mobile" @update="updateMobile" />             
                </div>

                <div class="ph2 cf w-100 center dn" style="max-width:320px" :class="{'db':showOtpin}">

                    <p class="fl w-100 f6 tc pl3"> Please enter the OTP sent to mobile: </p>
                    <pinbox :pin="otp" @update="updateOtp" />
                    

                    <div class="cf w-100 pv3"></div>

                    <div class="cf w-90 center">
                        <div class="fl w-50 pt3" @click="showNext('mobile')">  <buttonsmall class="fl" icon="fa-arrow-left" title="Back" />  </div>
                        <div class="fl w-50 pt3" @click="showNext('reset')">  <buttonsmall class="fr" icon="fa-check" title="Verify"/>  </div>

                    </div>
                </div>

                <div class="ph2 cf w-100 center dn relative" style="max-width:320px" :class="{'db':showReset}"> 
                    <p class="fl w-100 f6 tc pl3"> Enter a New Pin: </p>
                    <pinbox :pin="pin" @update="updatePin" />

                    
                    <div class="cf w-100 pv3"></div>

                    <span @click="showNext('finish')" class=" cf tc">
                         <buttonsmall class="" icon="fa-lock-alt" title="Set New PIN"/> 
                    </span>
                </div>

                <div class="fl w-100 pt4 tc">
                    <router-link to="/signin" class="cf no-underline items-center inline-flex">
                        <p class="near-black f8 fl">Do you remember your pin? </p>
                        <buttonsmall class="fr ml3" title="Sign In"/>
                    </router-link>
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
  import pinbox from "@/components/generics/pinbox";
  import mobilebox from "@/components/generics/mobilebox";

  import buttonsmall from "@/components/generics/buttonsmall";

  export default {
    created(){
        this.getUsername()
    },
    data() {return{
      url: "",
      showMobile:true, showOtpin:false, 
      showReset:false,
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
        notify, mnemonic, pinbox, mobilebox, buttonsmall
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
            if (otp.length == 4) {
                this.showNext('reset')
            }
        },
        updatePin(pin) {
            this.pin = pin
            if (pin.length == 4) {
                this.showNext('finish')
            }
        },
        updateMobile(mobile) {
            this.mobile = mobile
        },
        submitMobile(){
            if (this.mobile.length == 11) {
                this.showNext('otpin')
            }
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
                    Code: "reset",
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
                
                app.url = "/api/pinreset"
                app.record.Code = app.otp;
                app.record.Password = app.pin
                app.record.Username = app.mobile

                
                HTTP.post(app.url, {
                  Code: app.record.Code,
                  Username: app.record.Username,
                  Password: app.record.Password,

                }).then((response) => {
                    if (response.data.Code === 200) {
                        setTimeout(function(){app.$router.push({name:"signin"})},1500)
                    }
                    app.notifications.push(response.data)
                    setTimeout(checkRedirect(response.data),1500)
                }).catch((e) => { console.log(e) })
            break
            }
        }
    }
  }
</script>

