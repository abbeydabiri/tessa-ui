<template>
    <div class="w-100 fl pt2" style="">

        <div class="fl w-100 inline-flex items-center pv2 ph3">
            <input type="text" v-model="search.text" placeholder="Search  by token name or symbol" class=" ba b--white-10 bg-near-white fw3 f6 tracked i fl near-black pa2 w-100" @keyup="searchRecords">
        </div>

        <div class="fl w-100 bg-white near-black" style="">

            <div class="fl w-100 f8 ph3"> 
                <div class="fl tl w-20 pv2"></div>
                <div class="fl tl w-80 pv2"></div>
            </div>
            <div class="f7 overflow-y-scroll scrollbar w-100 fl" style="height:calc(100% - 29px)"> 
                <router-link class="bt b--near-white fl w-100 ph3 near-black" v-for="(record, index) in recordList" :key="index" :to="{name:'marketplace-view',params:{id:record.ID}}">
                    <div class="fl tl w-20 h3 inline-flex items-center ph1"> 
                        <img class="w3" @error="record.Icon = tokenIcon" :src="record.Icon"/>
                    </div>
                    <div class="fl tr w-80 h3 inline-flex items-center ph1">{{humanNumber(record.ProjectCost)}} {{record.Symbol}}</div>
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
            recordList:[
                // { 
                //     ID: 1, Symbol:"BKPT",Name:"Tessa",Price:100,totalSupply:10000,
                //     Icon:"https://storage.googleapis.com/bancor-prod-file-store/Icons/communities/aea83e97-13a3-4fe7-b682-b2a82299cdf2.png",
                // },
            ],
            recordListOLD:[
                { 
                    ID: 1, Symbol:"BKPT",Name:"Tessa",Price:100,totalSupply:10000,
                    Icon:"https://storage.googleapis.com/bancor-prod-file-store/Icons/communities/aea83e97-13a3-4fe7-b682-b2a82299cdf2.png",
                },
                {
                    ID: 2, Symbol:"LCC",Name:"Lekki Tolls",Price:120,totalSupply:10000,
                    Icon:"https://storage.googleapis.com/bancor-prod-file-store/Icons/communities/aea83e97-13a3-4fe7-b682-b2a82299cdf2.png",
                },
                {
                    ID: 3, Symbol:"EKO",Name:"Eko Atlantic",Price:301,totalSupply:10000,
                    Icon: "https://files.bancor.network/0.1/Icons/communities?IconName=Aragon.png&IconWidth=400",
                },
                {
                    ID: 4, Symbol:"DAN",Name:"Dangote Refinery",Price:100,totalSupply:10000,
                    Icon: "https://files.bancor.network/0.1/Icons/communities?IconName=Flixxo.png&IconWidth=400", 
                },
                { 
                    ID: 5, Symbol:"TOMA",Name:"Tomato Jos",Price:230,totalSupply:10000,
                    Icon:"https://storage.googleapis.com/bancor-prod-file-store/Icons/communities/aea83e97-13a3-4fe7-b682-b2a82299cdf2.png",
                },
                {
                    ID: 6, Symbol:"KOBO",Name:"Kobo360",Price:2000,totalSupply:10000,
                    Icon:"https://files.bancor.network/0.1/Icons/communities?IconName=194daba0-2606-11e8-891a-85ca6815b23e.png", 
                },
                {
                    ID: 7, Symbol:"NGN",Name:"Naira",Price:2000,totalSupply:10000,
                    Icon:"https://files.bancor.network/0.1/Icons/communities?IconName=194daba0-2606-11e8-891a-85ca6815b23e.png", 
                },
                {
                    ID: 8, Symbol:"BTC",Name:"Bitcoin",Price:20000,totalSupply:10000,
                    Icon:"https://storage.googleapis.com/bancor-prod-file-store/Icons/communities/aea83e97-13a3-4fe7-b682-b2a82299cdf2.png",
                },
                {
                    ID: 9, Symbol:"ETH",Name:"Ethereum",Price:2000,totalSupply:10000,
                    Icon: "https://files.bancor.network/0.1/Icons/communities?IconName=Aragon.png&IconWidth=400",
                },
                {
                    ID: 10, Symbol:"LTC",Name:"Lite Coin",Price:2000,totalSupply:10000,
                    Icon: "https://files.bancor.network/0.1/Icons/communities?IconName=Flixxo.png&IconWidth=400", 
                },
            ],
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
                    }
                    setTimeout(function(){ checkRedirect(response.data) },500)
                }).catch((e) => { console.log(e) })
            }
        }
    }
</script>
