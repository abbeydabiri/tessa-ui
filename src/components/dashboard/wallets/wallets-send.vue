<template>
    <div class="center w6 tc tracked f4 ph3 pv2">

        <div class="cf w-100">
            <p class="f4 fl w-100 tl">
                WALLETS SEND
            </p>
        </div>

    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {checkRedirect} from "@/common"

    export default {
        data() {return{
            url: "/api/contacts", 
            recordList: [],
            search: {text: "", field: "Fullname", limit: 50, page:1, skip: 0, filter:{}},
        }},
        components: {
            
        },
        created () {  },
        methods: {
            searchRecords(){

            }
        }
    }
</script>
