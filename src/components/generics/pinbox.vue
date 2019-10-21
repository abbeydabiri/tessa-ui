<template>
    <div class="fl w-100 bw1 center b--black ba relative">
        <div class="fl w-100 tc absolute left-0 right-0" style="top:-10px">
            <label class="bg-white ph3 f6"> {{title}} </label>
        </div>
        <input ref="a" class="pin inline-flex items-center bg-white bn tc fw3 f4 pa3 dib fl w-25 near-black " placeholder="-" type="password" maxlength="1" v-model="a" @click="nextBox" @keyup="nextBox" />
        <input ref="b" class="pin inline-flex items-center bg-white bn tc fw3 f4 pa3 dib fl w-25 near-black " placeholder="-" type="password" maxlength="1" v-model="b" @click="nextBox" @keyup="nextBox" />
        <input ref="c" class="pin inline-flex items-center bg-white bn tc fw3 f4 pa3 dib fl w-25 near-black " placeholder="-" type="password" maxlength="1" v-model="c" @click="nextBox" @keyup="nextBox" />
        <input ref="d" class="pin inline-flex items-center bg-white bn tc fw3 f4 pa3 dib fl w-25 near-black " placeholder="-" type="password" maxlength="1" v-model="d" @click="nextBox" @keyup="nextBox" />
    </div>
</template>
<script type="text/javascript">
    export default {
        props: ['pin','title'],
        data() {return{
            localPin:this.pin, a:" ", b:" ", c:" ", d:" ",
        }},
        watch: {
            localPin(pin) {
                this.$emit('update', pin)
            }
        },
        methods: {
            nextFocus() {
                var app = this;
                switch (true) {
                    case app.$refs.a == document.activeElement:
                        app.$refs.b.focus();
                        break
                    case app.$refs.b == document.activeElement:
                        app.$refs.c.focus();
                        break
                    case app.$refs.c == document.activeElement:
                        app.$refs.d.focus();
                        break
                }
            },
            prevFocus() {
                var app = this;
                switch (true) {
                    case app.$refs.d == document.activeElement:
                        app.$refs.c.focus();
                        break
                    case app.$refs.c == document.activeElement:
                        app.$refs.b.focus();
                        break
                    case app.$refs.b == document.activeElement:
                        app.$refs.a.focus();
                        break
                }
            },
            nextBox(event){
                
                var app = this;
                if(app.a==" "){ app.a = "" } 
                if (app.b==" ") { app.b = "" }
                if (app.c==" ") { app.c = "" }
                if (app.d==" ") { app.d = "" }
                if (event.code == undefined){ return }

                if(event.code == "ArrowLeft" ) { app.prevFocus() }
                if(event.code == "ArrowRight ") { app.nextFocus() }
                if(event.code.includes("Arrow")) { return }


                if(event.code.includes("Right")) { return }
                if(event.code.includes("Left")) { return }

            
                if(event.code == "Backspace") {
                    if(app.d==""){
                        app.$refs.c.focus();
                    } 
                    if (app.c=="") {
                        app.$refs.b.focus();
                    } 
                    if (app.b=="") {
                        app.$refs.a.focus();
                    }
                    return
                }

                app.localPin = "";
                

                // if(app.a==""){
                //     app.$refs.a.focus();
                // } else if (app.b=="") {
                //     app.$refs.b.focus();
                // } else if (app.c=="") {
                //     app.$refs.c.focus();
                // } else if (app.d=="") {
                //     app.$refs.d.focus();
                // }
                app.nextFocus()
                if (app.a !== "" && app.b  !== "" && app.c !== "" && app.d  !== "") {
                    app.localPin = app.a+app.b+app.c+app.d;
                }
            }
        }
    }
</script>
