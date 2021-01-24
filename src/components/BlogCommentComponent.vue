<template>
  <div class="col-5 m-2 BlogCommentComponent">
    <div class="card border-dark">
      <div class="card-body">
        <h4 class="card-title customFont">
          <b>"{{ blogCommentProp.body }}"</b>
        </h4>
        <p class="card-text">
          {{ blogCommentProp.creator.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
// import { blogCommentService } from '../services/BlogCommentService'
export default {
  name: 'BlogCommentComponent',
  props: {
    blogCommentProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      blogComment: computed(() => AppState.blogComments),
      editBlogComment: false
    })
    return {
      state

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
</style>
