<template>
  <div> logout </div>
</template>

<script>
  export default {
    layout: 'admin',
    mounted: function () {
      this.$store.commit('adminLogout')
      this.$router.push('/admin/')
    }
  }
</script>
