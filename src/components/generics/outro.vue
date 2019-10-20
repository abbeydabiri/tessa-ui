<template>
    <section class="w-100 center bgBlank" >
        <div class="center mw6"  :style="{'background': 'url('+splashscreen+')','background-repeat': 'no-repeat', 'background-size': 'cover',}">
        <article class="dt center vh-100 w-100">
            <div class="dtc v-mid f6 tc white overflow-hidden">
                <img src="@/assets/img/logo-white.png" class="h3" />
                <p>You have been logged out. </p>
            </div>
        </article>
        </div>
    </section>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common";
    import splashscreen from "@/assets/img/splashscreen.png";
    export default {
        data() {return{}},
        created(){
            const that = this 
            setTimeout(function () {
                that.$router.push({path:"/signin"})
            }, 2500);
            HTTP.get('/api/logout',{withCredentials: true})
        }
    }
</script>
