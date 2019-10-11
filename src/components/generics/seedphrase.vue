<template>
	<section class="w-100 absolute top-1 left-0 ">
        
	    <article class="dt w-100 vh-100">
			<div class="dtc v-mid tc black ph4">

                <div class="h-25">
                    <div v-if="text==''">
                        <div class="br-pill w4 h4 tc inline-flex items-center ba" :class="{'bg-near-white b--orange black':((position+1)%2)==0,'bg-black white':((position+1)%2!==0)}">
                            <div class="w-100 tc" v-if="icon!==''"> 
                                <i class="fas f2 tr white center" :class="icon"></i>
                            </div>
                            <div class="w-100 tc" v-else>{{seed}}</div>
                        </div>
                        
                        <div class="cf black f2 fw6 tc">{{details}}</div>
                    </div>
                    <p class="pt4" v-else>{{text}}</p>
                </div>
			</div>
		</article>
	</section>
</template>

<script>
export default {
	props: ['position','icon','seed','details','text'],
	methods: {
        
    }
}
</script>