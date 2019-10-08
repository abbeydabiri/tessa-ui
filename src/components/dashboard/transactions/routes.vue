<template>
  <router-view></router-view>
</template>

<script type="text/javascript">
    import transactionsSearch from "@/components/dashboard/transactions/transactions-search"
    import transactionsDetails from "@/components/dashboard/transactions/transactions-details"
    

    export default {
        created () { this.$parent.headertitle = "TRANSACTIONS" },
        children: [
            { path: '', component: transactionsSearch, name:"transactions-search"},
            { path: ':id', component: transactionsDetails, name:"transactions-details"},
        ],
    }
</script>
