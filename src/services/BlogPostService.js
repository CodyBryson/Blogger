import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogPostService {
  async getBlogPosts() {
    const res = await api.get('api/blogs')
    AppState.blogPosts = res.data
  }

  async getOne(id) {
    const res = await api.get(`api/blogs/${id}`)
    AppState.activeBlogPost = res.data
  }

  async create(blogPost) {
    const res = await api.post('api/blogs', blogPost)
    console.log(res.data)
    AppState.blogPosts.push(res.data)
    return res.data.id
  }

  async editPostTitle(blogPostId, newTitle) {
    const blogPostData = { title: newTitle }
    const res = await api.put('api/blogs/' + blogPostId, blogPostData)
    console.log(res)
  }

  async editPostBody(blogPostId, newBody) {
    const blogPostData = { body: newBody }
    const res = await api.put('api/blogs/' + blogPostId, blogPostData)
    console.log(res)
  }

  async deleteBlogPost(blogPostId) {
    await api.delete('api/blogs/' + blogPostId)
  }
}
export const blogPostService = new BlogPostService()
