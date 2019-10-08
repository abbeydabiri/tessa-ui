<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 inline-flex items-center pv2 ph3 tc">
            <router-link class="link white bg-black-40 br2 f6 inline-flex items-center pa2 pointer" :to="{name:'contacts-search'}"> 
                <i class="pr1 fas fa-times white fl "></i> 
                Close
            </router-link>

            <span class="w-100 tc">View Contact</span>

            <router-link class="link white bg-black-40 br2 center f6 inline-flex items-center pa2 pointer" :to="{name:'contacts-edit'}"> 
                <i class="pr1 fas fa-pen white fl "></i> 
                Edit
            </router-link>
        </div>

        <div class="pa3 fl w-100 dt overflow-y-scroll bg-black-40 scrollbar" style="height:calc(100% - 48px)">
            
                <div class="dtc v-top tc white w-100">
                    

                    <div class="pv2 fl w-100">
                        <input type="text" v-model="record.Firstname" disabled="disabled" placeholder="First name" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                    </div>

                    <div class="pv2 fl w-100">
                        <input type="text" v-model="record.Lastname" disabled="disabled" placeholder="Last name" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                    </div>

                    <div class="pv2 fl w-100">
                        <input type="text" v-model="record.Mobile" disabled="disabled" placeholder="Mobile" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                    </div>

                    <div class="pv2 fl w-100">
                        <input type="text" v-model="record.Email" disabled="disabled" placeholder="Email" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                    </div>

                    <div class="pv2 fl w-100">
                        <input type="text" v-model="record.Address" disabled="disabled" placeholder="Account" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                    </div>

                    <div class="pv2 fl w-100">
                        <textarea v-model="record.Description" disabled="disabled" placeholder="About Contact" class="h3 pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2"></textarea>
                    </div>

                </div>
                
        </div>

    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {checkRedirect} from "@/common"
    import notify from "@/components/generics/notify"

    export default {
        data() {return{
            url: "/api/contacts", 
            record: [], notifications:[],
            isFound: false,
        }},
        components: {
            notify
        },
        created (){
            this.getRecord(this.$route.params.id)
        },
        methods: {
            getRecord (id) {
                const app = this;
                HTTP.get(app.url+'?id='+id, {withCredentials: true}).then((response) => {
                    app.notifications.push(response.data)
                    app.$parent.$parent.notifications.push(response.data)

                    setTimeout(function(){ checkRedirect(response.data) },500)
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        app.record = response.data.Body
                        if(response.data.Body.ID == id){
                            app.isFound = true
                        }
                    }
                }).catch((e) => { console.log(e) })
            },
        }
    }
</script>
