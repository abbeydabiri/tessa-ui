<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 near-black ph3">
            <div class="w-100 tl h2 pv3 bt b--black inline-flex items-center">
                <div class="fl w-80 relative f6">
                    <div class="w-100 fl f7 inline-flex items-center pointer" @click="dropdownTokens">
                        <i class="fl pr1 fas fa-caret-down black f3"></i> {{record.Token.Title}} by {{record.Token.Company}} 
                    </div>

                    <ul class="z-999 bg-near-black absolute w-100 pa0 br3 br--bottom mt0 list overflow-auto" style="max-height:9em;top:1.5em">
                        <router-link class="f8 w-100 fl link no-underline pa2 white bt b--white-10" :to="{name:'wallets-view',params:{id:token.ID}}" v-for="(token, index) in tokenList" :key="index">
                            <span class=" fw6 br2 pa1 bg-orange white">{{token.Token.Symbol}}</span> - {{token.Token.Title}} by {{token.Token.Company}} 
                        </router-link>
                    </ul>
                </div>


                <router-link class="fl w-20 link near-black br2 tr f6 pointer" :to="{name:'wallets-search'}"> 
                    <i class="pr1 fas fa-arrow-left black "></i>
                </router-link>
            </div>
        </div>

        <div class="fl w-100 overflow-hidden" style="height:calc(100% - 50px)">

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
            
            <div class="ph3 fl w-100 mt2">
                <div class="pv2 fl w-50 b tl f5"> Transactions 
                    <!-- <i class="fr pl1 fas fa-cloud-download-alt black pointer" @click="backup"></i> -->
                </div>
                <router-link class="link pointer no-underline" :to="{name:'transactions-search'}">
                    <div class="pv2 fl w-50 fw6 tr f7 near-black"> SEE ALL </div>
                </router-link>
            </div>

            <div class="fl w-100 near-black overflow-y-scroll scrollbar tl" style="height:calc(50vh - 66px)">
                <span class="f6 fl w-100 link near-black fl bb b--near-white pv2 f5 pointer" :class="{'bg-near-white ': index%2==1}" v-for="(transaction, index) in recordList" :key="index" to="{name:'transactions-details',params:{id:transaction.ID}}">

                    <div class="fl tl ph1"> 
                        <div class="fl tl inline-flex items-center ph1 " >
                            <img class="w2 fl" @error="transaction.Token.Icon = tokenIcon" :src="transaction.Token.Icon"/>

                            <div class="w-auto pl2 fl ph1 " >
                                <span class="w-100 fl  dt f8 f7-ns"> {{transaction.Title}} </span>
                                <span class="w-100 fl  dt f8 gray"> #{{index+1}} {{dateTimeConvert(transaction.Createdate)}} 

                                    <span class="ml3 dn dib-ns">
                                        <a class="link pointer no-underline center f8 bg-orange br1 white pa1" target="_blank" :href="'https://rinkeby.etherscan.io/tx/'+transaction.Reference" :class="transaction.WFClass"> {{transaction.Workflow}} </a>
                                    </span>

                                    <span class="dn-ns w-100 fl pv2">
                                        <a class="link pointer no-underline center f8 bg-orange br1 white pa1" target="_blank" :href="'https://rinkeby.etherscan.io/tx/'+transaction.Reference" :class="transaction.WFClass"> {{transaction.Workflow}} </a>
                                    </span>
                                    
                                </span>
                            </div>

                            <div class="fl tr ph1" >
                                <span class="fl w-100 f6 f5-ns tr">{{humanNumber(transaction.Amount.toFixed(3))}} <span class="fw6 f8 f6-ns bg-near-black br2 pa1 white">{{transaction.Token.Symbol}}</span></span>
                                <span class="fl w-100 f7 tr pt1"><span class="f8">₦</span> {{humanNumber((transaction.Amount.toFixed(3) * transaction.Token.Price).toFixed(2))}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="fl tl w-100 inline-flex items-center ph3 dn "> 
                        <img class="w2 fl" @error="transaction.Token.Icon = tokenIcon" :src="transaction.Token.Icon"/>
                        <div class="fl w-100 pl2">
                            <span class="w-100 fl tl f5"> {{transaction.Amount}} <span class="f8 bg-near-black pa1 br1 white">{{transaction.Token.Symbol}}</span> <small class=""> - {{transaction.Title}} </small> </span>
                            <span class="w-100 fl tl f8 inline-flex items-center"> 
                                <span class="w-100 fl">  Hash: {{transaction.Reference.substring(0, 10)}}...........{{transaction.Reference.substring(transaction.Reference.length-10,transaction.Reference.length)}} </span>
                                <span class="fr inline-flex items-center">
                                    <a class="link pointer no-underline center f8 bg-orange br1 white pa1" target="_blank" :href="'https://rinkeby.etherscan.io/tx/'+transaction.Reference" :class="transaction.WFClass"> {{transaction.Workflow}} </a>
                                    <i class="pl1 fas f5 center" :class="transaction.Class"></i> 
                                </span>
                            </span>    
                            <span class="w-100 fl tl f7">  ₦{{humanNumber((transaction.Amount.toFixed(3) * transaction.Token.Price).toFixed(2))}} <span class="f8"> @ {{dateTimeConvert(transaction.Createdate)}} </span></span>
                        </div>
                    </div>
                </span>
            </div>

        </div>
    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {dateTimeConvert} from "@/common"
    import {humanNumber} from "@/common"
    import {checkRedirect} from "@/common"
    import notify from "@/components/generics/notify"
    import tokenIcon from "@/assets/img/smartcontract.svg"

    import splashscreen from "@/assets/img/splashscreen.png";

    export default {
        data() {return{
            url: "/api/accounttokens", 
            record: {Balance:0.00,Token:{Symbol:""}}, notifications:[],
            isFound: false, splashscreen, tokenIcon,
            search: {text: "", field: "Title", limit: 50, page:1, skip: 0, filter:{FromAddress:"",ToAddress:""}},
            searchTokens: {text: "", field: "Title", limit: 50, page:1, skip: 0, filter:{WalletID:"0"}},
            recordList:[], tokenList:[], searchInterval:{}, searchLimit: {max:10,cur:0},
        }},
        beforeDestroy() {
            clearInterval(this.searchInterval)
        },
        components: {
            notify, 
        },
        watch: {
            '$route.params.id': function (id) {
                this.tokenList = [];
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
            dateTimeConvert,
            humanNumber,
            backup() {
                const app = this;
                var profile = JSON.parse(window.localStorage.getItem('profile'));
                HTTP.get('/api/wallets/backup?id='+profile.WalletID, {withCredentials: true}).then((response) => {
                    app.record = response.data.Body
                    app.notifications.push(response.data)
                    setTimeout(checkRedirect(response.data),1500)
                    console.log(app.record)
                    
                }).catch((e) => { console.log(e) })
            },
            dropdownTokens(){
                const app = this 
                if (app.tokenList.length > 0) {
                    app.tokenList = []
                    return
                }
                app.tokenList = []
                app.searchTokens.skip = app.searchTokens.page-1;
                app.searchTokens.filter.mobile = app.searchTokens.text;

                HTTP.post('/api/accounttokens/search', app.searchTokens,{withCredentials: true}).then((response) => {
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        app.tokenList = response.data.Body
                    }
                    setTimeout(function(){ checkRedirect(response.data) },500)
                }).catch((e) => { console.log(e) })
            },
            getRecord () {
                var id = this.$route.params.id
                const app = this;
                HTTP.get(app.url+'?id='+id, {withCredentials: true}).then((response) => {
                    app.record = response.data.Body
                    app.notifications.push(response.data)
                    setTimeout(checkRedirect(response.data),1500)

                    if(response.data.Body.ID == id){
                        app.isFound = true
                        if (response.data.Body.Token !== null && response.data.Body.Token !== undefined) {    
                            if (response.data.Body.Token.ID !== null && response.data.Body.Token.ID !== undefined) {    
                                app.search.filter.TokenID = response.data.Body.Token.ID.toString()
                                app.searchRecords();
                                app.searchInterval = setInterval(app.getRecord, 30000 * app.searchLimit.cur);
                                app.searchLimit.cur++
                                if (app.searchLimit.cur < app.searchLimit.max) {
                                    clearInterval(app.searchInterval)
                                }
                            }
                        }
                    }
                    
                }).catch((e) => { console.log(e) })
            },
            searchRecords(){
                const app = this;
                // app.recordList = []
                
                var profile = JSON.parse(window.localStorage.getItem('profile'));
                app.search.skip = app.search.page-1;
                app.search.filter.ToAddress = profile.Address;
                app.search.filter.FromAddress = profile.Address;
                
                HTTP.post('/api/transactions/search', app.search,{withCredentials: true}).then((response) => {
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        app.recordList = response.data.Body
                        for (var key = 0; key < app.recordList.length; key++) {

                            var transactionArrow = ""
                            if(app.recordList[key].ToAddress == app.search.filter.ToAddress) {
                                transactionArrow = "fa-arrow-alt-down"
                            }

                            if(app.recordList[key].FromAddress == app.search.filter.FromAddress) {
                                transactionArrow = "fa-arrow-alt-up"
                            }

                            switch(app.recordList[key].Workflow)  {
                                case 'fail':
                                    app.recordList[key]["Class"] = transactionArrow+" near-black"
                                    app.recordList[key]["WFClass"] = "bg-red"
                                    break;

                                case 'pending':
                                    app.recordList[key]["Class"] = transactionArrow+" near-black"
                                    app.recordList[key]["WFClass"] = "bg-orange"
                                    break;

                                case 'success':
                                    app.recordList[key]["Class"] = transactionArrow+" near-black"
                                    app.recordList[key]["WFClass"] = "bg-dark-green"
                                    break;

                                default:
                                    app.recordList[key]["Class"] = transactionArrow+" near-black"
                                    app.recordList[key]["WFClass"] = "bg-near-black"
                                    break;

                            }
                        }
                    }
                    setTimeout(function(){ checkRedirect(response.data) },500)
                }).catch((e) => { console.log(e) })
            }
        }
    }
</script>
