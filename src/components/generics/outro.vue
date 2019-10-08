<template>
  <section class="w-100 center bgBlank" >
    <div class="center mw6" >
      <article class="dt center vh-100 w-100">
        <div class="dtc v-mid f6 tc white overflow-hidden">

          <img src="@/assets/img/logo-icon.png" class="h4" />
          <p>You have been logged out. </p>
          <p class="white f7 i">Built in Lagos, Nigeria</p>

        
        </div>
      </article>
    </div>
  </section>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common";
    export default {
        data() {return{}},
        created(){
            const that = this 
            setTimeout(function () {
                that.$router.push({path:"/signin"})
            }, 1500);
            HTTP.get('/api/logout',{withCredentials: true})
        }
    }
</script>
