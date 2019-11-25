<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 near-black ph3">
            <div class="w-100 tl h2 pv3 bt b--black inline-flex items-center">
                <router-link class="fl w-50 link near-black br2 tl f7 pointer inline-flex items-center" :to="{name:'wallets-view',params:{id:transaction.AccountToken.ID}}"> 
                    <i class="pr1 fas fa-wallet black f5"></i> View Wallet
                </router-link>
                <router-link class="fl w-50 link near-black br2 tr f6 pointer" :to="{name:'transactions-search'}"> 
                    <i class="fas fa-arrow-left black "></i>
                </router-link>
            </div>
        </div>
        

        <div class="ph3 fl w-100 ph1 near-black bg-white">
            <div class="fl w-100"></div>

            <div class="fl w-90 relative mb3" style="height:10em">
                <div class="v-top fr w-100 br4 h4 absolute bg-dark-gray ba b--orange left-2 orange shadow-1">
                    <div class="fl w-50 pa2 f3 tl pl3"> <span class="f7">₦</span>{{humanNumber((record.Balance.toFixed(2) * record.Token.Price).toFixed(2))}} </div>
                    <div class="fl w-50 pt3 f7 tr pr3">Cash</div>
                </div>

                <div class="fl w-100 br4 h4 v-mid absolute white ba b--gray shadow-1" :style="{'top':'2.5em', 'background': 'url('+splashscreen+')','background-repeat': 'no-repeat', 'background-size': 'cover',}">
                    <div class="fl w-75 pa2 f3">
                        <div class="fl w-100 tl pl1"> {{humanNumber(record.Balance.toFixed(3))}} </div>
                        <div class="fl w-100 f7 tl pt2 pl1"> <span class="f7 fw6 br2 pa1 bg-near-black white">{{record.Token.Symbol}}</span> Balance </div>
                    </div>
                    <div class="fl w-25 pt3 f7 tr pr3">Crypto</div>
                    <div class="w-100 tr fr pt4 pr3">
                        <router-link class="link pointer f8 avenir br2 pa1 bg-black white tracked" :to="{name:'marketplace-buy',params:{id:record.TokenID}}">BUY TOKEN</router-link> 
                    </div>
                </div>
            </div>
        </div>

        <div class="fl w-100 overflow-y-scroll scrollbar" style="height:calc(100% - 225px)">
            <div class="fl tl w-100 inline-flex items-center ph3"> 
                <img class="w2 fl" @error="transaction.Token.Icon = tokenIcon" :src="transaction.Token.Icon"/>
                <div class="fl w-100 pl2">
                    <span class="w-100 fl tl f5"> {{transaction.Amount}} <span class="f8 bg-near-black pa1 br1 white">{{transaction.Token.Symbol}}</span> <small class=""> - {{transaction.Title}} </small> </span>
                    <span class="w-100 fl tl f8 inline-flex items-center"> 
                        <span class="w-100 fl">  Hash: {{transaction.Reference.substring(0, 10)}}...........{{transaction.Reference.substring(transaction.Reference.length-10,transaction.Reference.length)}} </span>
                        <span class="fr inline-flex items-center">
                            <span class="center f8 bg-orange br1 white pa1" :class="transaction.WFClass"> {{transaction.Workflow}} </span>
                            <i class="pl1 fas f5 center" :class="transaction.Class"></i> 
                        </span>
                    </span>    
                    <span class="w-100 fl tl f7">  ₦{{humanNumber((transaction.Amount.toFixed(3) * transaction.Token.Price).toFixed(2))}} <span class="f8"> @ {{dateTimeConvert(transaction.Createdate)}} </span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {HTTP} from "@/common"
    import {dateTimeConvert} from "@/common"
    import {humanNumber} from "@/common"
    import {checkRedirect} from "@/common"
    import notify from "@/components/generics/notify"
    import tokenIcon from "@/assets/img/smartcontract.svg"

    import splashscreen from "@/assets/img/splashscreen.png";

    export default {
        data() {return{
            url: "/api/transactions", 
            record: {Balance:0.00,Token:{Symbol:""}}, 
            transaction: {}, notifications:[], isFound: false, splashscreen,
            search: {text: "", field: "Title", limit: 50, page:1, skip: 0, filter:{FromAddress:"",ToAddress:""}},
            recordList:[], searchInterval:{}, searchLimit: {max:30,cur:0},
        }},
        beforeDestroy() {
            clearInterval(this.searchInterval)
        },
        components: {
            notify, 
        },
        watch: {
            '$route.params.id': function (id) {
                this.getRecord()
            }
        },
        created () { 
            // this.searchRecords()
            this.getRecord()
            var profile = JSON.parse(window.localStorage.getItem('profile'));
            this.searchTokens.filter.WalletID = profile.WalletID.toString()
        },
        methods: {
            humanNumber,
            dateTimeConvert,
            getRecord() {
                var id = this.$route.params.id
                const app = this;
                HTTP.get(app.url+'?id='+id, {withCredentials: true}).then((response) => {
                    app.transaction = response.data.Body
                    app.notifications.push(response.data)
                    setTimeout(checkRedirect(response.data),1500)

                    var tokenSearch = {text: "", field: "Title", limit: 50, page:1, skip: 0, filter:{TokenID:app.transaction.TokenID.toString(),AccountID:app.transaction.AccountID.toString()}}
                    HTTP.post('/api/accounttokens/search', tokenSearch, {withCredentials: true}).then((tokenResponse) => {
                        if (tokenResponse.data.Body != null && tokenResponse.data.Body != undefined){
                            if (tokenResponse.data.Body.length > 0){
                                app.record = tokenResponse.data.Body[0]
                            }
                        }
                        app.notifications.push(tokenResponse.data)
                        setTimeout(checkRedirect(tokenResponse.data),1500)
                    }).catch((e) => { console.log(e) })

                    
                }).catch((e) => { console.log(e) })
            },
        },
    }
</script>
