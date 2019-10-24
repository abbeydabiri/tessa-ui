<template>
    <div class="w-100 fl h-100 relative ph3" style="">

        <div class="fl w-100 near-black " style="height:calc(100% - 48px)">

            <div class="fl w-100 ph3 near-black bg-white ba b--silver mt3">
                <div class="fl w-100">
                    <div class="fl w-50 dt" style="min-height:110px">
                        <div class="dtc v-mid w-100">
                            <img class="h3" :src="record.Image"/>
                        </div>
                    </div>

                    <div class="pv2 fl tl w-50">
                        <div class="ph3 pv1 fl w-100">
                            <div class="db w-100 f8 fl silver">PRICE PER TOKEN</div> 
                            <div class="db w-100 f7 fw5 fl">2,000.00</div>
                        </div>
                        <div class="ph3 pv1 fl w-100">
                            <div class="db w-100 f8 fl silver">TOTAL NO OF TOKENS</div> 
                            <div class="db w-100 f7 fw5 fl">5,000.00</div>
                        </div>
                        <div class="ph3 pv1 fl w-100">
                            <div class="db w-100 f8 fl silver">MARKET CAP (N)</div> 
                            <div class="db w-100 f7 fw5 fl">10,000,000.00</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="fl w-100 tl ff b ttu mt4 mb3">
                BUY TOKENS: {{record.Symbol}}
            </div>
            
            <div class="fl w-100 near-black tl" >
                <div class=" cf w-100 center relative">
                    <notify :notifications="notifications" />
                </div>

                <div class="pv2 fl w-100 f6">
                    <small class="tl fl w-100 pv1"> ENTER AMOUNT IN NIGERIAN NAIRA: </small>
                    <input type="text" v-model="buy.Fiat" placeholder="" class="pa2 ba b--orange bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                </div>
                <div class="pv2 fl w-100 f6">
                    <small class="tl fl w-100 pv1"> TOKEN AMOUNT TO BE RECEIVED: </small>
                    <input type="text" v-model="buy.Token" placeholder="" class="pa2 ba b--orange bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                </div>
                <div class="pv2 fl w-100 f6">
                    <small class="tl fl w-100 pv1"> WALLET ADDRESS: </small>
                    <input type="text" v-model="buy.Address" placeholder="" class="pa2 ba b--orange bg-white-10 fw3 f7 fl white pa2 w-100 br2">
                </div>
                
                <div class="pv2 fl w-100 f6">
                    <router-link class="link near-black bg-light-gray br2 f6 inline-flex items-center pa2 pointer" :to="{name:'marketplace-view',params:{id:$route.params.id}}"> 
                        <i class="pr1 fal fa-times fl "></i> 
                        Cancel
                    </router-link>

                    <span class="fr link near-white bg-near-black br2 center f6 inline-flex items-center pa2 pointer"> 
                        <i class="pr1 fas fa-credit-card fl "></i> Proceed
                    </span>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {humanNumber} from "@/common"
    import {checkRedirect} from "@/common"
    import notify from "@/components/generics/notify"

    export default {
        data() {return{
            url: "/api/tokens", 
            record: [], notifications:[],
            buy: {Fiat:"",Token:"", Address:""},
            record:{
                ID: 6, Symbol:"KOBO",Name:"Dangote Refinery",Price:2000, totalSupply:50000, maxTotalSupply:21000000,
                Image:"https://files.bancor.network/0.1/images/communities?imageName=194daba0-2606-11e8-891a-85ca6815b23e.png", 
            }, 
            isFound: false,
        }},
        components: {
            notify
        },
        created (){
            this.getRecord(this.$route.params.id);
            var profile = JSON.parse(window.localStorage.getItem('profile'));
            this.buy.Address =  profile.Address
        },
        methods: {
            humanNumber,
            calcBuy(){
                
            },
            getRecord (id) {
                const app = this;
                HTTP.get(app.url+'?id='+id, {withCredentials: true}).then((response) => {
                    app.notifications.push(response.data)
                    app.$parent.$parent.notifications.push(response.data)

                    setTimeout(function(){ checkRedirect(response.data) },500)
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        if(response.data.Body.ID == id){
                            app.record = response.data.Body
                            app.isFound = true
                        }
                    }
                }).catch((e) => { console.log(e) })
            },
        }
    }
</script>
