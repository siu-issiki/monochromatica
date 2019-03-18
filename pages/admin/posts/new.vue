<template>
  <div>
    <section class="body-container">
      <div class="wrapper">
        <h1 class="title">New Post</h1>
        <div class="field">
          <div class="control">
            <input class="input" v-model="title" type="text" placeholder="title">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" v-model="slug" type="text" placeholder="slug">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" v-model="description" type="text" placeholder="description">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" v-model="tags" type="text" placeholder="tags">
          </div>
        </div>
        <div class="tile">
          <div class="tile is-vertical is-6">
            <div class="control">
              <textarea class="textarea editor" v-model="body"></textarea>
            </div>
          </div>
          <div class="tile is-parent">
            <div v-html="$md.render(body)" class="copy"></div>
          </div>
        </div>
        <button @click="publish">publish</button>
      </div>
    </section>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import { mapActions } from 'vuex'

  export default {
    layout: 'admin',
    asyncData () {
      return {
        title: '',
        slug: '',
        description: '',
        body: '# hello',
        tags: ''
      }
    },
    components: {
      VueMarkdown
    },
    methods: {
      async publish () {
        const payload = {
          title: this.title,
          slug: this.slug,
          description: this.description,
          body: this.body,
          tags: this.tags
        }
        await this.publishPost({ payload })
        this.$router.push('/admin')
      },
      ...mapActions('posts', ['publishPost'])
    }
  }
</script>

<style>
  .tile {
    height: 100%;
  }

  .editor, .preview {
    height: 100vh;
  }

  .foreground .page-bar {
    border-bottom: 0;
  }

  .headline {
    padding: 3em 0 0;
  }

  .headline h1 {
    font-size: 2.5em;
    line-height: 1.5em;
    padding-bottom: 5px;
  }

  .copy {
    padding-bottom: 7em;
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

  .blog-date {
    margin-top: -1em;
    margin-bottom: 2em;
  }

  .wrapper {
    border-bottom: 1px solid #EBEBEB;
  }
</style>
