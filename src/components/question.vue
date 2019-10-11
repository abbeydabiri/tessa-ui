<template>
    <section class="h-100 bg-white">
        <div class="w-100 min-h-25 fl">
            <img src="@/assets/img/logo.png" class="db center h2" />
        </div>

        <article class="pa4 black-80">
            <form action="sign-up_submit" method="get" accept-charset="utf-8">
                <p>Create Three Security Questions</p>
                <div class="mt3">
                    <label class="db fw4 f7 lh-copy f6 tl pb3">QUESTION ONE</label>
                    <input type="text" class="pa3 input-reset ba b--black bg-transparent w-100 black bw2">
                </div>
                <div class="mt3">
                    <label class="db fw4 f7 lh-copy f6 tl pb3">QUESTION TWO</label>
                    <input type="text" class="pa3 input-reset ba b--black bg-transparent w-100 black bw2">
                </div>
                <div class="mt3">
                    <label class="db fw4 f7 lh-copy f6 tl pb3">QUESTION THREE</label>
                    <input type="text" class="pa3 input-reset ba b--black bg-transparent w-100 black bw2">
                </div>
                <div class="bg-light-gray pa1 dib br-button mt4 w-100">
                    <div class="bg-black pa2 pv3 center br-button fw6 tracked white"> CREATE QUESTIONS </div>
                </div>
            </form>
        </article>
    </section>
</template>