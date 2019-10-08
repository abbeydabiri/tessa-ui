<template>
    <section class="vh-100 w-100 relative white w-100 cf center bg-black-10 mw8 " >
        <appheader :notifications="notifications" :title="headertitle"/>
        <router-view style="height:calc(100% - 120px)"></router-view>
        <appfooter/>
    </section>
</template>

<style>
    input, textarea { color:white;}

    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #CCCCCC;
        opacity: 1;
        /* Firefox */
    }

    :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #CCCCCC;
    }

    ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #CCCCCC;
    }
</style>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {checkRedirect} from "@/common"

    import appheader from "@/components/generics/header"
    import appfooter from "@/components/generics/footer"


    import walletsComponent from "@/components/dashboard/wallets/routes.vue"
    import contactsComponent from "@/components/dashboard/contacts/routes.vue"
    import settingsComponent from "@/components/dashboard/settings/routes.vue"
    import marketplaceComponent from "@/components/dashboard/marketplace/routes.vue"
    import transactionsComponent from "@/components/dashboard/transactions/routes.vue"

    import transactionsSearch from "@/components/dashboard/transactions/transactions-search"

    export default {
        children: [
            { path: 'wallets', component: walletsComponent, children:walletsComponent.children},
            { path: 'settings', component: settingsComponent, children:settingsComponent.children},
            { path: 'transactions', component: transactionsComponent, children:transactionsComponent.children},
            { path: 'contacts', component: contactsComponent, children:contactsComponent.children},
            { alias:'', path: 'marketplace', component: marketplaceComponent, children:marketplaceComponent.children},
        ],

        data() {return{
            headertitle:"",
            changeNetwork: false,
            notifications:[], ethNetworks: [],  
            ethNetwork: '', userId: '',
            url: {
                networkSearch: '/api/networks/search',
                dashboard: '/api/dashboard',
                wallet: '/api/wallets',
                search: {text: "", field: "Title", limit: 20, skip: 0},
            }
        }},
        components: {
            "appheader": appheader,
            "appfooter": appfooter,
        },
        computed: {
            defaultNetwork () {
                if (this.ethNetwork == undefined) {
                return 'Network'.substring(0,4)
                }
                return this.ethNetwork.substring(0,4)
            }
        },
        created () {
            // this.getNetworks()
            this.getDashboard()
        },
        methods: {
            getDashboard() {
                const app = this
                HTTP.get(app.url.dashboard,{withCredentials: true}).then((response) => {
                    checkRedirect(response.data)

                    if (response.data.Body === null) {
                        this.$router.push({path:"/signin"})
                    }

                    window.localStorage.setItem('profile', JSON.stringify(response.data.Body));
                    // app.getWalletList()
                    // this.getAddress()
                }).catch((e) => { console.log(e) })
            },
            getNetworks () {
                const app = this
                HTTP.post(this.url.networkSearch, app.url.search,{withCredentials: true}).then((response) => {
                    checkRedirect(response.data)
                    app.ethNetworks = response.data.Body

                    function sortPriority( a, b ) {
                        if ( a.Priority < b.Priority ){
                            return -1;
                        }
                        if ( a.Priority > b.Priority ){
                            return 1;
                        }
                        return 0;
                    }
                    app.ethNetworks.sort(sortPriority)
                    app.ethNetwork = app.ethNetworks[0].Name


                }).catch((e) => { console.log(e) })
            },
            selectNetwork (index) {
                this.ethNetwork = this.ethNetworks[index].Name
            },
            getAddress () {
                const app = this
                HTTP.get(app.url.dashboard,{withCredentials: true}).then((response) => {
                    // console.log(response.data)
                    checkRedirect(response.data)
                }).catch((e) => { console.log(e) })
            },
            getWalletList() {
                const app = this
                HTTP.post(app.url.wallet+'/search', {text: "", field: "Title", limit:100}, {withCredentials: true}).then((response) => {
                    console.log('wallet', response.data)
                    // checkRedirect(response.data)
                }).catch((e) => { console.log(e) })
            }
        }
    }
</script>
