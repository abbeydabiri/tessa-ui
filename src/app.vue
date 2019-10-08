<template >
    <div id="app">
        <router-view></router-view>
    </div>
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
</style>
