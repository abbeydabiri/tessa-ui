<template>
    <div class="fl w-100">
        <div class=" inline-flex items-center bw1 center ba b--black">
            <div class="fl w-10 pl2">
                <i class="pr1 fas fa-phone black fl " style="transform: rotateY(180deg);"></i> 
            </div>
            <input placeholder="ENTER YOUR MOBILE NUMBER" class="mobile bg-white tc fw3 f4 tracked bn fl black pv3 ph1 w-80" type="number" pattern="\d*" minlength="11" maxlength="11" v-model="localMobile" @keyup="keyUP">
            <div class="fl w-10 pv3" @click="$parent.submitMobile">
                <i class="pr1 fas fa-arrow-right black fl "></i> 
            </div>
        </div>
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
                if(event.code.includes("Enter")) { 
                    this.$parent.submitMobile()
                    return
                }
                
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
