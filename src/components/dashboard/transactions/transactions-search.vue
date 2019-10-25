<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 inline-flex items-center pv2 ph3">
            <input type="text" v-model="search.text" placeholder="Search Transactions" class=" ba b--white-10 bg-near-white fw3 f6 tracked i fl near-black pa2 w-100 br2" @keyup="searchRecords">
        </div>

        <div class="fl w-100 overflow-y-scroll scrollbar" style="height:calc(100% - 50px)">
            <router-link class="f6 fl w-100 link near-black fl bb b--near-white pv2 f5 pointer" v-for="(record, index) in recordList" :key="index" to="{name:'transactions-view',params:{id:record.ID}}">
                <div class="fl w-100 ph3">
                    <div class="fl w-10 tc">
                        <span class="inline-flex items-center v-mid h2">
                            <i class="fas f2" :class="record.Class"></i>
                        </span> 
                    </div>

                    <div class="fl w-90 h2 ph2">
                        <span class="w-100 fl tl"> <small class="fw6">₦{{record.Amount}} </small> {{record.Narration}} </span>
                        <span class="w-100 fl tl f8"> 9/25/2019 at 10:53 </span>    
                    </div>
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
            recordList:[
                {ID:0, Class:"fa-arrow-alt-square-right orange", Narration:"sent to Abbey", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-right orange", Narration:"sent to Fibi", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-left green", Narration:"received from Temi", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-right orange", Narration:"sent to Temi", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-left green", Narration:"received from Kemi", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-left green", Narration:"received from Ada", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-right orange", Narration:"sent to 08079623414", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-right orange", Narration:"sent to 08079723123", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-left green", Narration:"received from Ifeanyi", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-right orange", Narration:"sent to Davina", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-right orange", Narration:"sent to Ogo", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-left green", Narration:"recieved from Femi", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-right orange", Narration:"sent to Bayo", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-left green", Narration:"received from Damola", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-left green", Narration:"received from Nsikan", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-right orange", Narration:"sent to Dili", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-right orange", Narration:"sent to Aishat", Symbol:"JJC", Amount:"0000"},
                {ID:0, Class:"fa-arrow-alt-square-left green", Narration:"received from Folake", Symbol:"JJC", Amount:"0000"},
            ],
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
