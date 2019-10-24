<template>
    <div class="w-100 fl h-100 relative ph3" style="">

        <div class="fl w-100 bg-white near-black" style="height:calc(100% - 48px)">

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

                <div class="fl w-100">
                    <div class="cf center w-100 bt b--silver"></div>
                </div>

                <div class="fl w-100">
                    <div class="pv2 fl w-50">
                        <div class="ph3 pv1 fl w-100">
                            <div class="db w-100 f8 fl silver">Company RC</div> 
                            <div class="db w-100 f7 fw5 fl">RC 264978</div>
                        </div>
                    </div>

                    <div class="pv2 fl w-50">
                        <div class="ph3 pv1 fl w-100">
                            <div class="db w-100 f8 fl silver">Project Type</div> 
                            <div class="db w-100 f7 fw5 fl">INFRASTRUCTURE </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="fl w-100 mv2"></div>


            <div class="fl w-100 ph3 pt3 pb2 fw6 tc white bg-orange"> {{record.Name}} </div>

            <div class="fl w-100 pa2 ba b--orange near-black bg-white overflow-y-scroll scrollbar tl" style="height:40vh">
                In 2014, FBN Holdings Plc acquired 100% equity in Kakawa Discount House Limited, and subsequently secured approval to commence merchant banking operations as FBN Merchant Bank (now FBNQuest Merchant Bank). The acquisition served as a strategic fit into the FBN Holdings portfolio and created an institution with a stronger balance sheet and access to a wider universe of funding sources.

                We are committed to finding innovative solutions for our client base of high net-worth individuals (HNIs), small and medium enterprises (SMEs), corporations, financial institutions and governments, catering to their diverse financial needs. Our distinctive heritage as an organisation allows us to leverage specialisation of the subsidiaries of our parent company to enhance delivery and provide world-class client solutions.

                Our services include Coverage & Corporate Banking, Financial Advisory, Debt Capital Markets, Equity Capital Markets, Debt Solutions, Institutional Sales, Fixed Income Currency & Treasury and Wealth Management.

            </div>

            <div class="fl w-100 pv2 tc">
                <div class="fl w-50 tl">
                    <router-link class="link near-black bg-light-gray br2 f6 inline-flex items-center pa2 pointer" :to="{name:'marketplace-search'}"> 
                        <i class="pr1 fal fa-caret-left fl "></i> 
                        Back
                    </router-link>
                </div>

                <div class="fl w-50 tr">
                    <router-link class="link near-white bg-near-black br2 center f6 inline-flex items-center pa2 pointer" :to="{name:'marketplace-buy',params:{id:$route.params.id}}"> 
                        <i class="pr1 fas fa-shopping-basket near-white fr "></i> 
                        Buy
                    </router-link>
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
