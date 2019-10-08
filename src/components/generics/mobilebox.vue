<template>
    <div class="fl w-100">
        <input class="auth tc f2 fw6 bn pa1 dib h3 w-90 white hover-bg-black-40" type="number" pattern="\d*" minlength="11" maxlength="11" placeholder="X X X X X X X" v-model="localMobile" @keyup="keyUP" />
    </div>
</template>
<script type="text/javascript">
    export default {
        props: ['mobile'],
        data() {return{
            localMobile: this.mobile
        }},
        watch: {
            localMobile (mobile) {
                this.$emit('update', mobile)
            }
        },
        methods: {
            keyUP(event){
                console.log(event.code)



                if(event.code.includes("Arrow")) { return }

                this.localMobile = this.localMobile.replace(/[^0-9\.]+/g, '');
                if(this.localMobile.length>11){
                    this.localMobile = this.localMobile.slice(0, 11);
                }

                if(event.code == "Backspace") { return }

                if(event.keyCode < 48 || event.keyCode > 57) {
                    if(this.localMobile.length>0) {
                        this.localMobile = this.localMobile.slice(0, -1);
                    }
                }
            }
        }
    }
</script>
