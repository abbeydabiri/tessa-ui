<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 near-black ph3">
            <div class="fl w-100 tl pt3 bt b--black">
                <span class="near-black b" > 
                    VIEW CONTACT
                </span>

                <router-link class="fr link near-black br2 center f6 pointer" :to="{name:'contacts-search'}"> 
                    <i class="pr1 fas fa-arrow-left black fl "></i>
                </router-link>
            </div>
        </div>

        <div class="ph3 fl w-100 dt overflow-y-scroll scrollbar" style="height:calc(100% - 48px)">
            
            <div class="dtc v-top tc near-black w-100 pt2">

                <div class="pv2 fl w-100 relative h4 h5-l">
                    <img src="@/assets/icon-header-profile.png" class="center h3 dn" /> 

                    <div class="relative h4 h5-l inline-flex items-center tc">
                        <i class="z-2 fas fa-times white bg-black pa1 f6 f5-l br2"></i>
                        <img src="https://www.pwc.com/ng/en/people/photos/femi-osinubi.jpg.pwcimage.200.252.jpg" class="center br-100 w4 h4 w5-l h5-l ba b--light-gray bw2" /> 
                        <router-link class="link pointer" :to="{name:'contacts-edit'}">
                            <i class="z-2 fas fa-pen white bg-black pa1 f7 f6-l br2"></i>
                        </router-link>
                    </div>

                    <div class="relative w-100 dn">
                        <div class="cf w-100 relative" style="top:-6px">
                            <i class="z-2 fas fa-times white bg-black pa1 f6 f5-l br2 mr4 mr5-l"></i>

                            <router-link class="link pointer" :to="{name:'contacts-edit'}">
                                <i class="z-2 fas fa-pen white bg-black pa1 f7 f6-l br2 ml4 ml5-l"></i>
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="fl w-100 mt3" style="min-height:102px">
                    <div class="fl tc w-100 ttu fw6 f3">
                        {{record.Firstname}} {{record.Lastname}}
                    </div>

                    <div class="pv2 fl tc w-100 ttl f6">
                        {{record.Email}}
                    </div>

                    <div class="fl tc w-100 ttl f6">
                        {{record.Mobile}}
                    </div>

                    <div class="pt2 fl w-100">
                        <div class="pa1 cf f8 bg-orange br2 white">
                            {{record.Address}}
                        </div>
                    </div>
                </div>

                <div class="pv2 fl w-100">
                    <textarea v-model="record.Description" disabled="disabled" placeholder="About Contact" class="h4 pa2 ba b--orange bg-white-10 fw3 f6  fl near-black pa2 w-100 br2"></textarea>
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
