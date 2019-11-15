<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 near-black ph3">
            <div class="w-100 tl h2 pt3 pb2 bt b--black inline-flex items-center">
                <img class="w2" @error="record.Token.Icon = tokenIcon" :src="record.Token.Icon"/>

                <router-link class="fr w-100 link near-black br2 tr f6 pointer" :to="{name:'wallets-search'}"> 
                    <i class="pr1 fas fa-arrow-left black "></i>
                </router-link>
            </div>
        </div>

        <div class="ph3 fl w-100 dt overflow-y-scroll scrollbar" style="height:calc(100% - 48px)">

            <div class="fl w-100 ph3 near-black bg-white">
                <div class="fl w-100"></div>

                <div class="fl w-90 ph3 relative mb3" style="height:10em">
                    <div class="v-top fr w-100 br4 h4 absolute bg-dark-gray ba b--orange left-2 orange shadow-1" :style="{'xbackground': 'url('+splashscreen+')','background-repeat': 'no-repeat', 'background-size': 'cover',}">
                        <div class="fl w-50 pa2 f3 tl pl3"> {{humanNumber(record.Balance.toFixed(3))}}<small>{{record.Token.Symbol}}</small> </div>
                        <div class="fl w-50 pt3 f7 tr pr3">Crypto</div>
                    </div>

                    <div class="fl w-100 br4 h4 v-mid absolute white ba b--gray shadow-1" :style="{'top':'2.5em', 'background': 'url('+splashscreen+')','background-repeat': 'no-repeat', 'background-size': 'cover',}">
                        <div class="fl w-50 pa2 f3">
                            <div class="fl w-100 tl pl2"><span class="f7">₦</span>{{humanNumber(record.Balance.toFixed(3) * record.Token.Price)}} </div>
                            <div class="fl w-100 f7 tl pl3">Balance</div>
                        </div>
                        <div class="fl w-50 pt3 f7 tr pr3">Cash</div>
                    </div>
                </div>
            </div>
            
            <div class="fl w-100 mt2 ph3">
                <div class="pv2 fl w-50 b tl f5"> Transactions </div>
                <div class="pv2 fl w-50 fw6 tr f7"> SEE ALL </div>
            </div>

            <div class="fl w-100  near-black bg-white overflow-y-scroll scrollbar tl" style="height:calc(100% - 250px)">
                <router-link class="f6 fl w-100 link near-black fl bb b--near-white pv2 f5 pointer" v-for="(transaction, index) in recordList" :key="index" to="{name:'transactions-view',params:{id:transaction.ID}}">
                    <div class="fl w-100 ph3">
                        <div class="fl w-10 tc">
                            <span class="inline-flex items-center v-mid h2">
                                <i class="fas f2 fa-arrow-alt-square-right green"></i>
                            </span> 
                        </div>

                        <div class="fl w-90 h2 ph2">
                            <span class="w-100 fl tl"> <small class="fw6">₦{{transaction.Amount}} </small> {{transaction.Title}} </span>
                            <span class="w-100 fl tl f8"> {{humanTime(transaction.Createdate)}} </span>    
                        </div>
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
            ]
        }},
        components: {
            notify, 
        },
        created () { 
            this.searchRecords()
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
                    }
                    
                }).catch((e) => { console.log(e) })

               
            },
            searchRecords(){
                const app = this;
                app.recordList = []
                
                var profile = JSON.parse(window.localStorage.getItem('profile'));
           
                app.search.skip = app.search.page-1;
                app.search.filter.ToAddress = profile.Address;
                // app.search.filter.FromAddress = profile.Address;  
                
                console.log(app.search)
                HTTP.post('/api/transactions/search', app.search,{withCredentials: true}).then((response) => {
                    
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        app.recordList = response.data.Body
                    }
                    setTimeout(function(){ checkRedirect(response.data) },500)
                }).catch((e) => { console.log(e) })
            }
        }
    }
</script>
