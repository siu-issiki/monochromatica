<template>
  <div> logout </div>
</template>

<script>
  import Cookie from 'js-cookie'

  export default {
    layout: 'admin',
    mounted: function () {
      this.$store.commit('adminLogout')
      Cookie.set('auth', '')
      this.$router.push('/admin/')
    }
  }
</script>
