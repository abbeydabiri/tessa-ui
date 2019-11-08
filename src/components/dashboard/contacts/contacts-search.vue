<template>
    <div class="w-100 fl pt2" style="">

        <div class="fl w-100 inline-flex items-center pv2 ph3">
            <input type="text" v-model="search.text" placeholder="Search Contacts" class=" ba b--white-10 bg-near-white fw3 f6 tracked i fl near-black pa2 w-100 br2" @keyup="searchRecords">
        </div>

        <div class="fl w-100 overflow-y-scroll scrollbar" style="height:calc(100% - 56px)">
            <router-link class="f6 fl w-100 link near-black fl bt b--white-10 pa3 f5 hover-bg-light-gray pointer" v-for="(contact, index) in recordList" :key="index" :to="{name:'contacts-view',params:{id:contact.ID}}"> 
                <span class="w-60 fl tl"> {{contact.Fullname}} </span>
                <span class="w-40 fl tr"> {{contact.Mobile}} </span>

                <div class="w-100 fl tl"> 
                    <small class="w-60 fl tl"> {{contact.Address}} </small>
                    <small class="w-40 fl tr"> {{contact.Email}} </small>
                </div>
                
            </router-link>
        </div>
        
        <div class="absolute center w-100 mw6_mod tr cf left-0 right-0 inline-flex items-center"  style="bottom:6em">
            <router-link class="absolute right-1 tc bg-black pa1 h3 w3 link white br-100 pointer" :to="{name:'contacts-new'}" > 
                <i class=" fal fa-address-book white f3 pt2"></i>
                <div class="w-100 fl tc f8 ">New Contact</div>
            </router-link>
        </div>
        
    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {checkRedirect} from "@/common"

    export default {
        data() {return{
            url: "/api/contacts", 
            search: {text: "", field: "Fullname", limit: 50, page:1, skip: 0, filter:{}},
            recordList:[],
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
