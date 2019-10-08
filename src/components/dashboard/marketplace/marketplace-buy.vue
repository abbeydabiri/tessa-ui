<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 inline-flex items-center ph3 tc" style="height:48px">
            <span class="w-100 tc">Buy <b>{{record.Symbol}}</b> Tokens</span>
        </div>

        <div class="fl w-100 bg-black-40" style="height:calc(100% - 48px)">

            <div class="fl w-100 ph3 pv3 near-black bg-white">
                <div class="fl w-70 ">
                    <div class="fl tl w-auto h3 inline-flex items-center pr1"> 
                        <img class="w3" :src="record.Image"/>
                    </div>
                    <div class="fl tl w-auto h3 inline-flex items-center ph1"> 
                        <div class="w-100 fl fw6">
                            {{record.Symbol}} <small class="db w-100 fl silver f8">{{record.Name}}</small>
                        </div>
                    </div>
                    <div class="f8 fl w-100"><small>0xa133D2e34A38b7d6454B08bd3AeAB1C0e833e233</small></div>
                </div>
                <div class="fl w-30">
                    <div class="fl tl w-100 db ph1 pb1">
                        <div class="db w-100 f8 fl silver">Price <small>(NGN)</small></div> 
                        <div class="db w-100 f5 fw6 fl near-black">{{humanNumber(record.Price)}}</div>
                    </div>
                    <div class="fl tl w-100 db ph1 pt1">
                        <div class="db w-100 f8 fl silver">Market Cap <small>(NGN)</small></div>
                        <div class="db w-100 f6 fw6 fl near-black">{{humanNumber(record.totalSupply *( record.Price))}}</div>
                    </div>
                </div>
            </div>
            
            <div class="fl w-100 pv2 ph3 near-white tl" >
                <div class=" cf w-100 center relative">
                    <notify :notifications="notifications" />
                </div>

                <div class="pv2 fl w-100 f6">
                    <small class="tl fl w-100 pv1"> Pay with Naira: </small>
                    <input type="text" v-model="buy.Fiat" placeholder="Enter Amount" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                </div>
                <div class="pv2 fl w-100 f6">
                    <small class="tl fl w-100 pv1"> Receive {{record.Symbol}} Tokens: </small>
                    <input type="text" v-model="buy.Token" placeholder="Enter Amount" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                </div>
                <div class="pv2 fl w-100 f6">
                    <small class="tl fl w-100 pv1"> Wallet Address: </small>
                    <input type="text" v-model="buy.Address" readonly="readonly" placeholder="Enter Blockchain Address" class="pa2 ba b--white-10 bg-white-10 fw3 f7 fl white pa2 w-100 br2">
                </div>
                
                <div class="pv2 fl w-100 f6">
                    <router-link class="link white bg-black-40 br2 f6 inline-flex items-center pa2 pointer" :to="{name:'marketplace-view',params:{id:$route.params.id}}"> 
                        <i class="pr1 fal fa-times white fl "></i> 
                        Cancel
                    </router-link>

                    <span class="fr link white bg-black-40 br2 center f6 inline-flex items-center pa2 pointer"> 
                        <i class="pr1 fas fa-credit-card white fl "></i> Proceed
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
