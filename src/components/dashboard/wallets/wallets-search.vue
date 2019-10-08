<template>
    <div class="center w6 tc tracked f4 ph3 pv2">

        <div class="cf w-100">
            <p class="f4 fl w-100 tl">
                WALLETS SEARCH
            </p>
        </div>

    </div>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {checkRedirect} from "@/common"
    import notify from "@/components/generics/notify"

    export default {
        data() {return{
            url: "/api/contacts", 
            record: [], notifications:[],
            isFound: false,
        }},
        components: {
            notify
        },
        methods: {
            getRecord (id) {
                const app = this;
                HTTP.get(app.url+'?id='+id, {withCredentials: true}).then((response) => {
                app.record = response.data.Body
                app.notifications.push(response.data)
                setTimeout(checkRedirect(response.data),1500)

                if(response.data.Body.ID == id){
                    app.isFound = true
                }
                }).catch((e) => { console.log(e) })
            },
        }
    }
</script>
