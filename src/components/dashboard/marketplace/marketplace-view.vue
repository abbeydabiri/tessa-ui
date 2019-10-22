<template>
    <div class="w-100 fl h-100 relative" style="">

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

            <div class="fl w-100">
                <div class="pv2 fl w-60" >
                    <div class="ph3 pv1 fl w-100">
                        <div class="db w-100 f8 fl silver">Company Name</div> 
                        <div class="db w-100 f7 fw5 fl near-white">Dangote Nigeria Limited</div>
                    </div>
                    <div class="ph3 pv1 fl w-100">
                        <div class="db w-100 f8 fl silver">Token Supply / Max Supply</div> 
                        <div class="db w-100 f7 fw5 fl near-white">{{humanNumber(record.totalSupply)}} / {{humanNumber(record.maxTotalSupply)}}</div>
                    </div>
                    
                </div>

                <div class="pv2 fl w-40" >
                    <div class="ph3 pv1 fl w-100">
                        <div class="db w-100 f8 fl silver">Company RC</div> 
                        <div class="db w-100 f7 fw5 fl near-white">RC 978831</div>
                    </div>
                    <div class="ph3 pv1 fl w-100">
                        <div class="db w-100 f8 fl silver">Project Type</div> 
                        <div class="db w-100 f7 fw5 fl near-white">Infrastructure </div>
                    </div>
                </div>
            </div>

            <div class="fl w-100 ph3 pt3 pb2 fw6 tl near-black bg-white overflow-y-scroll scrollbar">
                About {{record.Name}}
            </div>

            <div class="fl w-100 ph3 pb3 near-black bg-white overflow-y-scroll scrollbar tl" style="height:calc(100% - 227px)">
                The  network is an open source, distributed, and community owned network used to facilitate cross-asset transfers of value. It aims to help facilitate cross-asset transfer of value at a fraction of a penny while aiming to be an open financial system that gives people of all income levels access to low-cost financial services.

                The  network is an open source, distributed, and community owned network used to facilitate cross-asset transfers of value. It aims to help facilitate cross-asset transfer of value at a fraction of a penny while aiming to be an open financial system that gives people of all income levels access to low-cost financial services.

                The  network is an open source, distributed, and community owned network used to facilitate cross-asset transfers of value. It aims to help facilitate cross-asset transfer of value at a fraction of a penny while aiming to be an open financial system that gives people of all income levels access to low-cost financial services.

            </div>

        </div>
        
        <div class="fl w-100 inline-flex items-center pv2 ph3 tc">
            <router-link class="link white bg-black-40 br2 f6 inline-flex items-center pa2 pointer" :to="{name:'marketplace-search'}"> 
                <i class="pr1 fal fa-caret-left white fl "></i> 
                Back
            </router-link>

            <span class="w-100 tc">Token Details</span>

            <router-link class="link white bg-black-40 br2 center f6 inline-flex items-center pa2 pointer" :to="{name:'marketplace-buy',params:{id:$route.params.id}}"> 
                <i class="pr1 fas fa-shopping-basket white fl "></i> 
                Buy
            </router-link>
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
            notifications:[],
            record:{
                ID: 6, Symbol:"DANS",Name:"Dangote Refinery",Price:2000, totalSupply:50000, maxTotalSupply:21000000,
                Image:"https://files.bancor.network/0.1/images/communities?imageName=194daba0-2606-11e8-891a-85ca6815b23e.png", 
            }, 
            isFound: false,
        }},
        components: {
            notify
        },
        created (){
            this.getRecord(this.$route.params.id)
        },
        methods: {
            humanNumber,
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
