<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <!-- TITLE -->
    <h1 class="display-1 text-center text-light customFont">
      Chapters
    </h1>
    <h2 class="text-center text-light customFont">
      <i>A Blog of Short Stories</i>
    </h2>
    <div v-if="state.user.isAuthenticated">
      <button type="button" class="btn btn-outline-light customFont my-2" data-toggle="modal" data-target="#modelId">
        <h5>
          New Blog Post
        </h5>
      </button>

      <!-- Modal -->
      <div class="modal fade"
           id="modelId"
           tabindex="-1"
           role="dialog"
           aria-labelledby="modelTitleId"
           aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title customFont text-center">
                <b>Create New Blog Post</b>
              </h2>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createBlogPost">
                <div class="form-group">
                  <label for="title"><h4 class="customFont">Title</h4></label>
                  <input type="text"
                         name="title"
                         id="title"
                         v-model="state.newblogPost.title"
                         class="form-control"
                         placeholder="Title..."
                  >
                </div>
                <div class="form-group">
                  <label for="body"><h4 class="customFont">Body</h4></label>
                  <textarea class="form-control" id="body" v-model="state.newblogPost.body" rows="6" placeholder="Body..."></textarea>
                </div>
                <div class="form-group">
                  <label for=""><h4 class="customFont">Upload Image</h4></label>
                  <input type="text"
                         name="image"
                         id="image"
                         v-model="state.newblogPost.picture"
                         class="form-control"
                         placeholder="imgURL..."
                  >
                </div>
                <button type="submit" class="btn btn-outline-success text-dark">
                  Submit
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-danger text-dark" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Blog Post Container -->
    <div class="row justify-content-center m-3 postContainer">
      <BlogPostComponent v-for="blogPost in state.blogPosts" :key="blogPost.id" :blog-post-prop="blogPost" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { blogPostService } from '../services/BlogPostService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import BlogPostComponent from '../components/BlogPostComponent.vue'
import { useRouter } from 'vue-router'

export default {
  components: { BlogPostComponent },
  name: 'Home',
  setup() {
    const router = useRouter()
    const state = reactive({
      newblogPost: {},
      blogPosts: computed(() => AppState.blogPosts),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await blogPostService.getBlogPosts()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      blogPosts: computed(() => AppState.blogPosts),

      async createBlogPost() {
        try {
          const id = await blogPostService.create(state.newblogPost)
          state.newblogPost = {}
          router.push({ name: 'BlogPage', params: { id } })
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.customFont{
  font-family: 'Merriweather', serif;

}
.postContainer{
  max-height: 60vh;
  overflow-y: auto;
}
.postContainer::-webkit-scrollbar{
  width: 0.7em;
  background: transparent;
}
.modal-backdrop{
  z-index: -1000!important;
}
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
