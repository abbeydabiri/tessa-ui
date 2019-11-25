<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 inline-flex items-center pv2 ph3">
            <input type="text" v-model="search.text" placeholder="Search Transactions" class=" ba b--white-10 bg-near-white fw3 f6 tracked i fl near-black pa2 w-100 br2" @keyup="searchRecords">
        </div>
        
        <div class=" fl w-100 overflow-y-scroll scrollbar" style="height:calc(100% - 50px)">
            <span class="f6 fl w-100 link near-black fl bb b--near-white pv2 f5 pointer" :class="{'bg-near-white ': index%2==1}" v-for="(transaction, index) in recordList" :key="index" to="{name:'transactions-details',params:{id:transaction.ID}}">
                
                <div class="fl tl w-100 inline-flex items-center ph3"> 
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
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {dateTimeConvert} from "@/common"
    import {humanNumber} from "@/common"
    import {checkRedirect} from "@/common"
    import tokenIcon from "@/assets/img/smartcontract.svg"

    export default {
        data() {return{
            url: "/api/transactions", 
            search: {text: "", field: "Title", limit: 50, page:1, skip: 0, filter:{ToAddress:"",FromAddress:""}},
            recordList:[],
            tokenIcon
        }},
        components: {},
        created() {this.searchRecords()},
        methods: {
            dateTimeConvert,
            humanNumber,
            searchRecords(){
                const app = this 
                app.recordList = []

                var profile = JSON.parse(window.localStorage.getItem('profile'));
                app.search.skip = app.search.page-1;
                app.search.filter.ToAddress = profile.Address;
                app.search.filter.FromAddress = profile.Address;

                HTTP.post(app.url+'/search', app.search,{withCredentials: true}).then((response) => {
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
