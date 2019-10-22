<template>
    <section class="relative fl w-100">
        <div style="top:1.8em" class="w-100 center cf fixed ph3 left-0 right-0 inline-flex items-center w-100">
            <span class="fl ph3 pointer" >
                <i class="fa fa-bars f4 tr orange" @click="toggleMenu"></i>
            </span>

            <span class="center b ">
                <h1 class="f4 tracked orange">{{title}}</h1>
            </span>

            <span class="fr ph3 pointer" >
                <i class="fa fa-bell f3 tr orange" @click="toggleNotification"></i>
            </span>
        </div>

        <div class="fixed w-100 top-0 left-0 z-max">
            <div class="w-100 vh-100 mw8 cf center absolute dn z-max top-0 left-0 right-0" :class="{'db':lMenu,'dn':!lMenu}" :style="{'background': 'url('+splashscreen+')','background-repeat': 'no-repeat', 'background-size': 'cover',}">
                <div class="vh-100 w-100 fl relative">

                    <i class="fal fa-times white absolute z-max right-1 top-1 f2 fw6" @click="toggleMenu"></i>
                    <div class="mw8 cf w-100 " :class="{'slideInLeft':lMenu,'slideOutLeft':!lMenu}">
                        <nav class="vh-100 bg-main w-80 w-50-ns relative" > 

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
                                <span class="f7">NGN</span> 1,000.00
                            </div>


                            <div class="cf overflow-auto" style="height:calc(100% - 175px)">
                                
                                <span @click="toggleMenu">
                                    <router-link class="w-100 link white fl bt b--white-10 pv4 ph3 inline-flex items-center pa2 f5 hover-bg-black-10" v-for="(link, index) in sidemenu" :key="index" :to="link.to"> 
                                        <i class="white mr2 fal" :class="link.icon"></i> {{link.title}}
                                    </router-link>
                                </span>

                                
                            </div>
                            
                            <div class="w-80 w-50-ns tc cf pv1 mw8 center fixed bottom-0 left-0 footer  inline-flex items-center">
                                <router-link class="f5 f4-l link w-100 tl inline-flex items-center white pl2 tracked" to="/logout">
                                    <i class="fal fa-sign-out-alt fl ma1" id="fa-sign-out"></i>  Logout
                                </router-link>
                            </div>
                            
                        </nav>
                    </div>
                </div>
            </div>

            <div class="bg-black-80 w-100 vh-100 dn absolute z-max top-0 right-0 overflow-x-scroll pv2"  :class="{'slideInRight':lNotification,'slideOutRight':!lNotification}">
                <nav class="w-100 center cf fixed top-0 left-0  inline-flex items-center w-100 h3 bg-black-20">
                    <span class="fl ph3" >
                        <i class="fa fa-times f3 tr white" @click="notificationsClear"></i>
                    </span>

                    <span class="center b tracked ">
                        <h1 class="f4">Notifications</h1>
                    </span>

                    <span class="fr ph3" >
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
            // if (window.localStorage.getItem('profile') === null) {
            //     this.$router.push({path:"/signin"})
            // }
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
