<template>
    <div class="fl w-100">
        <div class="w-100 inline-flex items-center bw1 center ba b--black">
            <div class="fl w-10 pl2">
                <i class="pr1 fas fa-user black fl "></i> 
            </div>
            <input ref="namebox" placeholder="ENTER YOUR NAME" class="mobile bg-white tc fw3 f4 tracked bn fl black pv3 ph1 w-80" type="text" v-model="localName" @keyup="keyUP">
            <div class="fl w-10 pv3" @click="$parent.submitName">
                <i class="pr1 fas fa-arrow-right black fl "></i> 
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: ['name'],
        data() {return{
            localName: this.name
        }},
        watch: {
            localName (name) {
                this.$emit('update', name)
            }
        },
        methods: {
            keyUP(event){
                if(event.code.includes("Enter")) { 
                    this.$parent.submitName()
                    return
                }
                if(event.code == "Backspace") { return }
            }
        }
    }
</script>
