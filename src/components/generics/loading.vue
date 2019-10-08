<template>
  <section class="fixed top-0 left-0 vh-100 w-100 center bg-white-10" >
    
      <article class="dt center vh-100 w-100">
        <div class="dtc v-mid f6 tc white overflow-hidden">

          <img src="@/assets/img/logo-icon.png" class="h5" />
          <p>Thank you for Installing. </p>
          <p>We are Team Tessa. </p>
          <p class="pt4 f7 i">Visit Us @ https://tessa.site</p>
          <p class="white f7 i">Built in Lagos, Nigeria</p>

        
        </div>
      </article>
    
  </section>
</template>

<script type="text/javascript">
  import screen from "@/assets/screen.png";
  export default {
    data() {return{
      screen
    }},
    created(){
      const that = this  
      setTimeout(function () {
        that.$router.push({path:"/signin"})
      }, 3500);
    }
  }
</script>
