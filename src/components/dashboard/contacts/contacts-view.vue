<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 near-black">
            <div class="fl w-100 tl  bt b--black">
                <span class="near-black b" > 
                    VIEW CONTACT
                </span>

                <router-link class="fr link near-black br2 center f6 inline-flex items-center pa2 pointer" :to="{name:'contacts-search'}"> 
                    <i class="pr1 fas fa-arrow-left black fl "></i>
                </router-link>
            </div>
        </div>

        <div class="pa3 fl w-100 dt overflow-y-scroll scrollbar" style="height:calc(100% - 48px)">
            
                <div class="dtc v-top tc near-black w-100">
                    

                    <div class="pv2 fl w-100">
                        <small class="tl fl w-100 pv1"> Contact Firstname: </small>
                        <input type="text" v-model="record.Firstname" disabled="disabled" placeholder="First name" class="pa2 ba b--orange bg-white-10 fw3 f6  fl near-black pa2 w-100 br2">
                    </div>

                    <div class="pv2 fl w-100">
                        <small class="tl fl w-100 pv1"> Contact Lastname: </small>
                        <input type="text" v-model="record.Lastname" disabled="disabled" placeholder="Last name" class="pa2 ba b--orange bg-white-10 fw3 f6  fl near-black pa2 w-100 br2">
                    </div>

                    <div class="pv2 fl w-100">
                        <small class="tl fl w-100 pv1"> Contact Mobile: </small>
                        <input type="text" v-model="record.Mobile" disabled="disabled" placeholder="Mobile" class="pa2 ba b--orange bg-white-10 fw3 f6  fl near-black pa2 w-100 br2">
                    </div>

                    <div class="pv2 fl w-100">
                        <small class="tl fl w-100 pv1"> Contact Email: </small>
                        <input type="text" v-model="record.Email" disabled="disabled" placeholder="Email" class="pa2 ba b--orange bg-white-10 fw3 f6  fl near-black pa2 w-100 br2">
                    </div>

                    <div class="pv2 fl w-100">
                        <small class="tl fl w-100 pv1"> Contact Address: </small>
                        <input type="text" v-model="record.Address" disabled="disabled" placeholder="Account" class="pa2 ba b--orange bg-white-10 fw3 f6  fl near-black pa2 w-100 br2">
                    </div>

                    <div class="pv2 fl w-100">
                        <small class="tl fl w-100 pv1"> About Contact: </small>
                        <textarea v-model="record.Description" disabled="disabled" placeholder="About Contact" class="h3 pa2 ba b--orange bg-white-10 fw3 f6  fl near-black pa2 w-100 br2"></textarea>
                    </div>


                    <div class="pv2 fl w-100 f6 ph1">
                    
                        <router-link class="link fr white bg-black br2 center f6 inline-flex items-center pa2" :to="{name:'contacts-edit'}">
                            <i class="pr1 fas fa-pen white fl "></i> 
                            Edit
                        </router-link>
                        
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
