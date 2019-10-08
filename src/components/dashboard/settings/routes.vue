<template>
  <router-view></router-view>
</template>

<script type="text/javascript">
    import settingsSearch from "@/components/dashboard/settings/settings-search"
    import settingsTokens from "@/components/dashboard/settings/settings-tokens"
    import settingsProfile from "@/components/dashboard/settings/settings-profile"

    export default {
        created () { this.$parent.headertitle = "MY ACCOUNT" },
        children: [
            { path: '', component: settingsSearch, name:"settings-search"},
            { path: 'profile', component: settingsTokens, name:"settings-profile"},
            { path: 'tokens', component: settingsProfile, name:"settings-tokens"},
        ],
    }
</script>
