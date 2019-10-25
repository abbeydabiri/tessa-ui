<template>
    <div class="w-100 fl h-100 relative ph3" style="">

        <div class="fl w-100 bg-white near-black" style="height:calc(100% - 48px)">

            <div class="fl w-100 ph3 near-black bg-white ba b--silver mt3">
                <div class="fl w-100">
                    <div class="fl w-50 dt" style="min-height:110px">
                        <div class="dtc v-mid w-100">
                            <img class="h3" @error="record.Icon = tokenIcon" :src="record.Icon" />
                        </div>
                    </div>

                    <div class="pv2 fl tl w-50">
                        <div class="ph3 pv1 fl w-100">
                            <div class="db w-100 f8 fl silver">TOKEN PRICE (₦)</div> 
                            <div class="db w-100 f7 fw5 fl">{{humanNumber(record.Price)}}</div>
                        </div>
                        <div class="ph3 pv1 fl w-100">
                            <div class="db w-100 f8 fl silver">TOKEN SUPPLY</div> 
                            <div class="db w-100 f7 fw5 fl">{{humanNumber(record.MaxTotalSupply)}}</div>
                        </div>
                        <div class="ph3 pv1 fl w-100">
                            <div class="db w-100 f8 fl silver">MARKET CAP (₦)</div> 
                            <div class="db w-100 f7 fw5 fl">{{humanNumber(record.ProjectCost)}}</div>
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
                            <div class="db w-100 f7 fw5 fl">{{record.RC}}</div>
                        </div>
                    </div>

                    <div class="pv2 fl w-50">
                        <div class="ph3 pv1 fl w-100">
                            <div class="db w-100 f8 fl silver">Project Type</div> 
                            <div class="db w-100 f7 fw5 fl">{{record.Project}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="fl w-100 mv2"></div>


            <div class="fl w-100 ph3 pt3 pb2 fw6 tc white bg-orange"> {{record.Company}} </div>

            <div class="fl w-100 pa2 ba b--orange near-black bg-white overflow-y-scroll scrollbar tl" style="height:calc(100vh - 400px)">
                {{record.Description}}
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
    import tokenIcon from "@/assets/img/smartcontract.svg"

    export default {
        data() {return{
            url: "/api/tokens", 
            notifications:[],
            record:{
                ID: 0, Price:0, ProjectCost:0, MaxTotalSupply:0, Icon: tokenIcon
            }, 
            isFound: false,
            tokenIcon
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
                            if (app.record.Icon == "") {
                                app.record.Icon = app.tokenIcon
                            }
                            app.isFound = true
                        }
                    }
                }).catch((e) => { console.log(e) })
            },
        }
    }
</script>
