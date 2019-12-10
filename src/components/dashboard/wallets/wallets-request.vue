<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 near-black ph3">
            <div class="w-100 tl h2 pv3 bt b--black inline-flex items-center">
                <div class="fl w-80 relative f6">
                    <div class="w-100 fl f7 inline-flex items-center pointer" @click="dropdownTokens">
                        <i class="fl pr1 fas fa-caret-down black f3"></i> {{record.Token.Title}} by {{record.Token.Company}} 
                    </div>

                    <ul class="z-999 bg-near-black absolute w-100 pa0 br3 br--bottom mt0 list overflow-auto" style="max-height:9em;top:1.5em">
                        <router-link class="f8 w-100 fl link no-underline pa2 white bt b--white-10" :to="{name:'wallets-request',params:{id:token.ID}}" v-for="(token, index) in tokenList" :key="index">
                            <span class=" fw6 br2 pa1 bg-orange white">{{token.Token.Symbol}}</span> - {{token.Token.Title}} by {{token.Token.Company}} 
                        </router-link>
                    </ul>
                </div>


                <router-link class="fl w-20 link near-black br2 tr f6 pointer" :to="{name:'wallets-search'}"> 
                    <i class="pr1 fas fa-arrow-left black "></i>
                </router-link>
            </div>
        </div>

        <div class="fl w-100 overflow-hidden" style="height:calc(100% - 50px)">

            <div class="ph3 fl w-100 ph1 near-black bg-white">
                <div class="fl w-100"></div>

                <div class="fl w-90 relative mb3" style="height:10em">
                    <div class="v-top fr w-100 br4 h4 absolute bg-dark-gray ba b--orange left-2 orange shadow-1">
                        <div class="fl w-50 pa2 f3 tl pl3"> <span class="f7">₦</span>{{humanNumber((record.Balance.toFixed(2) * record.Token.Price).toFixed(2))}} </div>
                        <div class="fl w-50 pt3 f7 tr pr3">Cash</div>
                    </div>

                    <div class="fl w-100 br4 h4 v-mid absolute white ba b--gray shadow-1" :style="{'top':'2.5em', 'background': 'url('+splashscreen+')','background-repeat': 'no-repeat', 'background-size': 'cover',}">
                        <div class="fl w-75 pa2 f3">
                            <div class="fl w-100 tl pl1"> {{humanNumber(record.Balance.toFixed(3))}} </div>
                            <div class="fl w-100 f7 tl pt2 pl1"> <span class="f7 fw6 br2 pa1 bg-near-black white">{{record.Token.Symbol}}</span> Balance </div>
                        </div>
                        <div class="fl w-25 pt3 f7 tr pr3">Crypto</div>
                        <div class="w-100 tr fr pt4 pr3">
                            <router-link class="link pointer f8 avenir br2 pa1 bg-black white tracked" :to="{name:'marketplace-buy',params:{id:record.TokenID}}">BUY</router-link> 
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div class="fl w-100 near-black overflow-y-scroll scrollbar tl" style="height:calc(50vh - 30px)">
              
                <div class="pv2 ph3 fl w-50 f6">
                    <small class="tl fl w-100 pv1"> NAIRA AMOUNT TO REQUEST: </small>
                    <input type="number" pattern="\d*" @keyup="calcToken" v-model.number="request.Fiat" placeholder="" class="pa2 ba b--orange bg-white-10 fw3 f6  fl near-black pa2 w-100 br2">
                </div>
                
                <div class="pv2 ph3 fl w-50 f6">
                    <small class="tl fl w-100 pv1"> TOKEN AMOUNT TO REQUEST: </small>
                    <input type="number" pattern="\d*" @keyup="calcFiat" v-model.number="request.Token" placeholder="" class="pa2 ba b--orange bg-white-10 fw3 f6  fl near-black pa2 w-100 br2">
                </div>

                
                <div class="ph3 fl w-100 f6">
                    <div class="w-100 cf br2 br--btm pv2" >
                        <div class="pa1 fl w-100 tc ">
                            <div class="inline-flex items-center">
                                <img class="h3-ns h2" @error="record.Token.Icon = tokenIcon" :src="record.Token.Icon"/>
                                <span class="pl2 f2-ns f3 ">{{humanNumber(request.Token+0)}} <small>{{record.Token.Symbol}}</small> </span>
                            </div>
                        </div>
                        <div class="">
                            <div class="pa1 fl w-50">
                                <small class="db fl">Contact Mobile</small>
                                <small class="red fr" @click="contactMobileList=[],contact.Fullname='',contact.Mobile='',contact.Address='',contact.ID=0">- clear</small>
                                <input class="mt1 pa2 ba b--orange bg-white fw3 f6  fl near-black pa2 w-100 br2" placeholder="" @keyup="searchContactMobileList" type="number" pattern="\d*" minlength="11" maxlength="11" v-model="contact.Mobile">
                                <div class="fl relative w-100">
                                    <small>
                                    <ul class="bg-near-black absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:6em">
                                        <li class="pa2 near-white bt b--near-white" @click="contact.ID = contactmobile.ID, contact.Fullname=contactmobile.Fullname, contact.Mobile=contactmobile.Mobile, contact.Address=contactmobile.Address, contactMobileList = []" v-for="(contactmobile, index) in contactMobileList" :key="index">
                                        <span class="f7">#{{index+1}}</span> {{contactmobile.Mobile}} <small class="f8">{{contactmobile.Fullname}}</small>
                                        </li>
                                    </ul>
                                    </small>
                                </div>
                            </div>

                            <div class="pa1 fl w-50">
                                <small class="db fl">Contact Name</small>
                                <small class="red fr" @click="contactNameList=[],contact.Fullname='',contact.Mobile='',contact.Address='',contact.ID=0">- clear</small>
                                <input class="mt1 pa2 ba b--orange bg-white fw3 f6  fl near-black pa2 w-100 br2" placeholder="" @keyup="searchContactNameList" type="text" v-model="contact.Fullname">
                                <div class="fl relative w-100">
                                    <small>
                                    <ul class="bg-near-black absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:6em">
                                        <li class="pa2 near-white bt b--near-white" @click="contact.ID = contactname.ID, contact.Fullname=contactname.Fullname, contact.Mobile=contactname.Mobile, contact.Address=contactname.Address, contactNameList = []" v-for="(contactname, index) in contactNameList" :key="index">
                                        <span class="f7">#{{index+1}}</span> {{contactname.Fullname}} <small class="f8">{{contactname.Mobile}}</small>
                                        </li>
                                    </ul>
                                    </small>
                                </div>
                            </div>

                            <div class="pa1 fl w-100 tc">
                                <small class="w-100 fl i">Wallet Address</small>
                                <small class="h1 fl w-100">{{contact.Address}}</small>
                            </div>
                        </div>
                    </div>

                    <div class="fl w-100 tc pt3">
                        <span v-if="isSave" class="center pv1 ph2 white bg-orange br1 f6 inline-flex items-center">
                            <span class="pr1">REQUEST</span>
                            <i class="fal fa-qrcode f5"></i>
                        </span>

                        <span v-else class="center pv1 ph2 white bg-gray br1 f6 inline-flex items-center">
                            <span class="pr1">REQUESTING</span>
                            <i class="fal fa-spinner fa-pulse f5"></i>
                        </span>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {dateTimeConvert} from "@/common"
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
            searchTokens: {text: "", field: "Title", limit: 50, page:1, skip: 0, filter:{WalletID:"0"}},
            recordList:[], tokenList:[], searchInterval:{}, searchLimit: {max:10,cur:0},
            request: {Fiat:0, Token:0, Address:""},
            isSave: true, 
            contactSearch: {text: "", field: "Fullname", limit: 50, page:1, skip: 0, filter:{}},
            contact:{ID:0, Fullname:"",Mobile:"",Address:""},
            contactMobileList:[], contactNameList:[],
        }},
        components: {
            notify,
        },
        watch: {
            '$route.params.id': function (id) {
                this.tokenList = [];
                this.getRecord()
            }
        },
        created () { 
            this.getRecord();
            var profile = JSON.parse(window.localStorage.getItem('profile'));
            this.searchTokens.filter.WalletID = profile.WalletID.toString()
         },
        methods: {
            dateTimeConvert,
            humanNumber,
            calcFiat(){
                if (this.record.Token.Price > 0){
                    if (this.request.Token > 0){
                        this.request.Fiat = parseFloat(this.request.Token * this.record.Token.Price).toFixed(2)
                    }
                }
            },
            calcToken(){
                if (this.record.Token.Price > 0){
                    if (this.request.Fiat > 0){
                        this.request.Token = parseFloat(this.request.Fiat / this.record.Token.Price).toFixed(2)
                    }
                }
            },
            dropdownTokens(){
                const app = this 
                if (app.tokenList.length > 0) {
                    app.tokenList = []
                    return
                }
                app.tokenList = []
                app.searchTokens.skip = app.searchTokens.page-1;
                app.searchTokens.filter.mobile = app.searchTokens.text;

                HTTP.post('/api/accounttokens/search', app.searchTokens,{withCredentials: true}).then((response) => {
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        app.tokenList = response.data.Body
                        if (app.$route.params.id == 0 || app.$route.params.id == undefined){
                            app.$router.push({name:"wallets-request",params:{id:app.tokenList[0].ID}}) 
                            // app.tokenList = [];
                            // app.record = app.tokenList[0]
                            // app.getRecord()
                        }
                    }
                    setTimeout(function(){ checkRedirect(response.data) },500)
                }).catch((e) => { console.log(e) })
            },
            getRecord() {
                const app = this;
                if (app.$route.params.id == 0 || app.$route.params.id == undefined){
                    app.dropdownTokens();
                    return
                }
                var id = app.$route.params.id
                HTTP.get(app.url+'?id='+id, {withCredentials: true}).then((response) => {
                    app.record = response.data.Body
                    app.notifications.push(response.data)
                    setTimeout(checkRedirect(response.data),1500)

                    if(response.data.Body.ID == id){
                        app.isFound = true
                        if (response.data.Body.Token !== null && response.data.Body.Token !== undefined) {    
                            if (response.data.Body.Token.ID !== null && response.data.Body.Token.ID !== undefined) {    
                                app.search.filter.TokenID = response.data.Body.Token.ID.toString()
                                // app.searchRecords();
                                app.searchInterval = setInterval(app.getRecord, 30000 * app.searchLimit.cur);
                                app.searchLimit.cur++
                                if (app.searchLimit.cur < app.searchLimit.max) {
                                    clearInterval(app.searchInterval)
                                }
                            }
                        }
                    }
                    
                }).catch((e) => { console.log(e) })
            },
            searchContactMobileList() {
                const app = this;
                app.contactSearch.field = "Mobile"
                app.contactSearch.text = app.contact.Mobile
                app.contactNameList = []
                app.searchContact("contactMobileList")
            },
            searchContactNameList() {
                const app = this;

                if( app.contact.Mobile.length == 11) {
                    return
                }
                app.contactMobileList = []
                app.contactSearch.field = "Fullname"
                app.contactSearch.text = app.contact.Fullname
                app.searchContact("contactNameList")
            },
            searchContact(fieldName) {
                const app = this;
                const url = "/api/contacts/search";
                HTTP.post(url, app.contactSearch,{withCredentials: true}).then((response) => {
                    app[fieldName] = response.data.Body
                }).catch((e) => { console.log(e) })
            },
        }
    }
</script>
