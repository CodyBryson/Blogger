<template>
  <div class="col my-1">
    <div class="card border-dark">
      <div class="card-body">
        <p class="card-title customFont" :contenteditable="state.editBlogComment" @blur="editBlogComment">
          <b>{{ blogCommentProp.body }}</b>
        </p>
        <p class="card-text">
          By: {{ blogCommentProp.creator.name }}
        </p>
        <button type="button" class="btn btn-outline-warning" v-if="state.account.id == blogCommentProp.creatorId" @click="state.editBlogComment = !state.editBlogComment">
          Edit
        </button>
        <button type="button" class="btn btn-outline-danger mx-2" v-if="state.account.id == blogCommentProp.creatorId" @click="deleteComment()">
          Delete Comment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogCommentService } from '../services/BlogCommentService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {
  name: 'BlogCommentComponent',
  props: {
    blogCommentProp: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      blogComment: computed(() => AppState.blogComments),
      blog: computed(() => AppState.activeBlogPost),
      editBlogComment: false
    })
    return {
      state,
      async editComment(e) {
        try {
          blogCommentService.editBlogComment(props.blogCommentProp.id, e.target.innerText)
          await blogCommentService.getBlogComments(route.params.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteComment() {
        try {
          await blogCommentService.deleteBlogComment(props.blogCommentProp.id)
          await blogCommentService.getBlogComments(route.params.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.customFont{
  font-family: 'Merriweather', serif;

}
  .card{
   background: #fff;
  border-radius: 5px;
  box-shadow: hsla(0, 0, 0, .5) 0 8px 4px -2px;
}
</style>
