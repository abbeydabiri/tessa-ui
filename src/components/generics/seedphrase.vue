<template>
	<article class="vh-50 mt4 dt w-100">
		<div class="dtc tc v-mid white ph3 ph4-l">
		    <img src="@/assets/img/oval.png">
		</div>
	    <article class="h-100 dt w-100 fixed right-0 top-1">
			<div class="dtc v-mid tc white">
				<div class="bg-black br-pill w4 h4 tc inline-flex items-center ">
				{{icon}}
				</div>

				<div class="bg-gray br-pill w4 h4 tc inline-flex items-center ">
				{{seed}}
				</div>

				<div class="black f2 fw8 pt3 tc">SUCCESS</div>
			</div>
		</article>
	</article>
</template>

<script>
export default {
	props: ['icon','seed','details','text'],
	methods: {}
}
</script>