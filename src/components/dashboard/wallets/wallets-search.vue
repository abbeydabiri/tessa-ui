<template>
    <div class="w-100 fl pt2" style="">

        <div class="fl w-100 inline-flex items-center pv2 ph3">
            <input type="text" v-model="search.text" placeholder="Search  by token name or symbol" class=" ba b--white-10 bg-near-white fw3 f6 tracked i fl near-black pa2 w-100" @keyup="searchRecords">
        </div>

        <div class="fl w-100 bg-white near-black  bt b--near-white " style="">

            <div class="f7 overflow-y-scroll scrollbar bg-red w-100 fl" style="height:calc(100vh - 360px)"> 
                <router-link class="bb b--near-white fl w-100 ph3 pv1 near-black" v-for="(record, index) in recordList" :key="index" :to="{name:'wallets-view',params:{id:record.ID}}">
                    <div class="fl tl w-20 h3 inline-flex items-center ph1"> 
                        <img class="w3" @error="record.Token.Icon = tokenIcon" :src="record.Token.Icon"/>
                    </div>
                    <div class="fl tr w-80 h3  ph1">
                        <span class="fl w-100 f2 tr">{{humanNumber(record.Balance)}}  <span class="fw6 f5">{{record.Token.Symbol}}</span></span>
                        <span class="fl w-100 f8 itr"><span class="f7">₦</span> {{humanNumber(record.Balance * record.Token.Price)}}</span>
                    </div>
                </router-link>
            </div>
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
            search: {text: "", field: "Title", limit: 50, page:1, skip: 0, filter:{WalletID:0}},
            recordList:[],
            tokenIcon
        }},
        components: {},
        created() {
            this.searchRecords()
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
