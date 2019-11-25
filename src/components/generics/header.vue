<template>
    <section class=" fl w-100 ">
        <div class="w-100 z-max center mw6_mod fixed ph4 left-0 right-0 w-100" style="">

            <div class="w-100 inline-flex items-center bg-white br3 br--top" style="margin-top:2px;">
                
                    <span class="fl pr3 pointer" >
                        <i class="fa fa-bars f4 tr near-black" @click="toggleMenu"></i>
                    </span>

                    <span class="center b">
                        <h1 class="f4 tracked near-black">{{title}}</h1>
                    </span>

                    <span class="fr pl3 pointer" >
                        <i class="fa fa-bell f3 tr near-black" @click="toggleNotification"></i>
                    </span>
                
            </div>
        </div>

        <div class="absolute top-0 w-100 left-0 z-max">
            <div class="w-100 tessa-height mw6_mod cf center absolute dn z-max top-0 left-0 right-0" :class="{'db':lMenu,'dn':!lMenu}" :style="{'background': 'url('+splashscreen+')','background-repeat': 'no-repeat', 'background-size': 'cover',}">
                <div class="tessa-height w-100 fl relative">

                    <i class="fal fa-times white absolute z-max right-1 top-1 f2 fw6" @click="toggleMenu"></i>
                    <div class="mw8 cf w-80 " :class="{'slideInLeft':lMenu,'slideOutLeft':!lMenu}">
                        <nav class="tessa-height bg-main w-80 w-50-ns relative" > 

                            <div class="cf tc pa3 h3  center white w-100">
                                <div class="fl tl w-80">
                                    <p class="f6 mv0">{{profile.Fullname}}</p>
                                    <p class="f6 mv0">{{profile.Mobile}}</p>
                                    <p class="f8 mv0">{{profile.Address}}</p>
                                </div>
                                <div class="fl w-20 tr">
                                    <img src="@/assets/icon-header-profile.png" class="center h2" /> 
                                </div>
                            </div>
                            
                            <div class="cf tr pa3 pl2 bg-black-10 white f3 center w-100 fw6">
                                <span class="f7">-</span> 0.00
                            </div>


                            <div class="cf overflow-auto" style="height:calc(100% - 175px)">
                                
                                <span @click="toggleMenu">
                                    <router-link class="w-100 link white fl bt b--white-10 pv4 ph3 inline-flex items-center pa2 f5 hover-bg-black-10" v-for="(link, index) in sidemenu" :key="index" :to="link.to"> 
                                        <i class="white mr2 fal" :class="link.icon"></i> {{link.title}}
                                    </router-link>
                                </span>

                                
                            </div>
                            
                            <div class="w-80 w-50-ns tc cf pv1 mw6 center fixed bottom-0 left-0 footer  inline-flex items-center">
                                <router-link class="f5 f4-l link w-100 tl inline-flex items-center white pl2 tracked" to="/logout">
                                    <i class="fal fa-sign-out-alt fl ma1" id="fa-sign-out"></i>  Logout
                                </router-link>
                            </div>
                            
                        </nav>
                    </div>
                </div>
            </div>

            <div class="z-max bg-black-80 w-100 tessa-height dn absolute top-0 right-0 overflow-x-scroll pv2"  :class="{'slideInRight':lNotification,'slideOutRight':!lNotification}">
                <nav class="z-max w-100 center cf fixed top-0 left-0 inline-flex items-center w-100 h3 bg-black-20">
                    <span class="fl ph4 pt5" >
                        <i class="fa fa-times f3 tr white" @click="notificationsClear"></i>
                    </span>

                    <span class="center b tracked pt5 white">
                        <h1 class="f4">Notifications</h1>
                    </span>

                    <span class="fr ph4 pt5" >
                        <i class="fa fa-arrow-alt-right f3 tr white" @click="toggleNotification"></i>
                    </span>
                </nav>
                <div class="h3"></div>

                <notify class="mv2" :notifications="notifications"></notify>
                
            </div>
        </div>
      
    </section>
</template>
<script type="text/javascript">
  import notify from "@/components/generics/notify"
  import splashscreen from "@/assets/img/splashscreen.png";

  export default {
    props:["title", "notifications"],
    data() {return{
        splashscreen,
        profile:{Fullname:"x",Mobile:"x"}, 
        lMenu:false, lNotification:false,
        sidemenu: [
            //   {to:"/dashboard", title:"Dashboard", icon:"fa-home"},
            //   {to:"/send", title:"Send", icon:"fa-paper-plane"},
            //   {to:"/request", title:"Request", icon:"fa-qrcode"},
            {to:"/dashboard/wallets", title:"Wallet", icon:"fa-wallet"},
            {to:"/dashboard/contacts", title:"Contacts", icon:"fa-address-book"},
            {to:"/dashboard/marketplace", title:"Marketplace", icon:"fa-coins"},
            {to:"/dashboard/settings", title:"My Account", icon:"fa-user-cog"},
        ],
    }},
    components: { notify },
    methods: {
        toggleMenu() { 
            this.lMenu = !this.lMenu
            if (window.localStorage.getItem('profile') === null) {
                this.$router.push({path:"/signin"})
            }
            this.profile = JSON.parse(window.localStorage.getItem('profile'));
        },
        toggleNotification() { this.lNotification = !this.lNotification },
        notificationsClear(){
            this.$parent.notifications=[]
            // this.notifications=[]
            const that = this  
			setTimeout(function () {
				that.toggleNotification()
			}, 250);
        }
    }
  }
</script>
