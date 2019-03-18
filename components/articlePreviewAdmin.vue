<template>
  <article class="box">
    <nuxt-link :to="{ 
      name: 'admin-posts-edit',
      params: { edit: post.fields.slug },
      query: { id: post.sys.id }}" class="title">
      <div :id="post.title" >
      <img class="thumbnail" v-if="'heroImage' in post.fields"
        :src="post.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
        :srcset="`${post.fields.heroImage.fields.file.url}?w=350&h=196&fit=fill 350w, ${post.fields.heroImage.fields.file.url}?w=1000&h=562&fit=fill 1000w, ${post.fields.heroImage.fields.file.url}?w=2000&h=1125&fit=fill 2000w`"
        sizes="(min-width: 1024px) 400px, 100vw"
      ></div>
      <h4>{{ post.fields.title }}</h4>
      <p class="tiny date">{{ ( new Date(post.fields.publishDate)).toDateString() }}</p>
    </nuxt-link>
    <p class="description">{{ post.fields.description }}</p>

    <div class="tags">
      <nuxt-link
        v-for="tag in post.fields.tags"
        :key="tag.fields.title"
        :to="{ name: 'tags-tag', params: { tag: tag.fields.title }}" class="tag is-light is-rounded">{{ tag.fields.title }}</nuxt-link>
    </div>
  </article>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style scoped>
  .thumbnail{
    padding-bottom: 10px;
  }

  .date {
    padding-top: 10px;
    padding-bottom: 15px;
  }

  .description {
    padding-bottom: 10px;
  }
</style>

