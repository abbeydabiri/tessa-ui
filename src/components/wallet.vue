<template>
    <section class="h-100 bg-white">
        <div class=" w-100 min-h-75 fl">
            <img src="@/assets/img/logo.png" class="db center h2" />
            <div class="mv2 w-100 fl"></div>
            <div class="fl w-100" style="min-height:8em">
                <img :src="infoList[curSlide].icon" class="db center w-100 w-70-l" />
            </div>

            <div class="fl w-100"> 
                <p class="fw6 f3 black">{{infoList[curSlide].text}}</p>
                <p class="f5 gray">{{infoList[curSlide].subtext}}</p>
            </div>
        </div>
        <div class=" w-100 min-h-25 fl dt">
            <div class="dtc v-mid tc">
                <router-link :to="infoList[curSlide].link" class="fl w-100 pv2 center right-0 left-0 pointer link">
                    <genericbutton :title="infoList[curSlide].button"/>
                </router-link>
            </div>
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
        components: { genericbutton },
        methods: {}
    }
</script>
