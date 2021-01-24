import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogCommentService {
  async getBlogComments(id) {
    const res = await api.get(`api/blogs/${id}/comments`)
    console.log(res.data)
    AppState.blogComments = res.data
  }

  async createBlogComment(blogComment) {
    const res = await api.post('api/comments', blogComment)
    console.log(res)
  }

  async deleteBlogComment(commentId) {
    const res = await api.delete('api/posts/' + commentId)
    console.log(res)
  }
}

export const blogCommentService = new BlogCommentService()
