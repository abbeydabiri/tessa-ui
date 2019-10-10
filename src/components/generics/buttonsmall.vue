<template>
    <div class="bg-light-gray pa1 dib br-button-small">
        <div class="bg-black pv1 ph2 center f8 br-button-small fw6 tracked white"> {{title}} </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        props: ['title'],
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
