<template>
  <section class="min-vh-100 w-100 center bgBlank" >
    <nav class="w-100 center cf inline-flex items-center w-100">
      <p class="center tracked white">
          
      </p>
    </nav>

    <div class="center mw7 mw6-l" >
      <article class="dt center vh-75 min-vh-75 w-100">
        <div class="dtc tc pa0 v-mid vh-75 min-vh-75 f6 near-white">


          <section v-if="lSignin">
            <div class="cf w-100 pt5-l"></div>
            <div class="pa2 cf w-100 center" style="max-width:320px" >
              
              <div class="fl w-100 pv4 relative">
                <notify :notifications="notifications" />
                <img src="@/assets/img/logo-icon.png" class="w4 " />
                <span class="db w-100 f5 white fw4"> Sign in to your Tessa Wallet</span>
              </div>


              <div class="cf w-100 pv3">
                <input class="f6 fw2 bn pa2 dib w-100 white" type="text" placeholder="Mobile" v-model="record.Username"/>
              </div>

              <div class="cf w-100 pv3">
                <input class="f6 fw2 bn pa2 dib w-100 white" type="password" placeholder="Pin" v-model="record.Password"/>
                <router-link to="/restore" class="cf no-underline">
                  <p class="fr white f7">Forgot Password?</p>
                </router-link>
              </div>

              <div class="cf w-100"></div>

              <span @click="signin" class="cf tl br1 no-underline inline-flex items-center white button relative">
                  <span class="ph2">SIGN IN</span> <i class="bg-black-50 pa2 br1 br--right fal fa-sign-in"></i>
              </span>

              <div class="cf w-100 pt4">
                <p class="white f7">Don't have an account yet?
                    <router-link to="/signup" class="ml3 navy bg-white f7 br2 pa1 no-underline">
                    Sign Up 
                    </router-link>
                </p>
              </div>
            </div>
          </section>

        
          <div v-else class=" f6 avenir white w-100 pa2 ">
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
  import screen from "@/assets/screen.png";
  import notify from "@/components/generics/notify";
  import {HTTP} from "@/common";
  import {checkRedirect} from "@/common";

  export default {
    data() {return{
      screen,
      notifications: [], 
      lSignin: true, walletsList: [], curWallet:0,
      record : {Username: '', Password: ''},
      url: '/api/login'
    }},
    components: {
      notify
    },
    created(){
      if (this.$route.query.extraData == 'signup') {
        this.notifications.push({
          Code: 200,
          Message: 'Wallet created successfully!'
        })
      }
    },
    methods: {
      selectWallet(index) {
        
       
      },
      signin () {
        if (this.record.Username == '' && this.record.Password != '') {
            this.notifications.push({
              Code: 500,
              Message: 'Username is required!'
            })
            return
        }
        if (this.record.Password == '' && this.record.Username != '') {
            this.notifications.push({
              Code: 500,
              Message: 'Password is required!'
            })
            return
        }
        if (this.record.Username == '' && this.record.Password == '') {
            this.notifications.push({
              Code: 500,
              Message: 'Username and password is required!'
            })
            return
        }
        const app = this
        app.notifications = [{ Code: 200, Message: 'verifying credentials...'}]
        HTTP.post(app.url,app.record,{withCredentials: true}).then((response) => {
          app.notifications = []
          app.notifications.push(response.data)
          setTimeout(checkRedirect(response.data),1500)

          if (response.data.Body !== null && response.data.Body !== undefined) {
            var respBody = response.data.Body;
            if (respBody.Wallets !== null && respBody.Wallets !== undefined && respBody.Wallets !== "") {
              app.lSignin = false;
              app.walletSelected = 0;
              app.walletsList = respBody.Wallets
              // page.switchWallet();
              // page.showNext("wallets");
            }
          }
        }).catch((e) => { console.log(e) })
      }
    }
  }
</script>
