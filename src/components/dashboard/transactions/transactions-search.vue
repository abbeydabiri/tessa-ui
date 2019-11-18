<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 inline-flex items-center pv2 ph3">
            <input type="text" v-model="search.text" placeholder="Search Transactions" class=" ba b--white-10 bg-near-white fw3 f6 tracked i fl near-black pa2 w-100 br2" @keyup="searchRecords">
        </div>

        <div class="fl w-100 overflow-y-scroll scrollbar" style="height:calc(100% - 50px)">
            <span class="f6 fl w-100 link near-black fl bb b--near-white pv2 f5 pointer" v-for="(transaction, index) in recordList" :key="index" to="{name:'transactions-view',params:{id:record.ID}}">
                <div class="fl w-100 ph3">

                    <div class="fl tr w-15 h2 inline-flex items-center ph1"> 
                        <span class="inline-flex items-center v-mid h2">
                            <i class="fas f4" :class="transaction.Class"></i>
                        </span> 
                        <img class="w2" @error="transaction.Token.Icon = tokenIcon" :src="transaction.Token.Icon"/>
                    </div>

                    <div class="fl w-80 h2 ph2">
                        <span class="w-100 fl tl"> ₦{{transaction.Amount}} <small class=""> {{transaction.Title}} </small> </span>
                        <span class="w-100 fl tl f8"> {{humanTime(transaction.Createdate.substring(0,19))}} </span>
                    </div>

                </div>
            </span>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {humanTime} from "@/common"
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
            humanTime,
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
                            if(app.recordList[key].ToAddress == app.search.filter.ToAddress) {
                                app.recordList[key]["Class"] = "fa-arrow-alt-down green"
                            }

                            if(app.recordList[key].FromAddress == app.search.filter.FromAddress) {
                                app.recordList[key]["Class"] = "fa-arrow-alt-up red"
                            }
                        }
                    }
                    setTimeout(function(){ checkRedirect(response.data) },500)
                }).catch((e) => { console.log(e) })
            }
        }
    }
</script>
