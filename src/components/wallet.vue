<template>
    <section class="h-100 pt4">
        
        <img src="@/assets/img/logo.png" class="db center h2" />
        <div class="mv2 w-100 fl"></div>
        <div class="fl w-100 pt5-l pt3" >
            <img :src="infoList[curSlide].icon" class="db center w-100" />
        </div>

        <div class="fl w-100 tc"> 
            <p class="fw6 f3 black">{{infoList[curSlide].text}}</p>
            <p class="f5 gray">{{infoList[curSlide].subtext}}</p>

            <router-link :to="infoList[curSlide].link" class="fl w-100 pv2 center right-0 left-0 pointer link">
                <genericbutton :title="infoList[curSlide].button"/>
            </router-link>
        </div>
        
    </section>
</template>

<script type="text/javascript">
    import genericbutton from "@/components/generics/button"; 
    import wallet from "@/assets/img/onboard-wallet.png";

    export default {
        data() {return{
            curSlide:0,
            infoList :[
                {
                    icon: wallet,
                    text: "Wallet",
                    subtext: "Control your assets, Control your future",
                    button:"Next", link:"/tokenize"
                },
            ]
        }},
        created(){
            // alert(window.innerHeight / parseFloat(
            //     getComputedStyle(
            //         document.querySelector('body')
            //     )['font-size']
            // ))
        },
        components: { genericbutton },
        methods: {}
    }
</script>
