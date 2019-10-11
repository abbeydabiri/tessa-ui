<template>
    <div class="dt center absolute w-100 right-0 left-0 center tc ph3 z-max">
        <p v-for="(alert, index) in notifications" :key="index" v-if="alert.Message!==''"  @click="close(index)" class="cf w-100 br1 pr2 f6 fw3 white tc" :class="{'bg-green':alert.Code==200,'bg-orange':(alert.Code!==200&&alert.Code!==500),'bg-orange':alert.Code==500}">
            <span class="fl w-100 pa1">{{ alert.Message }} </span>
        </p>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: ['notifications'],
        methods: {
            close(index) {
                this.$parent.$delete(this.$parent.notifications, index)
            },
        },
    }
</script>