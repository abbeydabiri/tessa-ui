<template>
    <div class="w-100 fl h-100 relative ph3" style="">

        <div class="fl w-100 near-black " style="height:calc(100% - 48px)">

            <div class="fl w-100 near-black">
                <div class="fl w-100 tl pt3 bt b--black">
                    <span class="near-black b" > 
                        BUY <span class="bg-orange white br1 ph1 b">{{record.Symbol}}</span> TOKENS
                    </span>

                    <router-link class="fr link near-black br2 center f6 pointer" :to="{name:'marketplace-view', params:{id:$route.params.id}}"> 
                        <i class="pr1 fas fa-arrow-left black fl "></i>
                    </router-link>
                </div>
            </div>

            <div class="fl w-100 ph3 near-black bg-white ba b--silver mt2">
                <div class="fl w-100">
                    <div class="fl w-30 dt" style="min-height:110px">
                        <div class="dtc v-mid w-100">
                            <img class="h3" @error="record.Icon = tokenIcon" :src="record.Icon" />
                        </div>
                    </div>

                    <div class="pv2 fl tl w-70">
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
            </div>

            <div class="fl w-100 near-black tl" >
                <div class=" cf w-100 center relative">
                    <notify :notifications="notifications" />
                </div>

                <div class="pv2 fl w-100 f6">
                    <small class="tc fl w-100 pv1">FUND WALLET ADDRESS </small>
                    <div class="pa2 bg-orange fw3 tc f8 fl white pa2 w-100 br2 truncate">{{buy.Address}}</div>
                </div>

                <div class="pv2 fl w-100 f6">
                    <small class="tl fl w-100 pv1"> ENTER AMOUNT IN NIGERIAN NAIRA: </small>
                    <input type="number" pattern="\d*" @keyup="calcToken" v-model.number="buy.Fiat" placeholder="" class="pa2 ba b--orange bg-white-10 fw3 f6  fl near-black pa2 w-100 br2">
                </div>
                
                <div class="pv2 fl w-100 f6">
                    <small class="tl fl w-100 pv1"> TOKEN AMOUNT TO BE RECEIVED: </small>
                    <input type="number" pattern="\d*" @keyup="calcFiat" v-model.number="buy.Token" placeholder="" class="pa2 ba b--orange bg-white-10 fw3 f6  fl near-black pa2 w-100 br2">
                </div>
                
                <div class="pv2 fl w-100 f6">
                    <span v-if="isSave" class="fr link white bg-black br2 center f6 inline-flex items-center pa2 pointer" @click="payWithPaystack">
                        <i class="pr1 fas fa-credit-card fl "></i> Proceed
                    </span>
                    <span v-else class="fr link black bg-light-gray br2 center f6 inline-flex items-center pa2 pointer"> 
                        <i class=" fas fa-spinner fa-pulse black fl "></i> &nbsp; Processing
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
    import tokenIcon from "@/assets/img/smartcontract.svg"

    export default {
        data() {return{
            url: "/api/tokens", 
            record: [], notifications:[],
            buy: {Fiat:0, Token:0, Address:""},
            record:{
                ID: 0, Price:0, ProjectCost:0, MaxTotalSupply:0, Icon: tokenIcon, Symbol: "- - -"
            }, 
            isFound: false, isSave: true,
            tokenIcon, 
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
            calcFiat(){
                if (this.record.Price > 0){
                    if (this.buy.Token > 0){
                        this.buy.Fiat = parseFloat(this.buy.Token * this.record.Price).toFixed(2)
                    }
                }
            },
            calcToken(){
                if (this.record.Price > 0){
                    if (this.buy.Fiat > 0){
                        this.buy.Token = parseFloat(this.buy.Fiat / this.record.Price).toFixed(2)
                    }
                }
            },
            payWithPaystack(){
                const app = this;
            
                if (parseFloat(app.buy.Token) <= 0){
                    var error = {Code:500, Message:"Amount is required"}
                    app.notifications.push(error)
                    app.$parent.$parent.notifications.push(error)
                    return
                }

                var paystackHandler = PaystackPop.setup({
                    key: 'pk_test_9adf921cdad96888c8ad753dfc2c14e7cf1cf310',
                    email: 'customer@email.com',
                    amount: app.buy.Fiat * 100,
                    currency: "NGN",
                    metadata: {
                        custom_fields: [
                            {
                                display_name: "Mobile Number",
                                variable_name: "mobile_number",
                                value: "+2348012345678"
                            }
                        ]
                    },
                    callback: function(response){
                        console.log(response)
                        if (response.status == "success") {
                            app.save()
                        } else {
                            var error = {Code:500, Message: response.message}
                            app.notifications.push(error)
                            app.$parent.$parent.notifications.push(error)    
                        }
                    },
                    onClose: function(){
                        var error = {Code:500, Message:"Payment Not Completed"}
                        app.notifications.push(error)
                        app.$parent.$parent.notifications.push(error)
                    }
                });
                paystackHandler.openIframe();
            },
            save(){
                const app = this;

                if (parseFloat(app.buy.Token) <= 0){
                    var error = {Code:500, Message:"Amount is required"}
                    app.notifications.push(error)
                    app.$parent.$parent.notifications.push(error)
                    return
                }
 
                if (!app.isSave){
                    return
                }
                app.isSave = false;

                //make a call to accounttokens
                var accountToken = {
                    Title: app.record.Title,
                    TokenID: app.record.ID,
                }

                HTTP.post("/api/accounttokens", accountToken, {withCredentials: true})
                .then((response) => {
                    app.notifications.push(response.data)
                    app.$parent.$parent.notifications.push(response.data)

                    setTimeout(function(){ checkRedirect(response.data) },500)
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        if(response.data.Code == 200){
                            //create a transaction and save
                            var transaction = {
                                Code: "mint",
                                Title: "Token Purchase",
                                TokenID: app.record.ID,
                                Amount: parseFloat(app.buy.Token),
                                FromAddress: app.record.Address,
                                ToAddress: app.buy.Address,
                            }
                            HTTP.post("/api/transactions", transaction, {withCredentials: true})
                            .then((responseTrans) => {
                                app.notifications.push(responseTrans.data)
                                app.$parent.$parent.notifications.push(responseTrans.data)

                                setTimeout(function(){ checkRedirect(responseTrans.data) },500)
                                if (responseTrans.data.Body !== null && responseTrans.data.Body !== undefined ) {
                                    if(responseTrans.data.Code == 200){
                                        setTimeout(function(){app.$router.push({name:"wallets-view", params:{id:response.data.Body}})},1500)
                                    }
                                }
                                app.isSave = true;
                            }).catch((e) => { app.isSave = true; })
                            //create a transaction and save
                        }
                    }
                }).catch((e) => {
                    app.isSave = true;
                })
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
