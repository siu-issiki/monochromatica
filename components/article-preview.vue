<template>
  <article class="box">
    <nuxt-link :to="{ name: 'blog-slug', params: { slug: post.fields.slug }}" class="title">
      <div :id="post.title" >
      <img class="thumbnail" v-if="'heroImage' in this.post.fields"
        :src="post.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
        :srcset="`${post.fields.heroImage.fields.file.url}?w=350&h=196&fit=fill 350w, ${post.fields.heroImage.fields.file.url}?w=1000&h=562&fit=fill 1000w, ${post.fields.heroImage.fields.file.url}?w=2000&h=1125&fit=fill 2000w`"
        sizes="(min-width: 1024px) 400px, 100vw"
      ></div>
      <h4>{{ post.fields.title }}</h4>
      <p class="tiny date">{{ ( new Date(post.fields.publishDate)).toDateString() }}</p>
    </nuxt-link>
    <p>{{ post.fields.description }}</p>

    <div class="tags">
      <nuxt-link
        v-for="tag in post.fields.tags"
        :key="tag"
        :to="{ name: 'tags-tag', params: { tag: tag }}" class="tag">{{ tag }}</nuxt-link>
    </div>
  </article>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style scoped>
  .date {
    padding-top: 10px;
    padding-bottom: 15px;
  }

  h4 {
    padding-top: 10px;
  }
</style>

