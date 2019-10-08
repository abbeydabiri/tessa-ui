<template id="">
    <div class="cf w-100">
        <div class="" v-for="(pass, index) in seedphrases" :key="index" >
            <div class="w4 tl no-underline inline-flex items-center white relative mb2" :class="{fl: (index + 1) % 2 != 0, fr: (index + 1) % 2 == 0 }" >
                <span class="fl w-80 pa2 bg-black-60">{{pass}}</span>
                <span class="fr w-20 pa2 tc bg-black-10">{{index + 1}}</span>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
  export default {
    props: ['seedphrases']
  }
</script>
