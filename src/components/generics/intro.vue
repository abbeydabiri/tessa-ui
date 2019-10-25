<template>
    <div class="center absolute top-0 right-0 left-0 mw6 w-100 ">
        <div class="center mw8"  :style="{'background': 'url('+splashscreen+')','background-repeat': 'no-repeat', 'background-size': 'cover',}">
            <article class="dt center  min-vh-100 w-100">

                <div class="dtc v-mid f6 tc white overflow-hidden">
                    <img src="@/assets/img/logo-white.png" class="h3" />
                </div>
                
            </article>
        </div>
    </div>
</template>

<script type="text/javascript">
	import splashscreen from "@/assets/img/splashscreen.png";
	export default {
		data() {return{
			splashscreen
		}},
		created(){
			const that = this  
			setTimeout(function () {
                var username = window.localStorage.getItem('username');
                if(username !== null && username.length == 11) {
                    that.$router.push({path:"/signin"})
                } else {
                    that.$router.push({path:"/signup"})
                }
			}, 2500);
		}
	}
</script>
