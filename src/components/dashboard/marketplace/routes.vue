<template>
    <router-view></router-view>
</template>

<script type="text/javascript">
    import marketplaceNew from "@/components/dashboard/marketplace/marketplace-new"
    import marketplaceView from "@/components/dashboard/marketplace/marketplace-view"
    
    import marketplaceBuy from "@/components/dashboard/marketplace/marketplace-buy"
    import marketplaceEdit from "@/components/dashboard/marketplace/marketplace-edit"
    import marketplaceSearch from "@/components/dashboard/marketplace/marketplace-search"

    export default {
        created () { this.$parent.headertitle = "MARKETPLACE" },
        children: [
            { path: '', component: marketplaceSearch, name:"marketplace-search"},
            { path: 'new', component: marketplaceNew, name:"marketplace-new"},
            { path: ':id', component: marketplaceView, name:"marketplace-view"},
            { path: ':id/buy', component: marketplaceBuy, name:"marketplace-buy"},
            { path: ':id/edit', component: marketplaceEdit, name:"marketplace-edit"},
        ],
    }
</script>
