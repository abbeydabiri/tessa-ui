<template>
    <div class="bg-light-gray pa1 dib br-button-small">
        <div class="bg-black pv1 ph2 center f7 br-button-small fw6 tracked white"> 
            <i class="pr1 fas white fl " :class="icon"></i> 
            <small>{{title}}</small>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        props: ['title','icon'],
        methods: {},
    }
</script>

<style media="screen">
    .br-button-small {
        border-radius: 0.5rem; 
        border-top-left-radius: 0;
        border-bottom-right-radius: 0;
    }
</style>
