<template>
  <div>
    <header class="home header">
      <div class="bg-img">
        <div class="foreground">
          <Navigation></Navigation>
          <div class="page-info wrapper">
            <h2>{{ person.fields.title }}</h2>
            <p class="is-pulled-right">{{ person.fields.shortBio }}</p>
          </div>
        </div>
      </div>
    </header>

    <section class="body-container">
      <div class="items-bar wrapper">
        <h2>最近の投稿</h2>
      </div>
      <div class="articles container is-fluid">
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
  asyncData ({env}) {
    return Promise.all([
      client.getEntries({
        'sys.id': env.CTF_PERSON_ID
      }),
      client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate'
      })
    ]).then(([entries, posts]) => {
      return {
        person: entries.items[0],
        posts: posts.items
      }
    }).catch(console.error)
  },
  components: {
    Navigation,
    ArticlePreview
  }
}
</script>

<style>

.bg-img { 
  background-image: url(http://images.ctfassets.net/kup205fov2fl/7orLdboQQowIUs22KAW4U/c475133838322ffc43f5441a949130b8/cat.jpg%3Fw=1200) ;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  border-radius: 0;
  margin-bottom: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
 }
h2 {
  font-size: 2.5em;
}

.page-info {
  display:none;
}

.page-info h2 {
  text-align: right;
}

.articles {
  padding-bottom: 3em;
}

.home.header {
  overflow: hidden;
  position: relative;
  height: 70vw;
  min-height: 400px;
  max-height: 610px;
  background: #000;
  color: #fff;
}

.home .person-name:link,
.home .person-name:visited {
  color: #fff;
}

.home .menu a:link,
.home .menu a:visited {
  color: #fff;
}

.home .page-info {
  padding-top: 12%;
}

.picture {
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0%;
  right: 0;
  width: 150%;
}

@media all and (min-width: 600px) {
  .picture {
    width: 100%;
  }
}

.foreground {
  overflow: hidden;
  position: relative;
  z-index: 3;
}

.foreground p {
  margin-bottom: 1em;
  text-align: right;
}

@media all and (min-width: 600px) {
  .foreground p {
    max-width: 250px;
  }
}
</style>
