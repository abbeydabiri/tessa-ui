<template>
<section>
</section>
</template>

<script>
import seedphrase from '@/components/generics/seedphrase'
export default {
	data () {
		return {
			infoList: [{
                    icon: wallet,
                    text: "Wallet",
                    subtext: "Control your assets, Control your future",
                    button:"Next"
                },
			]
		}
	},
	components: {
		seedphrase
	}
}
</script>