<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100" style="height:calc(100%)">
            <div class="fl w-100 near-black ph2">
                <div class="fl w-100 pt3 tl bt b--black">
                    <span class="near-black b" > 
                        CREATE TOKEN
                    </span>

                    <router-link class="fr link near-black br2 center f6 inline-flex items-center pointer" :to="{name:'marketplace-search'}"> 
                        <i class="pr1 fas fa-arrow-left black fl "></i>
                    </router-link>
                </div>
            </div>
            
            <div class="fl w-100 pv2 ph2 near-black tl" >
                <div class=" cf w-100 center relative">
                    <notify :notifications="notifications" />
                </div>

                <div class="fl w-60 ph2">
                    <div class="fl tl w-auto h3 inline-flex items-center pr1"> 
                        <img :src="record.Icon" @error="record.Icon = tokenIcon" class="w3" @click="uploadImage('Icon')" />
                        <input type="file" class="dn f7" @change="uploadImageDisplay('Icon')" ref="Icon" />
                    </div>
                    <div class="fl tl w-auto h3 inline-flex items-center ph1"> 
                        <div class="w-100 fl fw6">
                            {{record.Symbol}} <small class="db w-100 fl silver f8">{{record.Title}}</small>
                        </div>
                    </div>
                    <div class="db w-100 fl f8 pt1 tl i">click to upload</div>
                </div>
                <div class="fl w-40">
                    <div class="fl tl w-100 db ph1 pb1">
                        <div class="db w-100 f8 fl silver">Token Supply</div> 
                        <div class="db w-100 f5 fw6 fl near-black">{{humanNumber(record.MaxTotalSupply)}}</div>
                    </div>
                    <div class="fl tl w-100 db ph1 pt1">
                        <div class="db w-100 f8 fl silver">Tokens Issued</div>
                        <div class="db w-100 f6 fw6 fl near-black">{{humanNumber(record.TotalSupply)}}</div>
                    </div>
                </div>

                <div class="pv2 ph1 fl w-60 f6">
                    <small class="tl fl w-100 pv1"> Company Name: </small>
                    <input type="text" v-model="record.Company" placeholder="" class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>
                <div class="pv2 ph1 fl w-40 f6">
                    <small class="tl fl w-100 pv1"> Company RC: </small>
                    <input type="text" v-model="record.RC" placeholder="" class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>

                <div class="pv2 ph1 fl w-60 f6">
                    <small class="tl fl w-100 pv1"> Token Name: </small>
                    <input type="text" v-model="record.Title" placeholder="" class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>
                <div class="pv2 ph1 fl w-40 f6">
                    <small class="tl fl w-100 pv1"> Token Symbol: </small>
                    <input type="text" v-model="record.Symbol" placeholder="" maxlength="4" class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>
                
                
                <div class="pv2 ph1 fl w-60 f6">
                    <small class="tl fl w-100 pv1"> Project Type: </small>
                    <input type="text" v-model="record.Project" placeholder="" class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>
                <div class="pv2 ph1 fl w-40 f6">
                    <small class="tl fl w-100 pv1"> Project Cost:  <small>(NGN)</small>: </small>
                    <input type="number" pattern="\d*" v-model.number="record.ProjectCost" placeholder="" @keyup="calcMaxTotalSupply" class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>

                <div class="pv2 ph1 fl w-60 f6">
                    <small class="tl fl w-100 pv1"> Your Deposit <small>(NGN)</small>: </small>
                    <input type="number" pattern="\d*" v-model.number="record.Deposit" placeholder=""  class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>
                <div class="pv2 ph1 fl w-40 f6">
                    <small class="tl fl w-100 pv1"> Cost per Token <small>(NGN)</small>: </small>
                    <input type="number" pattern="\d*" v-model.number="record.Price" placeholder="" @keyup="calcMaxTotalSupply"  class="pa2 ba b--orange bg-white fw3 f6  fl near-black pa2 w-100">
                </div>


                <div class="pv2 ph1 fl w-100 f6">
                    <small class="tl fl w-100 pv1"> Company Description: </small>
                    <textarea rows="3" v-model="record.Description" class="pa2 ba b--orange bg-white fw3 f6  fl near-black pa2 w-100"></textarea>
                </div>

                
                
                <div class="pv2 fl w-100 f6 ph1">
                    <span v-if="isSave" class="fr link white bg-black br2 center f6 inline-flex items-center pa2 pointer" @click="payWithPaystack">
                        <i class="pr1 fas fa-coins white fl "></i> Create Token
                    </span>
                    <span v-else class="fr link black bg-light-gray br2 center f6 inline-flex items-center pa2 pointer"> 
                        <i class=" fas fa-spinner fa-pulse black fl "></i> &nbsp; Creating
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

    import {displayImage} from "@/common"

    import notify from "@/components/generics/notify"
    import tokenIcon from "@/assets/img/smartcontract.svg"


    export default {
        data() {return{
            url: "/api/tokens", 
            notifications:[],
            buy: {Fiat:"",Token:"", Address:""},
            record:{
                Icon:"", Symbol:"-", Title:"-", ProjectCost:0, Deposit:0, Price:0, MaxTotalSupply:0, TotalSupply:0, Seed:0, Image:tokenIcon, 
            }, 
            isSave: true,
            tokenIcon
        }},
        components: {
            notify
        },
        created (){
            var profile = JSON.parse(window.localStorage.getItem('profile'));
            if (window.localStorage.getItem('profile') !== null) {
                this.buy.Address =  profile.Address
            }
            
        },
        methods: {
            humanNumber,
            calcMaxTotalSupply(){
                if (this.record.ProjectCost > 0 && this.record.Price > 0){
                    this.record.MaxTotalSupply = parseFloat((this.record.ProjectCost / this.record.Price).toFixed(0))
                }

                if (this.record.Deposit > 0 && this.record.Price > 0){
                    this.record.TotalSupply = parseFloat((this.record.Deposit / this.record.Price).toFixed(0))
                }

                if (this.record.Price < 0){
                    this.record.TotalSupply = 0;
                    this.record.MaxTotalSupply = 0;
                }

                // if (this.record.MaxTotalSupply > 0 && this.record.ProjectCost > 0){
                //     this.record.Price = this.record.ProjectCost / this.record.MaxTotalSupply
                // }
            },
            uploadImageDisplay(field) {
                displayImage(event, this, field)
            },
            uploadImage(imageRef) {
                this.$refs[imageRef].click()
            },
            payWithPaystack(){
                const app = this;
            
                if (parseFloat(app.record.ProjectCost) <= 0){
                    var error = {Code:500, Message:"Project Cost is required"}
                    app.notifications.push(error)
                    app.$parent.$parent.notifications.push(error)
                    return
                }

                if (parseFloat(app.record.Price) <= 0){
                    var error = {Code:500, Message:"Token Price is required"}
                    app.notifications.push(error)
                    app.$parent.$parent.notifications.push(error)
                    return
                }
                
                if (parseFloat(app.record.Deposit) <= 0){
                    app.save()
                    return
                }

                var paystackHandler = PaystackPop.setup({
                    key: 'pk_test_9adf921cdad96888c8ad753dfc2c14e7cf1cf310',
                    email: 'customer@email.com',
                    amount: app.record.Deposit * 100,
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
            save() {
                const app = this;
                if (!app.isSave){
                    return
                }
                app.isSave = false;
                app.record.Seed = app.record.TotalSupply
                HTTP.post(app.url, app.record, {withCredentials: true})
                .then((response) => {
                    app.notifications.push(response.data)
                    app.$parent.$parent.notifications.push(response.data)

                    setTimeout(function(){ checkRedirect(response.data) },500)
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        if(response.data.Code == 200){
                            // app.record = { Icon:"", Symbol:"-", Title:"-", ProjectCost:0, Deposit:0, Price:0, MaxTotalSupply:0, TotalSupply:0, Seed:0, Image:tokenIcon, }

                            //Before redirecting to Creator's Wallet - Create the Token and accompanying Transactions


                            if (parseFloat(app.record.Deposit) <= 0){
                                setTimeout(function(){app.$router.push({name:"marketplace-view", params:{id:response.data.Body}})},1500)
                            } else {
                                
                                HTTP.get(app.url+'?id='+response.data.Body, {withCredentials: true}).then((responseToken) => {
                                    app.notifications.push(responseToken.data)
                                    app.$parent.$parent.notifications.push(responseToken.data)

                                    setTimeout(function(){ checkRedirect(responseToken.data) },500)
                                    if (responseToken.data.Body !== null && responseToken.data.Body !== undefined ) {
                                        
                                        var responseTokenRecord = responseToken.data.Body

                                        //create a accounttoken save and make a transaction
                                        //make a call to accounttokens
                                        var accountToken = {
                                            Title: app.record.Title,
                                            TokenID: response.data.Body,
                                        }

                                        HTTP.post("/api/accounttokens", accountToken, {withCredentials: true})
                                        .then((responseAccountTokens) => {
                                            app.notifications.push(responseAccountTokens.data)
                                            app.$parent.$parent.notifications.push(responseAccountTokens.data)

                                            setTimeout(function(){ checkRedirect(responseAccountTokens.data) },500)
                                            if (responseAccountTokens.data.Body !== null && responseAccountTokens.data.Body !== undefined ) {
                                                if(responseAccountTokens.data.Code == 200){
                                                    //create a transaction and save
                                                    var transaction = {
                                                        Title: "Token Purchase",
                                                        TokenID: accountToken.TokenID,
                                                        Amount: parseFloat(app.record.Seed),
                                                        FromAddress: responseTokenRecord.Address,
                                                        ToAddress: app.buy.Address,
                                                    }
                                                    HTTP.post("/api/transactions", transaction, {withCredentials: true})
                                                    .then((responseTrans) => {
                                                        app.notifications.push(responseTrans.data)
                                                        app.$parent.$parent.notifications.push(responseTrans.data)

                                                        setTimeout(function(){ checkRedirect(responseTrans.data) },500)
                                                        if (responseTrans.data.Body !== null && responseTrans.data.Body !== undefined ) {
                                                            if(responseTrans.data.Code == 200){
                                                                setTimeout(function(){app.$router.push({name:"wallets-view", params:{id:responseAccountTokens.data.Body}})},1500)
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
                                        //create a accounttoken save and make a transaction
                                            
                                        
                                    }
                                }).catch((e) => { console.log(e) })    
                            }
                        }
                    }
                    app.isSave = true;
                }).catch((e) => {
                    console.log(e);
                    app.isSave = true;
                })
            },
        },
    }
</script>
