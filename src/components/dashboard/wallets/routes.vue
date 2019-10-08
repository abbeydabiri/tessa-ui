<template>
    <router-view></router-view>
</template>

<script type="text/javascript">
    import walletsSearch from "@/components/dashboard/wallets/wallets-search"
    import walletsDetails from "@/components/dashboard/wallets/wallets-details"
    import walletsRequest from "@/components/dashboard/wallets/wallets-request"
    import walletsSend from "@/components/dashboard/wallets/wallets-send"

    export default {
        created () { this.$parent.headertitle = "WALLET" },
        children: [
            { path: '', component: walletsSearch, name:"wallets-search"},
            { path: ':id', component: walletsDetails, name:"wallets-details"},
            { path: 'send/:id', component: walletsSend, name:"wallets-send"},
            { path: 'request/:id', component: walletsRequest, name:"wallets-request"},
        ],
    }
</script>
