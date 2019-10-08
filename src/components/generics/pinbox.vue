<template>
    <div class="fl w-100">
        <input ref="a" class="auth tc f2 fw6 bn pa2 dib w3 h3 white br1 hover-bg-black-40" type="password" maxlength="1" placeholder="X" v-model="a" @click="nextBox" @keyup="nextBox" />
        <input ref="b" class="auth tc f2 fw6 bn pa2 dib w3 h3 white br1 hover-bg-black-40" type="password" maxlength="1" placeholder="X" v-model="b" @click="nextBox" @keyup="nextBox" />
        <input ref="c" class="auth tc f2 fw6 bn pa2 dib w3 h3 white br1 hover-bg-black-40" type="password" maxlength="1" placeholder="X" v-model="c" @click="nextBox" @keyup="nextBox" />
        <input ref="d" class="auth tc f2 fw6 bn pa2 dib w3 h3 white br1 hover-bg-black-40" type="password" maxlength="1" placeholder="X" v-model="d" @click="nextBox" @keyup="nextBox" />
    </div>
</template>
<script type="text/javascript">
    export default {
        props: ['pin'],
        data() {return{
            localPin:this.pin, a:"", b:"", c:"", d:"",
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
                if (event.code == undefined){ return }

                if(event.code == "ArrowLeft" ) { app.prevFocus() }
                if(event.code.includes("Right")) { app.nextFocus() }
                if(event.code.includes("Arrow")) { return }

            
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
