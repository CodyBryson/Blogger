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

  async editBlogComment(commentId, newBlogComment) {
    const blogcommentData = { body: newBlogComment }
    const res = await api.put('/api/comments' + commentId, blogcommentData)
    console.log(res)
  }

  async deleteBlogComment(commentId) {
    await api.delete('api/comments/' + commentId)
  }
}

export const blogCommentService = new BlogCommentService()
