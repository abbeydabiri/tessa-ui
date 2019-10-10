<template>
    <section class="h-100">
        <div class=" w-100 min-h-75 fl">
            <img src="@/assets/img/logo.png" class="db center h2" />
            <div class="mv2 w-100 fl"></div>
            <div class="fl w-100">
                <img :src="infoList[curSlide].icon" class="db center w-100 w-70-l" />
            </div>

            <div class="fl w-100"> 
                <p class="fw6 f3 black">{{infoList[curSlide].text}}</p>
                <p class="f5 gray">{{infoList[curSlide].subtext}}</p>
            </div>
        </div>
        <div class=" w-100 min-h-25 fl dt">
            <div class="dtc v-mid tc">
                <div class="cf w-100 center right-0 left-0" @click="nextSlide">
                    <genericbutton :title="infoList[curSlide].button"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script type="text/javascript">
    import genericbutton from "@/components/generics/button";

    import wallet from "@/assets/img/onboard-wallet.png";
    import tokenize from "@/assets/img/onboard-tokenize.png";
    import marketplace from "@/assets/img/onboard-marketplace.png";

    export default {
        data() {return{
            curSlide:0,
            infoList :[
                {
                    icon: wallet,
                    text: "Wallet",
                    subtext: "Control your assets, Control your future",
                    button:"Next"
                },
                {
                    icon: tokenize,
                    text: "Tokenize",
                    subtext: "Assets of the future",
                    button:"Next"
                },
                {
                    icon: marketplace,
                    text: "Marketplace",
                    subtext: "Trade, Barter, Exchange",
                    button:"Finish"
                }

            ]
        }},        
        components: { genericbutton },
        methods: {
            nextSlide(){
                console.log(this.curSlide)
                this.curSlide++;
                console.log(this.curSlide)
                if(this.curSlide > 2){
                    this.curSlide = 0
                    //@AD  redirect to signup page
                    this.$router.push({name:"signin"})
                    //@AD redirect to signup page
                }
            }
        }
    }
</script>
