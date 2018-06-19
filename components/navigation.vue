<template>
  <div class="page-bar wrapper">
    <a href="/" class="person-name">monochromatica</a>
    <nav role="navigation" class="top-nav">
      <ul class="menu">
        <li>
          <nuxt-link to="/">Index</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/blog">Blog</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/tags">Tags</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>

  .person-name:link,
  .person-name:visited {
    width: 50%;
    display: inline-block;
    font-size: 2em;
    text-decoration: none;
    color: #373F49;
  }

  .top-nav {
    width: 50%;
    display: inline-block;
    text-align: right;
  }

  .menu {
    display: inline-block;
  }

  .menu li {
    display: inline-block;
    margin-left: 1em;
  }

  .menu a:link,
  .menu a:visited {
    color: #373F49;
    text-decoration: none;
  }

</style>
