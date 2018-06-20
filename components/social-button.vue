<template>
  <span class="social-icons">
    <a :href="'https://www.facebook.com/sharer/sharer.php?u='+link">
      <b-icon icon="facebook"></b-icon>
    </a>
    <a :href="'https://twitter.com/intent/tweet?url='+link+'&text='+title">
      <b-icon icon="twitter"></b-icon>
    </a>
  </span>
</template>


<script>
export default {
  props: ['title', 'link']
}
</script>

<style>

.social-icons {
  margin: 0;
  padding: 0;
}

.social-icons li {
  display: inline-block;
  margin-right: 1em;
}

.social-icons svg {
  display: block;
  max-width: 100%;
  fill: #000;
  width: 1.5em;
  height: 1.5em;
}

.social-icons svg:hover {
  fill: #2199e8;
}

</style>
