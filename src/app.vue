<template>

        
        <section class="dt w-100 bg-near-black">
            <div class="dtc v-mid w-100 vh-100  ">
                
                <div class="center mw6_mod w-100 relative bg-white tessa-height overflow-x-hidden">

                    <div class="w-100 top-0 tessa-height absolute" >
                        <div class="w-100 h-50 fl" style="background:#DD6A01">
                            <div class="fl w-30">&nbsp;</div>
                            <div class="fl w-70 tc">
                                <img src="assets/img/star.png" class="absolute top-1"/>
                            </div>
                        </div>
                        <div class="bg-white w-100 h-50 fl"></div>
                    </div>

                    <div class="z-1 tessa-height absolute top-0 w-100 ph3">
                        <div class="bg-white h-100 w-100 tessa-inner-height br5 br--top">
                            <router-view class="near-black"></router-view>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    
</template>

<!-- App specific objects  -->
<script type="text/javascript">
    module.exports = {
        name: "app"
    }
</script>

<style lang="scss">
    @import "assets/tachyons/tachyons.scss";
</style>

<!-- App specific stylings  -->
<style media="screen">
    @import "assets/css/fontawesomepro.css";
    @import "assets/css/custom.min.css";

    /* @import url("https://fonts.googleapis.com/css?family=Quicksand");
    body {
        font-family: "Quicksand", sans-serif;
    } */

    .mw6_mod{max-width:26em}

    .br5 {
        border-radius: 2rem; 
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .min-h-25 {  min-height:  25%; }
    .min-h-50 {  min-height:  50%; }
    .min-h-75 {  min-height:  75%; }
    .min-h-100 {  min-height:  100%; }
    
    .tessa-inner-height{height:calc(100vh);width:100%;max-height:calc(51em - 30px);margin-top:30px}
    .tessa-height{height:calc(100vh);width:100%;max-height:calc(51em)}

    .vh-40 {  height:  40%; }
    .vh-60 {  height:  60%; }
    

    /* Orientation Lock */
    @media screen and (min-width: 320px) and (max-width: 830px) and (orientation: landscape) {
        html {
            transform: rotate(-90deg);
            transform-origin: left top;
            width: 100vh;
            overflow-x: hidden;
            position: absolute;
            top: 100vh;
            left: 0;
        }

        .tessa-height{height:200vh;max-height:46em}
        .tessa-inner-height{height:200vh;max-height:46em}
    }
</style>
