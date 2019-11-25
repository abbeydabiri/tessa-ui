<template>
    <div class="center absolute tessa-height top-0 right-0 left-0 mw6 w-100 ">
        <div class="center mw8 "  :style="{'background': 'url('+splashscreen+')','background-repeat': 'no-repeat', 'background-size': 'cover',}">
            <article class="dt center w-100 tessa-height">
                <div class="dtc v-mid f6 tc white" >
                    <img src="@/assets/img/logo-white.png" class="h3" />
                    <p>You have been logged out. </p>
                </div>
                
            </article>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common";
    import splashscreen from "@/assets/img/splashscreen.png";
    export default {
        data() {return{
            splashscreen
        }},
        created(){
            const that = this 
            setTimeout(function () {
                that.$router.push({path:"/signin"})
            }, 2500);
            HTTP.get('/api/logout',{withCredentials: true})
        }
    }
</script>
