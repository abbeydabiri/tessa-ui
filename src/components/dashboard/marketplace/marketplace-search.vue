<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 inline-flex items-center pv2 ph3">
            <input type="text" v-model="search.text" placeholder="Search Token Name or" class=" ba b--white-10 bg-white fw3 f6 tracked i fl white pa2 w-100 br2 br--left" @keyup="searchRecords">
            <router-link class="link white bg-black-40 br2 br--right f6 inline-flex items-center pa2 pointer" :to="{name:'marketplace-new'}" style="height:34px"> 
                <i class="pr1 fal fa-coins white fl "></i> 
                Tokenize
            </router-link>
        </div>

        <div class="fl w-100 bg-white near-black" style="height:calc(100% - 50px)">

            <div class="fl w-100 bg-near-white f8 ph3"> 
                <div class="fl tl w-10 pv2"></div>
                <div class="fl tl w-40 pv2">Name</div>
                <div class="fl tl w-20 pv2">Price (NGN)</div>
                <div class="fl tl w-30 pv2">Market Cap (NGN)</div>
            </div>
            <div class="f7 overflow-y-scroll scrollbar w-100 fl" style="height:calc(100% - 29px)"> 
                <router-link class="bt b--near-white fl w-100 ph3 near-black" v-for="(token, index) in recordList" :key="index" :to="{name:'marketplace-view',params:{id:token.ID}}">
                    <div class="fl tl w-10 h3 inline-flex items-center ph1"> 
                        <img class="w3" :src="token.Image"/>
                    </div>
                    <div class="fl tl w-40 h3 inline-flex items-center ph1"> 
                        <div class="w-100 fl">
                            {{token.Symbol}} <small class="db w-100 fl silver">{{token.Name}}</small>
                        </div>
                    </div>
                    <div class="fl tl w-20 h3 inline-flex items-center ph1"> {{humanNumber(token.Price)}} </div>
                    <div class="fl tl w-30 h3 inline-flex items-center ph1">{{humanNumber(token.totalSupply)}}</div>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {humanNumber} from "@/common"
    import {checkRedirect} from "@/common"

    export default {
        data() {return{
            url: "/api/tokens", 
            search: {text: "", field: "Fullname", limit: 50, page:1, skip: 0, filter:{}},
            recordList:[
                { 
                    ID: 1, Symbol:"BKPT",Name:"Tessa",Price:100,totalSupply:10000,
                    Image:"https://storage.googleapis.com/bancor-prod-file-store/images/communities/aea83e97-13a3-4fe7-b682-b2a82299cdf2.png",
                },
                {
                    ID: 2, Symbol:"LCC",Name:"Lekki Tolls",Price:120,totalSupply:10000,
                    Image:"https://storage.googleapis.com/bancor-prod-file-store/images/communities/aea83e97-13a3-4fe7-b682-b2a82299cdf2.png",
                },
                {
                    ID: 3, Symbol:"EKO",Name:"Eko Atlantic",Price:301,totalSupply:10000,
                    Image: "https://files.bancor.network/0.1/images/communities?imageName=Aragon.png&imageWidth=400",
                },
                {
                    ID: 4, Symbol:"DAN",Name:"Dangote Refinery",Price:100,totalSupply:10000,
                    Image: "https://files.bancor.network/0.1/images/communities?imageName=Flixxo.png&imageWidth=400", 
                },
                { 
                    ID: 5, Symbol:"TOMA",Name:"Tomato Jos",Price:230,totalSupply:10000,
                    Image:"https://storage.googleapis.com/bancor-prod-file-store/images/communities/aea83e97-13a3-4fe7-b682-b2a82299cdf2.png",
                },
                {
                    ID: 6, Symbol:"KOBO",Name:"Kobo360",Price:2000,totalSupply:10000,
                    Image:"https://files.bancor.network/0.1/images/communities?imageName=194daba0-2606-11e8-891a-85ca6815b23e.png", 
                },
                {
                    ID: 7, Symbol:"NGN",Name:"Naira",Price:2000,totalSupply:10000,
                    Image:"https://files.bancor.network/0.1/images/communities?imageName=194daba0-2606-11e8-891a-85ca6815b23e.png", 
                },
                {
                    ID: 8, Symbol:"BTC",Name:"Bitcoin",Price:20000,totalSupply:10000,
                    Image:"https://storage.googleapis.com/bancor-prod-file-store/images/communities/aea83e97-13a3-4fe7-b682-b2a82299cdf2.png",
                },
                {
                    ID: 9, Symbol:"ETH",Name:"Ethereum",Price:2000,totalSupply:10000,
                    Image: "https://files.bancor.network/0.1/images/communities?imageName=Aragon.png&imageWidth=400",
                },
                {
                    ID: 10, Symbol:"LTC",Name:"Lite Coin",Price:2000,totalSupply:10000,
                    Image: "https://files.bancor.network/0.1/images/communities?imageName=Flixxo.png&imageWidth=400", 
                },
            ],
        }},
        components: {},
        created() {
            // this.searchRecords()
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
