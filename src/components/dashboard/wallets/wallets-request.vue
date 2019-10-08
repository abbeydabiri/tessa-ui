<template>
    <div class="center w6 tc tracked f4 ph3 pv2">

        <div class="cf w-100">
            <p class="f4 fl w-100 tl">
                WALLETS REQUEST
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
            isSave: true,
        }},
        components: {
            notify
        },
        created () {  },
        methods: {
            save () {
                const app = this;
                app.isSave = false;
                HTTP.post(app.url, app.record, {withCredentials: true})
                .then((response) => {
                    this.notifications.push(response.data)
                    setTimeout(checkRedirect(response.data),1500)

                    // app.isSave = true;

                }).catch((e) => {
                    console.log(e)
                })
            },
        }
    }
</script>
