<template>
  <div>
    <header class="article header">
      <div class="foreground">
        <div class="page-bar wrapper">
          <Navigation></Navigation>
        </div>
      </div>
      <div>
        <img
          :src="currentPost.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
          :srcset="`${currentPost.fields.heroImage.fields.file.url}?w=350&h=87&fit=fill 350w, ${currentPost.fields.heroImage.fields.file.url}?w=1000&h=250&fit=fill 1000w, ${currentPost.fields.heroImage.fields.file.url}?w=2000&h=500&fit=fill 2000w`"
          size="100vw"
          :alt="currentPost.fields.heroImage.fields.description"
        >
      </div>
    </header>

    <section class="body-container">
      <main class="wrapper">
        <div class="headline">
          <time class="tiny">{{ ( new Date(currentPost.fields.publishDate)).toDateString() }}</time>
          <h1>{{ currentPost.fields.title }}</h1>
        </div>
        <div class="copy">
          <div v-html="tocHtml"></div>
          <vue-markdown :toc="true" toc-id="toc" v-on:toc-rendered="say">{{currentPost.fields.body}}</vue-markdown>
        </div>
      </main>
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <nuxt-link v-if="nextPost" class="pagination-previous" :to="'/blog/'+nextPost.fields.slug">&laquo; {{ nextPost.fields.title }}</nuxt-link>
        <div v-else class="pagination-previous" disabled>&laquo; Previous</div>
        <nuxt-link v-if="prevPost" class="pagination-next" :to="'/blog/'+prevPost.fields.slug">{{ prevPost.fields.title }} &raquo;</nuxt-link>
      </nav>
    </section>

  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import {createClient} from '~/plugins/contentful.js'
import Navigation from '~/components/navigation.vue'

const client = createClient()

export default {
  data () {
    return {
      allPosts: [],
      currentPost: [],
      tocHtml: ''
    }
  },
  asyncData ({ env, params }) {
    return client.getEntries({
      'content_type': env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate'
    }).then(entries => {
      const posts = entries.items
      const current = posts.filter(function (item) {
        return item.fields.slug === params.slug
      })
      return {
        allPosts: posts,
        currentPost: current[0]
      }
    }).catch(console.error)
  },
  computed: {
    dateOrder: function () {
      for (let i = 0; i < this.allPosts.length; i++) {
        if (this.allPosts[i].fields.publishDate === this.currentPost.fields.publishDate) {
          return i
        }
      }
    },
    nextPost: function () {
      if (this.dateOrder === 0) {
        return false
      } else {
        return this.allPosts[this.dateOrder - 1]
      }
    },
    prevPost: function () {
      if (this.dateOrder === this.allPosts.length - 1) {
        return false
      } else {
        return this.allPosts[this.dateOrder + 1]
      }
    }
  },
  head () {
    return {
      title: this.currentPost.fields.title,
      meta: [
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.currentPost.fields.description
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.currentPost.fields.title
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.currentPost.fields.heroImage.fields.file.url
        }
      ]
    }
  },
  components: {
    Navigation,
    VueMarkdown
  },
  methods: {
    say: function (event) {
      this.tocHtml = event
    }
  }
}
</script>

<style>

.foreground .page-bar {
  border-bottom: 0;
}

.headline {
  padding: 3em 0 0;
}

.headline h1 {
  font-size: 3.5em;
}

.copy {
  padding-bottom: 7em;
}

.copy *:not(div) {
  margin: 1.0em 0 1em;
}

.copy h1 {
  font-size: 3.0em;
}

.copy h2 {
  font-size: 2.5em;
}

.copy h3 {
  font-size: 2.0em;
}

.copy ul {
  margin: 0;
  padding-left: 1em;
  list-style: disc;
}

.copy li {
  margin: 0;
}

</style>
