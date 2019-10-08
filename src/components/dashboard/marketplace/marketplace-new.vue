<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100 bg-black-40" style="height:calc(100%)">

            <div class="fl w-100 ph3 pv3 near-black bg-white">
                <div class="fl w-70 ">
                    <div class="fl tl w-auto h3 inline-flex items-center pr1"> 
                        <img :src="record.Image" @error="record.Image = tokenIcon" class="w3" @click="uploadImage('tokenIcon')" />
                        <input type="file" class="dn f7" @change="uploadImageDisplay('Image')" ref="tokenIcon" />
                    </div>
                    <div class="fl tl w-auto h3 inline-flex items-center ph1"> 
                        <div class="w-100 fl fw6">
                            {{record.Symbol}} <small class="db w-100 fl silver f8">{{record.Title}}</small>
                        </div>
                    </div>
                    <div class="db w-100 fl f8 pt1 i">click to upload</div>
                </div>
                <div class="fl w-30">
                    <div class="fl tl w-100 db ph1 pb1">
                        <div class="db w-100 f8 fl silver">Price <small>(NGN)</small></div> 
                        <div class="db w-100 f5 fw6 fl near-black">{{humanNumber(record.Price)}}</div>
                    </div>
                    <div class="fl tl w-100 db ph1 pt1">
                        <div class="db w-100 f8 fl silver">Market Cap <small>(NGN)</small></div>
                        <div class="db w-100 f6 fw6 fl near-black">{{humanNumber(record.Deposit * record.Price)}}</div>
                    </div>
                </div>
            </div>
            
            <div class="fl w-100 pv2 ph2 near-white tl" >
                <div class=" cf w-100 center relative">
                    <notify :notifications="notifications" />
                </div>

                <div class="pv2 ph1 fl w-60 f6">
                    <small class="tl fl w-100 pv1"> Token Name: </small>
                    <input type="text" v-model="record.Title" placeholder="" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                </div>
                <div class="pv2 ph1 fl w-40 f6">
                    <small class="tl fl w-100 pv1"> Token Symbol: </small>
                    <input type="text" v-model="record.Symbol" placeholder="" maxlength="4" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                </div>

                <div class="pv2 ph1 fl w-60 f6">
                    <small class="tl fl w-100 pv1"> Company Name: </small>
                    <input type="text" v-model="record.Company" placeholder="" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                </div>
                <div class="pv2 ph1 fl w-40 f6">
                    <small class="tl fl w-100 pv1"> Company RC: </small>
                    <input type="text" v-model="record.CompanyRC" placeholder="" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                </div>
                
                <div class="pv2 ph1 fl w-60 f6">
                    <small class="tl fl w-100 pv1"> Project Type: </small>
                    <input type="text" v-model="record.Project" placeholder="" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                </div>
                <div class="pv2 ph1 fl w-40 f6">
                    <small class="tl fl w-100 pv1"> Project Cost:  <small>(NGN)</small>: </small>
                    <input type="text" v-model="record.Cost" placeholder="" @keyup="calcPrice" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                </div>

                <div class="pv2 ph1 fl w-60 f6">
                    <small class="tl fl w-100 pv1"> Total Token Supply: </small>
                    <input type="text" v-model="record.totalSupply" placeholder="" @keyup="calcPrice" class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                </div>
                <div class="pv2 ph1 fl w-40 f6">
                    <small class="tl fl w-100 pv1"> Your Deposit <small>(NGN)</small>: </small>
                    <input type="text" v-model="record.Deposit" placeholder=""  class="pa2 ba b--white-10 bg-white-10 fw3 f6  fl white pa2 w-100 br2">
                </div>

                
                
                <div class="pv2 fl w-100 f6 ph1">
                    <router-link class="link white bg-black-40 br2 f6 inline-flex items-center pa2 pointer" :to="{name:'marketplace-search'}"> 
                        <i class="pr1 fal fa-times white fl "></i> 
                        Cancel
                    </router-link>

                    <span class="fr link white bg-black-40 br2 center f6 inline-flex items-center pa2 pointer"> 
                        <i class="pr1 fas fa-coins white fl "></i> Tokenize
                    </span>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {humanNumber} from "@/common"
    import {checkRedirect} from "@/common"

    import {displayImage} from "@/common"

    import notify from "@/components/generics/notify"
    import tokenIcon from "@/assets/img/smartcontract.png"


    export default {
        data() {return{
            url: "/api/tokens", 
            notifications:[],
            buy: {Fiat:"",Token:"", Address:""},
            record:{
                Symbol:"-", Title:"-", Cost:0, Deposit:0, Price:0, totalSupply:0, Image:tokenIcon, 
            }, 
            isFound: false,
        }},
        components: {
            notify
        },
        created (){
            var profile = JSON.parse(window.localStorage.getItem('profile'));
            this.buy.Address =  profile.Address
        },
        methods: {
            humanNumber,
            calcPrice(){
                if (this.record.totalSupply > 0 && this.record.Cost > 0){
                    this.record.Price = this.record.Cost / this.record.totalSupply
                }
            },
            uploadImageDisplay(field) {
                displayImage(event, this, field)
            },
            uploadImage(imageRef) {
                this.$refs[imageRef].click()
            },
        },
    }
</script>
