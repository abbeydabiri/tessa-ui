<template>
    <section>
        <div class="w-100 h-100 pt5 fixed mw6 top-0 right-0 center left-0 z-0" style="background:#DD6A01;">

            <div class="fl w-30">&nbsp;</div>
            <div class="fl w-70 tc">
                <img src="assets/img/star.png" class="absolute top-1"/>
            </div>
        </div>
        <div class="bg-white w-100 h-50 pt5 fixed mw6 bottom-0 right-0 center left-0 z-0"></div>
        <div class="center mw6 w-100 ph3 relative">
            <div class="bg-white fl w-100 mt4 br5 br--top tc z-1 pt4">
                <div class="scrollbar tessa-height overflow-y-auto" style="backgroundx:url(assets/img/bg-white.png); background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover;">
                    <router-view class="near-black"></router-view>
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

    .br5 {
        border-radius: 2rem; 
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .min-h-25 {  min-height:  25%; }
    .min-h-50 {  min-height:  50%; }
    .min-h-75 {  min-height:  75%; }
    .min-h-100 {  min-height:  100%; }
    
    .min-height {min-height:568px}
    .tessa-height{height:calc(100vh - 5em);width:100%}

    .vh-40 {  height:  40%; }
    .vh-60 {  height:  60%; }
</style>
