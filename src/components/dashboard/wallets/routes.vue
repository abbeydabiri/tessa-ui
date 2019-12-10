<template>
    <router-view></router-view>
</template>

<script type="text/javascript">
    import walletsSearch from "@/components/dashboard/wallets/wallets-search"
    import walletsView from "@/components/dashboard/wallets/wallets-view"
    import walletsRequest from "@/components/dashboard/wallets/wallets-request"
    import walletsSend from "@/components/dashboard/wallets/wallets-send"

    export default {
        created () { this.$parent.headertitle = "WALLET" },
        children: [
            { path: '', component: walletsSearch, name:"wallets-search"},
            { path: ':id', component: walletsView, name:"wallets-view"},
            { path: ':id/send', component: walletsSend, name:"wallets-send"},
            { path: ':id/request', component: walletsRequest, name:"wallets-request"},
        ],
    }
</script>
