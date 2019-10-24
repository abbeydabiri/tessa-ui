<template>
    <section>
        <nav class="fixed center pv1 w-100 mw6 tc cf bottom-0 left-0 right-0 footer bg-footer inline-flex items-center">
            <router-link class="white f4 f3-l link dim dib w-third tc flex items-center tc" to="/dashboard/wallets/request">
                <i class="fal fa-qrcode"></i>
                <span class="f7 db">Request</span>
            </router-link>
            <router-link class="white f4 f3-l link dim dib w-third tc flex items-center" to="/dashboard/transactions">
                <i class="fas fa-exchange"></i>
                <span class="f7 db">Transactions</span> 
            </router-link>
            <router-link class="white f4 f3-l link dim dib w-third tc flex items-center" to="/dashboard/wallets/send">
                <i class="fal fa-paper-plane"></i>
                <span class="f7 db">Send</span>

            </router-link>
        </nav>
    </section>
</template>

<script type="text/javascript">
  module.exports = {
    name: "menuFooter"
  }
</script>
