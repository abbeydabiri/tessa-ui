<template>
    <div class="bg-light-gray pa1 dib br-button">
        <div class="bg-black pa2 pv3 center br-button fw6 tracked white"> {{title}} </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        props: ['title'],
        methods: {},
    }
</script>

<style media="screen">
    .br-button {
        min-width: 12rem; 
        border-radius: 1rem; 
        border-top-left-radius: 0;
        border-bottom-right-radius: 0;
    }
</style>
