<template>
    <section class="min-vh-100 w-100 center" >
        <nav class="w-100 center bg-black-10">
            <span class="inline-flex items-center w-100">
                <router-link to="/signin" class="fl ph2 no-underline absolute left-0 top-1">
                    <i class="white center fal fa-arrow-alt-left"></i>
                </router-link>
                <p class="center tracked white">RESTORE ACCOUNT</p>
            </span>
        </nav>

        <div class="center mw7 mw6-l" >
            <article class="dt center w-100">
                <div class="dtc tc pa0 v-mid vh-75 min-vh-75 f6 near-white">
                
                <div class="cf w-100 pt5-l"></div>

                <div class="pa2 cf w-100 center" style="max-width:320px" >

                    <p class="db w-100 pv1 f6 white fw2"> Enter your passhrase to restore your account</p>

                    <div class="cf w-100 pv2">
                    <textarea class="f6 fw4 bn pa2 dib w-100" rows="4" type="text" placeholder="your passhrase"></textarea>
                    </div>

                    <div class="cf w-100 pv2">
                    <input class="f6 fw4 bn pa2 dib w-100" type="text" placeholder="enter username"/>
                    </div>

                    <div class="cf w-100 pv2">
                    <input class="f6 fw4 bn pa2 dib w-100" type="password" placeholder="choose password"/>
                    </div>

                    <div class="cf w-100 pv2">
                    <input class="f6 fw4 bn pa2 dib w-100" type="password" placeholder="confirm password"/>
                    </div>

                    <div class="cf w-100 pv2"></div>


                    <span @click="restore" class="cf tl br1 no-underline inline-flex items-center white button relative">
                        <span class="ph2">RESTORE ACCOUNT</span> <i class="bg-black-50 pa2 br1 br--right fal fa-recycle"></i>
                    </span>

                    <div class="cf w-100 pt2">
                    <router-link to="/signin" class="cf no-underline">
                        <p class="near-white f7">remember your password? <label class="white pl3 underline">Sign In</label></p>
                    </router-link>
                    </div>

                    
                </div>

                </div>
            </article>
        </div>
    </section>
</template>

<script type="text/javascript">
    import screen from "@/assets/screen.png";

    export default {
        data() {return{
            screen
        }},
        created(){
            console.log("LOGIN LOADED")
        },
        methods:{
            restore () {

            }
        }
    }
</script>
