<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 inline-flex items-center pv2 ph3">
            <input type="text" v-model="search.text" placeholder="Search Transactions" class=" ba b--white-10 bg-near-white fw3 f6 tracked i fl near-black pa2 w-100 br2" @keyup="searchRecords">
        </div>

        <div class="fl w-100 overflow-y-scroll scrollbar" style="height:calc(100% - 50px)">
            <router-link class="f6 fl w-100 link near-black fl bt b--white-10 pa3 f5 hover-bg-light-gray pointer" v-for="(contact, index) in recordList" :key="index" :to="{name:'contacts-view',params:{id:contact.ID}}"> 
                <span class="w-60 fl tl"> {{contact.Fullname}} </span>
                <span class="w-40 fl tr"> {{contact.Mobile}} </span>

                <div class="w-100 fl tc"> 
                    <small class=""> {{contact.Address}} </small>
                </div>
                
            </router-link>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {checkRedirect} from "@/common"
    import tokenIcon from "@/assets/img/smartcontract.svg"

    export default {
        data() {return{
            url: "/api/transactions", 
            search: {text: "", field: "Fullname", limit: 50, page:1, skip: 0, filter:{}},
            recordList:[],
            tokenIcon
        }},
        components: {},
        created() {this.searchRecords()},
        methods: {
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
