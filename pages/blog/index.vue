<template>
  <div>
    <header class="blog header">
      <div class="foreground">
        <Navigation></Navigation>
        <div class="page-info wrapper">
          <h2>Blog</h2>
        </div>
      </div>
    </header>

    <section class="body-container">
      <div class="items-bar wrapper">
        <h2>All articles ({{ posts.length }})</h2>
      </div>
      <div class="container is-fluid">
        <div class="columns is-multiline">
          <div class="column is-4" :key="post.title" v-for="post in posts">
            <article-preview :post="post"></article-preview>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
import Navigation from '~/components/navigation.vue'
import ArticlePreview from '~/components/article-preview.vue'

const client = createClient()

export default {
  asyncData ({ env, params }) {
    return client.getEntries({
      'content_type': env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate'
    }).then(entries => {
      return {
        posts: entries.items
      }
    })
  },
  components: {
    ArticlePreview,
    Navigation
  }
}
</script>

<style>
 .container {
   padding-bottom: 3em;
 }
</style>
