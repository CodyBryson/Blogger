<template>
  <div class="blog-container">
    <div class="blog-header">
      <div class="blog-author--no-cover">
        <h3>{{ blogPostProp.creator.name }}</h3>
      </div>
    </div>
    <div class="blog-body">
      <div class="blog-title">
        <h1 class="customFont">
          <a href="#">{{ blogPostProp.title }}</a>
        </h1>
      </div>
      <div class="blog-footer">
        <ul>
          <li class="published-date">
            {{ blogPostProp.creator.createdAt }}
          </li>
          <li class="comments">
            <a href="#"><svg class="icon-bubble"><use xlink:href="#icon-bubble"></use></svg><span class="numero">8</span></a>
          </li>
          <li class="shares">
            <a href="#"><svg class="icon-star"><use xlink:href="#icon-star"></use></svg><span class="numero">3</span></a>
          </li>
        </ul>
      </div>
      <router-link :to="{name: 'BlogPage', params: {id: blogPostProp.id}}">
        <button type="button" class="btn btn-outline-primary m-2" @click="getOne()">
          View
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogPostService } from '../services/BlogPostService'
export default {
  name: 'BlogPostComponent',
  props: {
    blogPostProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      editBlogPost: false
    })
    return {
      state,
      getOne(id) {
        blogPostService.getOne(props.blogPostProp.id)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.customFont{
  font-family: 'Caveat', cursive;
}
  .card{
   background: #fff;
  border-radius: 5px;
  box-shadow: hsla(0, 0, 0, .5) 0 8px 4px -2px;
}
.blog-container {
  background: #fff;
  border-radius: 5px;
  box-shadow: hsla(0, 0, 0, .5) 0 8px 4px -2px;
  font-weight: 100;
  margin: 48px auto;
  width: 20rem;
  @media screen and (min-width: 480px) {
    width: 28rem;
  }
  @media screen and (min-width: 767px) {
    width: 40rem;
  }
  @media screen and (min-width: 959px) {
    width: 50rem;
  }
}
.blog-container a {
  color: #4d4dff;
  text-decoration: none;
  transition: .25s ease;
  &:hover {
    border-color: #ff4d4d;
    color: #ff4d4d;
  }
}

// Blog header
//-------------------------

.blog-author,
.blog-author--no-cover {
  margin: 0 auto;
  padding-top: .125rem;
  width: 80%;
}
.blog-author h3::before,
.blog-author--no-cover h3::before {

  content: " ";
  display: inline-block;
  height: 32px;
  margin-right: .5rem;
  position: relative;
  top: 8px;
  width: 32px;
}
.blog-author h3 {
  color: #fff;
  font-weight: 100;
}
.blog-author--no-cover h3 {
  color: lighten(#333, 40%);
  font-weight: 100;
}

// Blog body
//-------------------------
.blog-body {
  margin: 0 auto;
  width: 80%;
}
.video-body {
  height: 100%;
  width: 100%;
}
.blog-title h1 a {
  color: #333;
  font-weight: 100;
}
.blog-summary p {
  color: lighten(#333, 10%);
}
.blog-tags ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
}
.blog-tags li + li {
  margin-left: .5rem;
}
.blog-tags a {
  border: 1px solid lighten(#333, 40%);
  border-radius: 3px;
  color: lighten(#333, 40%);
  font-size: .75rem;
  height: 1.5rem;
  line-height: 1.5rem;
  letter-spacing: 1px;
  padding: 0 .5rem;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  width: 5rem;
}

// Blog footer
//-------------------------
.blog-footer {
  border-top: 1px solid lighten(#333, 70%);
  margin: 0 auto;
  padding-bottom: .125rem;
  width: 80%;
}
.blog-footer ul {
  list-style: none;
  display: flex;
  flex: row wrap;
  justify-content: flex-end;
  padding-left: 0;
}
.blog-footer li:first-child {
  margin-right: auto;
}
.blog-footer li + li {
  margin-left: .5rem;
}
.blog-footer li {
  color: lighten(#333, 40%);
  font-size: .75rem;
  height: 1.5rem;
  letter-spacing: 1px;
  line-height: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  white-space: nowrap;
  & a {
    color: lighten(#333, 40%);
  }
}
.comments {
  margin-right: 1rem;
}
.published-date {
  border: 1px solid lighten(#333, 40%);
  border-radius: 3px;
  padding: 0 .5rem;
}
.numero {
  position: relative;
  top: -0.5rem;
}

// Icons
//-------------------------
.icon-star,
.icon-bubble {
  fill: lighten(#333, 40%);
  height:24px;
  margin-right: .5rem;
  transition: .25s ease;
  width: 24px;
  &:hover {
    fill: #ff4d4d;
  }
}
</style>
