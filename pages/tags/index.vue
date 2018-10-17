<template>
  <div>
    <header class="tag-page header">
      <div class="foreground">
        <Navigation></Navigation>
        <div class="page-info wrapper">
          <h2>Tag</h2>
        </div>
      </div>
    </header>

    <section class="body-container">
      <div class="container is-fluid">
        <div class="columns is-multiline" :key="tag.title" v-for="tag in tags.items">
          <ul class="column is-4">
            <li>
              <nuxt-link
                :key="tag"
                :to="{ name: 'tags-tag', params: { tag: tag.fields.title }}"
                class="tag is-light is-rounded"
              >
                {{ tag.fields.title }}
              </nuxt-link>
            </li>
          </ul>
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
  async asyncData ({ env, params }) {
    const tags = await client.getEntries({
      'content_type': 'tag'
    })
    return {
      tags: tags
    }
  },
  components: {
    ArticlePreview,
    Navigation
  }
}
</script>

<style>
 .container {
   padding-bottom: 1em;
 }
</style>
