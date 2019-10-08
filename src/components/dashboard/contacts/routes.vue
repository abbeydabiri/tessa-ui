<template>
    <router-view></router-view>
</template>

<script type="text/javascript">
    import contactsNew from "@/components/dashboard/contacts/contacts-new"
    import contactsView from "@/components/dashboard/contacts/contacts-view"
    import contactsEdit from "@/components/dashboard/contacts/contacts-edit"
    import contactsSearch from "@/components/dashboard/contacts/contacts-search"

    export default {
        created () { this.$parent.headertitle = "CONTACTS" },
        children: [
            { path: '', component: contactsSearch, name:"contacts-search"},
            { path: 'new', component: contactsNew, name:"contacts-new"},
            { path: ':id', component: contactsView, name:"contacts-view"},
            { path: ':id/edit', component: contactsEdit, name:"contacts-edit"},
        ],
    }
</script>
