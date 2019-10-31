<template>
    <div class="w-100 fl h-100 relative" style="">

        <div class="fl w-100" style="height:calc(100%)">

            <div class="fl w-100 near-black ph2">
                <div class="fl w-100 tl mt3 pt3 bt b--black">
                    <span class="near-black b" > 
                        CREATE TOKEN
                    </span>

                    <router-link class="fr link near-black br2 center f6 inline-flex items-center pv2 pointer" :to="{name:'marketplace-search'}"> 
                        <i class="pr1 fas fa-arrow-left black fl "></i>
                    </router-link>
                </div>
            </div>
            
            <div class="fl w-100 pv2 ph2 near-black tl" >
                <div class=" cf w-100 center relative">
                    <notify :notifications="notifications" />
                </div>

                <div class="fl w-60 ph2">
                    <div class="fl tl w-auto h3 inline-flex items-center pr1"> 
                        <img :src="record.Icon" @error="record.Icon = tokenIcon" class="w3" @click="uploadImage('Icon')" />
                        <input type="file" class="dn f7" @change="uploadImageDisplay('Icon')" ref="Icon" />
                    </div>
                    <div class="fl tl w-auto h3 inline-flex items-center ph1"> 
                        <div class="w-100 fl fw6">
                            {{record.Symbol}} <small class="db w-100 fl silver f8">{{record.Title}}</small>
                        </div>
                    </div>
                    <div class="db w-100 fl f8 pt1 tl i">click to upload</div>
                </div>
                <div class="fl w-40">
                    <div class="fl tl w-100 db ph1 pb1">
                        <div class="db w-100 f8 fl silver">Token Supply</div> 
                        <div class="db w-100 f5 fw6 fl near-black">{{humanNumber(record.MaxTotalSupply)}}</div>
                    </div>
                    <div class="fl tl w-100 db ph1 pt1">
                        <div class="db w-100 f8 fl silver">Tokens Issued</div>
                        <div class="db w-100 f6 fw6 fl near-black">{{humanNumber(record.TotalSupply)}}</div>
                    </div>
                </div>

                <div class="pv2 ph1 fl w-60 f6">
                    <small class="tl fl w-100 pv1"> Company Name: </small>
                    <input type="text" v-model="record.Company" placeholder="" class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>
                <div class="pv2 ph1 fl w-40 f6">
                    <small class="tl fl w-100 pv1"> Company RC: </small>
                    <input type="text" v-model="record.RC" placeholder="" class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>

                <div class="pv2 ph1 fl w-60 f6">
                    <small class="tl fl w-100 pv1"> Token Name: </small>
                    <input type="text" v-model="record.Title" placeholder="" class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>
                <div class="pv2 ph1 fl w-40 f6">
                    <small class="tl fl w-100 pv1"> Token Symbol: </small>
                    <input type="text" v-model="record.Symbol" placeholder="" maxlength="4" class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>
                
                
                <div class="pv2 ph1 fl w-60 f6">
                    <small class="tl fl w-100 pv1"> Project Type: </small>
                    <input type="text" v-model="record.Project" placeholder="" class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>
                <div class="pv2 ph1 fl w-40 f6">
                    <small class="tl fl w-100 pv1"> Project Cost:  <small>(NGN)</small>: </small>
                    <input type="number" pattern="\d*" v-model.number="record.ProjectCost" placeholder="" @keyup="calcMaxTotalSupply" class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>

                <div class="pv2 ph1 fl w-60 f6">
                    <small class="tl fl w-100 pv1"> Your Deposit <small>(NGN)</small>: </small>
                    <input type="number" pattern="\d*" v-model.number="record.Deposit" placeholder=""  class="pa2 ba b--orange bg-white fw3 f6 fl near-black pa2 w-100">
                </div>
                <div class="pv2 ph1 fl w-40 f6">
                    <small class="tl fl w-100 pv1"> Cost per Token <small>(NGN)</small>: </small>
                    <input type="number" pattern="\d*" v-model.number="record.Price" placeholder="" @keyup="calcMaxTotalSupply"  class="pa2 ba b--orange bg-white fw3 f6  fl near-black pa2 w-100">
                </div>


                <div class="pv2 ph1 fl w-100 f6">
                    <small class="tl fl w-100 pv1"> Company Description: </small>
                    <textarea rows="3" v-model="record.Description" class="pa2 ba b--orange bg-white fw3 f6  fl near-black pa2 w-100"></textarea>
                </div>

                
                
                <div class="pv2 fl w-100 f6 ph1">
                    <span v-if="isSave" class="fr link white bg-black br2 center f6 inline-flex items-center pa2 pointer" @click="save">
                        <i class="pr1 fas fa-coins white fl "></i> Create Token
                    </span>
                    <span v-else class="fr link black bg-light-gray br2 center f6 inline-flex items-center pa2 pointer"> 
                        <i class=" fas fa-spinner fa-pulse black fl "></i> &nbsp; Creating
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
    import tokenIcon from "@/assets/img/smartcontract.svg"


    export default {
        data() {return{
            url: "/api/tokens", 
            notifications:[],
            buy: {Fiat:"",Token:"", Address:""},
            record:{
                Icon:"", Symbol:"-", Title:"-", ProjectCost:0, Deposit:0, Price:0, MaxTotalSupply:0, TotalSupply:0, Seed:0, Image:tokenIcon, 
            }, 
            isSave: true,
            tokenIcon
        }},
        components: {
            notify
        },
        created (){
            var profile = JSON.parse(window.localStorage.getItem('profile'));
            if (window.localStorage.getItem('profile') !== null) {
                this.buy.Address =  profile.Address
            }
            
        },
        methods: {
            humanNumber,
            calcMaxTotalSupply(){
                if (this.record.ProjectCost > 0 && this.record.Price > 0){
                    this.record.MaxTotalSupply = parseInt((this.record.ProjectCost / this.record.Price).toFixed(0))
                }

                if (this.record.Deposit > 0 && this.record.Price > 0){
                    this.record.TotalSupply = parseInt((this.record.Deposit / this.record.Price).toFixed(0))
                }

                if (this.record.Deposit < 1 || this.record.Price < 1){
                    this.record.TotalSupply = 0;
                    this.record.MaxTotalSupply = 0;
                }

                // if (this.record.MaxTotalSupply > 0 && this.record.ProjectCost > 0){
                //     this.record.Price = this.record.ProjectCost / this.record.MaxTotalSupply
                // }
            },
            uploadImageDisplay(field) {
                displayImage(event, this, field)
            },
            uploadImage(imageRef) {
                this.$refs[imageRef].click()
            },
            save() {
                const app = this;
                if (!app.isSave){
                    return
                }
                app.isSave = false;
                app.record.Seed = app.record.TotalSupply
                HTTP.post(app.url, app.record, {withCredentials: true})
                .then((response) => {
                    app.notifications.push(response.data)
                    app.$parent.$parent.notifications.push(response.data)

                    setTimeout(function(){ checkRedirect(response.data) },500)
                    if (response.data.Body !== null && response.data.Body !== undefined ) {
                        if(response.data.Code == 200){
                            app.record = {Symbol:"-", Title:"-", ProjectCost:0, Deposit:0, Price:0, MaxTotalSupply:0, Icon:tokenIcon,  }
                        }
                    }
                    app.isSave = true;
                }).catch((e) => {
                    console.log(e);
                    app.isSave = true;
                })
            },
        },
    }
</script>
