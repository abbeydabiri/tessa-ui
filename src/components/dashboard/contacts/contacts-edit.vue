<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 near-black ph3">
            <div class="fl w-100 tl pt3 bt b--black">
                <span class="near-black b" > 
                    EDIT CONTACT
                </span>

                <router-link class="fr link near-black br2 center f6 inline-flex items-center pa2 pointer" :to="{name:'contacts-view',params:{id:this.$route.params.id}}"> 
                    <i class="pr1 fas fa-arrow-left black fl "></i>
                </router-link>
            </div>
        </div>

        <div class="pa3 fl w-100 dt overflow-y-scroll scrollbar" style="height:calc(100% - 48px)">
            <div class="dtc v-top tc near-black w-100">
                <div class=" cf w-100 center relative">
                    <notify :notifications="notifications" />
                </div>
                

                <div class="pv2 fl w-100">
                    <small class="tl fl w-100 pv1"> Contact Firstname: </small>
                    <input type="text" v-model="record.Firstname" placeholder="" class="pa2 ba b--orange bg-white fw3 f6  fl near-black pa2 w-100 br2">
                </div>

                <div class="pv2 fl w-100">
                    <small class="tl fl w-100 pv1"> Contact Lastname: </small>
                    <input type="text" v-model="record.Lastname" placeholder="" class="pa2 ba b--orange bg-white fw3 f6  fl near-black pa2 w-100 br2">
                </div>

                <div class="pv2 fl w-100">
                    <small class="tl fl w-100 pv1"> Contact Mobile: </small>
                    <input type="text" v-model="record.Mobile" placeholder="" class="pa2 ba b--orange bg-white fw3 f6  fl near-black pa2 w-100 br2">
                </div>

                <div class="pv2 fl w-100">
                    <small class="tl fl w-100 pv1"> Contact Email: </small>
                    <input type="text" v-model="record.Email" placeholder="" class="pa2 ba b--orange bg-white fw3 f6  fl near-black pa2 w-100 br2">
                </div>

                <div class="pv2 fl w-100 dn">
                    <small class="tl fl w-100 pv1"> Wallet Address: </small>
                    <input type="text" v-model="record.Address" placeholder="" class="pa2 ba b--orange bg-white fw3 f6  fl near-black pa2 w-100 br2">
                </div>

                <div class="pv2 fl w-100">
                    <small class="tl fl w-100 pv1"> About Contact: </small>
                    <textarea v-model="record.Description" placeholder="" class="h3 pa2 ba b--orange bg-white fw3 f6  fl near-black pa2 w-100 br2"></textarea>
                </div>

                <div class="pv2 fl w-100 f6 ph1">
                    <span v-if="isSave" class="fr white bg-black br2 center f6 inline-flex items-center pa2" @click="save"> <i class="pr1 fal fa-save white fl "></i> Save </span>
                    <span v-else class="fr white bg-light-gray br2 center f6 inline-flex items-center pa2"> <i class=" fas fa-spinner fa-pulse white fl "></i> Wait </span>
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
            isSave: true, isFound: false,
        }},
        components: {
            notify
        },
        created () {  
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
            save () {
                const app = this;
                if (!app.isSave){
                    return
                }
                app.isSave = false;
                HTTP.post(app.url, app.record, {withCredentials: true})
                .then((response) => {
                    app.notifications.push(response.data)
                    app.$parent.$parent.notifications.push(response.data)

                    setTimeout(function(){ checkRedirect(response.data) },500)
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        app.$router.push({name:"contacts-view",params:{id:response.data.Body}})
                    }
                    app.isSave = true;
                }).catch((e) => {
                    console.log(e);
                    app.isSave = true;
                })
            },
        }
    }
</script>
