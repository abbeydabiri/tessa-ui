<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 inline-flex items-center pv2 ph3">
            <input type="text" v-model="search.text" placeholder="Search Tokens" class=" ba b--white-10 bg-near-white fw3 f6 tracked i fl near-black pa2 w-100 br2" @keyup="searchRecords">
        </div>

        <div class=" fl w-100 overflow-y-scroll scrollbar" style="height:calc(100% - 50px)">
            <router-link class="bb b--near-white fl w-100 ph3 pv2 near-black" v-for="(record, index) in recordList" :key="index" :to="{name:'wallets-view',params:{id:record.ID}}">
                <div class="fl tl w-10 inline-flex items-center ph1" style="height:3.5em"> 
                    <img class="w2" @error="record.Token.Icon = tokenIcon" :src="record.Token.Icon"/>
                </div>
                <div class="fl tl w-40 ph1 inline-flex items-center f7" style="height:3.5em">
                    <span class="dt w-100 fl f8 f7-ns">
                            {{record.Token.Company}}
                    </span>
                </div>
                <div class="fl tr w-50 ph1 " style="height:3.5em">
                    <span class="fl w-100 f4 tr">{{humanNumber(record.Balance.toFixed(3))}} <span class="fw6 f7 bg-near-black br2 pa1 white">{{record.Token.Symbol}}</span></span>
                    <span class="fl w-100 f7 tr pt1"><span class="f8">₦</span> {{humanNumber((record.Balance.toFixed(3) * record.Token.Price).toFixed(2))}}</span>
                </div>
            </router-link>
            <router-link class="bb b--near-white fl w-100 ph3 pv2 near-black" v-for="(record, index) in recordList" :key="index" :to="{name:'wallets-view',params:{id:record.ID}}">
                <div class="fl tl w-10 inline-flex items-center ph1" style="height:3.5em"> 
                    <img class="w2" @error="record.Token.Icon = tokenIcon" :src="record.Token.Icon"/>
                </div>
                <div class="fl tl w-40 ph1 inline-flex items-center f7" style="height:3.5em">
                    <span class="dt w-100 fl f8 f7-ns">
                            {{record.Token.Company}}
                    </span>
                </div>
                <div class="fl tr w-50 ph1 " style="height:3.5em">
                    <span class="fl w-100 f4 tr">{{humanNumber(record.Balance.toFixed(3))}} <span class="fw6 f7 bg-near-black br2 pa1 white">{{record.Token.Symbol}}</span></span>
                    <span class="fl w-100 f7 tr pt1"><span class="f8">₦</span> {{humanNumber((record.Balance.toFixed(3) * record.Token.Price).toFixed(2))}}</span>
                </div>
            </router-link>
        </div>
        

    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {humanNumber} from "@/common"
    import {checkRedirect} from "@/common"
    import tokenIcon from "@/assets/img/smartcontract.svg"

    export default {
        data() {return{
            url: "/api/accounttokens", 
            search: {text: "", field: "Title", limit: 50, page:1, skip: 0, filter:{WalletID:"0"}},
            recordList:[],
            tokenIcon
        }},
        components: {},
        created() {
            this.searchRecords()
            var profile = JSON.parse(window.localStorage.getItem('profile'));
            this.search.filter.WalletID = profile.WalletID.toString()
        },
        methods: {
            humanNumber,
            searchRecords(){
                const app = this 
                app.recordList = []
                app.search.skip = app.search.page-1;
                app.search.filter.mobile = app.search.text;

                HTTP.post(app.url+'/search', app.search,{withCredentials: true}).then((response) => {
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        app.recordList = response.data.Body
                        console.log(app.recordList)
                    }
                    setTimeout(function(){ checkRedirect(response.data) },500)
                }).catch((e) => { console.log(e) })
            }
        }
    }
</script>
