<template>
	<section class="w-100 absolute top-1 left-0 ">
        
	    <article class="dt w-100 vh-100">
			<div class="dtc v-mid tc black">

                <div v-if="text==''">
                    <div class="br-pill w4 h4 tc inline-flex items-center ba" :class="{'bg-near-white b--orange black':((position+1)%2)==0,'bg-black white':((position+1)%2!==0)}">
                        
                        
                        <div class="w-100 tc" v-if="icon!==''"> 
                            <i class="fas f2 tr white center" :class="icon"></i>
                        </div>
                        <div v-else>{{seed}}</div>


                    </div>
                    <div class="black f2 fw8 pt3 tc">{{details}}</div>
                </div>
                <p v-else>{{text}}</p>
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