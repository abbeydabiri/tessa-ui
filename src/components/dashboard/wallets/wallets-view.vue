<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 near-black ph3">
            <div class="w-100 tl h2 pv3 bt b--black inline-flex items-center">
                <router-link class="fr w-100 link near-black br2 tr f6 pointer" :to="{name:'wallets-search'}"> 
                    <i class="pr1 fas fa-arrow-left black "></i>
                </router-link>
            </div>
        </div>

        <div class="ph3 fl w-100 overflow-y-scroll scrollbar" style="height:calc(100% - 40px)">

            <div class="fl w-100 ph1 near-black bg-white">
                <div class="fl w-100"></div>

                <div class="fl w-90 relative mb3" style="height:10em">
                    <div class="v-top fr w-100 br4 h4 absolute bg-dark-gray ba b--orange left-2 orange shadow-1">
                        <div class="fl w-50 pa2 f3 tl pl3"> <span class="f7">₦</span>{{humanNumber(record.Balance.toFixed(2) * record.Token.Price)}} </div>
                        <div class="fl w-50 pt3 f7 tr pr3">Cash</div>
                    </div>

                    <div class="fl w-100 br4 h4 v-mid absolute white ba b--gray shadow-1" :style="{'top':'2.5em', 'background': 'url('+splashscreen+')','background-repeat': 'no-repeat', 'background-size': 'cover',}">
                        <div class="fl w-75 pa2 f3">
                            <div class="fl w-100 tl pl1"> {{humanNumber(record.Balance.toFixed(3))}} </div>
                            <div class="fl w-100 f7 tl pt1 pl1"> <span class="f7">{{record.Token.Symbol}}</span> Balance </div>
                        </div>
                        <div class="fl w-25 pt3 f7 tr pr3">Crypto</div>
                    </div>
                </div>
            </div>
            
            <div class="fl w-100 mt2">
                <div class="pv2 fl w-50 b tl f5"> Transactions </div>
                <router-link class="link pointer no-underline" :to="{name:'transactions-search'}">
                    <div class="pv2 fl w-50 fw6 tr f7 near-black"> SEE ALL </div>
                </router-link>
            </div>

            <div class="fl w-100  near-black bg-white overflow-y-scroll scrollbar tl" style="height:calc(100% - 225px)">
                <router-link class="f6 fl w-100 link near-black fl bb b--near-white pv2 f5 pointer" v-for="(transaction, index) in recordList" :key="index" to="{name:'transactions-view',params:{id:transaction.ID}}">

                    <div class="fl tl w-100 inline-flex items-center"> 
                        <img class="w2 fl" @error="transaction.Token.Icon = tokenIcon" :src="transaction.Token.Icon"/>

                        <div class="fl w-100 ph2">
                            <span class="w-100 fl tl"> {{transaction.Amount}} <span class="f8">{{transaction.Token.Symbol}}</span> <small class=""> - {{transaction.Title}} </small> </span>
                            <span class="w-100 fl tl f8"> ₦{{humanNumber(transaction.Amount.toFixed(3) * transaction.Token.Price)}} @ {{humanTime(transaction.Createdate.substring(0,19))}} </span>    
                        </div>

                        <i class="fas f4 center" :class="transaction.Class"></i>                            
                    </div>

                </router-link>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {humanTime} from "@/common"
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
            recordList:[]
        }},
        components: {
            notify, 
        },
        created () { 
            // this.searchRecords()
            this.getRecord(this.$route.params.id)
         },
        methods: {
            humanTime,
            humanNumber,
            getRecord (id) {
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
                            }
                        }
                    }
                    
                }).catch((e) => { console.log(e) })
            },
            searchRecords(){
                const app = this;
                app.recordList = []
                
                var profile = JSON.parse(window.localStorage.getItem('profile'));
                app.search.skip = app.search.page-1;
                app.search.filter.ToAddress = profile.Address;
                app.search.filter.FromAddress = profile.Address;
                
                HTTP.post('/api/transactions/search', app.search,{withCredentials: true}).then((response) => {
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        app.recordList = response.data.Body
                        for (var key = 0; key < app.recordList.length; key++) {
                            if(app.recordList[key].ToAddress == app.search.filter.ToAddress) {
                                app.recordList[key]["Class"] = "fa-arrow-alt-down dark-green"
                            }

                            if(app.recordList[key].FromAddress == app.search.filter.FromAddress) {
                                app.recordList[key]["Class"] = "fa-arrow-alt-up dark-red"
                            }
                        }
                    }
                    setTimeout(function(){ checkRedirect(response.data) },500)
                }).catch((e) => { console.log(e) })
            }
        }
    }
</script>
