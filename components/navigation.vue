<template>
  <nav class="navbar is-white" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item is-size-4">monochromatica</nuxt-link>
      <div class="navbar-burger" data-target="navMenu" v-bind:class="{'is-active':isActive}" v-on:click='isActive=!isActive'>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div><!-- navbar-brand END -->
    <div class="navbar-menu" id="navMenu" v-bind:class="{'is-active':isActive}">
      <div class="navbar-end">
        <nuxt-link to="/" class="navbar-item">Top</nuxt-link>
        <nuxt-link to="/blog" class="navbar-item">Blog</nuxt-link>
        <nuxt-link to="/tags" class="navbar-item">Tag</nuxt-link>
      </div>
    </div><!-- navbar-menu END -->
  </nav>
</template>

<script>
  export default{
    data () {
      return {
        isActive: false
      }
    }
  }
</script>
