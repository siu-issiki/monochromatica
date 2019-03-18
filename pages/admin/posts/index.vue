<template>
  <div>
    <nuxt-link to="/admin/posts/new" class="navbar-item is-size-4">new</nuxt-link>

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
  import ArticlePreview from '~/components/articlePreviewAdmin.vue'

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
    layout: 'admin',
    components: {
      ArticlePreview
    }
  }
</script>
