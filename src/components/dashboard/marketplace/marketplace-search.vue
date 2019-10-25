<template>
    <div class="w-100 fl pt2" style="">

        <div class="fl w-100 inline-flex items-center pv2 ph3">
            <input type="text" v-model="search.text" placeholder="Search  by token name or symbol" class=" ba b--white-10 bg-near-white fw3 f6 tracked i fl near-black pa2 w-100" @keyup="searchRecords">
        </div>

        <div class="fl w-100 bg-white near-black" style="">

            <div class="fl w-100 f8 ph3"> 
                <div class="fl tl w-10 pv2"></div>
                <div class="fl tl w-30 pv2">NAME</div>
                <div class="fl tl w-30 pv2">TOKEN PRICE (₦)</div>
                <div class="fl tl w-30 pv2">MARKET CAP (₦)</div>
            </div>
            <div class="f7 overflow-y-scroll scrollbar w-100 fl" style="height:calc(100% - 29px)"> 
                <router-link class="bt b--near-white fl w-100 ph3 near-black" v-for="(record, index) in recordList" :key="index" :to="{name:'marketplace-view',params:{id:record.ID}}">
                    <div class="fl tl w-10 h3 inline-flex items-center ph1"> 
                        <img class="w3" @error="record.Icon = tokenIcon" :src="record.Icon" />
                    </div>
                    <div class="fl tl w-30 h3 inline-flex items-center ph1"> 
                        <div class="w-100 fl">
                            {{record.Symbol}} <small class="db w-100 fl silver">{{record.Name}}</small>
                        </div>
                    </div>
                    <div class="fl tl w-30 h3 inline-flex items-center ph1"> {{humanNumber(record.Price)}} </div>
                    <div class="fl tl w-30 h3 inline-flex items-center ph1">{{humanNumber(record.ProjectCost)}}</div>
                </router-link>
            </div>

            <div class="fixed center w-100 mw6_mod tr cf left-0 right-0 inline-flex items-center"  style="bottom:6em">
                <router-link class="absolute right-1 tc bg-black pa1 h3 w3 link white br-100 pointer" :to="{name:'marketplace-new'}" > 
                    <i class=" fal fa-coins white f3 pt2"></i>
                    <div class="w-100 fl tc f7 ">Tokenize</div>
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
            
            url: "/api/tokens", 
            search: {text: "", field: "Title", limit: 50, page:1, skip: 0, filter:{}},
            recordList:[],
            tokenIcon
        }},
        components: {},
        created() {
            this.searchRecords()
        },
        methods: {
            humanNumber,
            defaultIcon(){
                return "@/assets/img/smartcontract.svg"
            },
            searchRecords(){
                const app = this 
                app.recordList = []
                app.search.skip = app.search.page-1;
                app.search.filter.mobile = app.search.text;

                HTTP.post(app.url+'/search', app.search,{withCredentials: true}).then((response) => {
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        app.recordList = response.data.Body
                    }
                    setTimeout(function(){ checkRedirect(response.data) },500)
                }).catch((e) => { console.log(e) })
            }
        }
    }
</script>
