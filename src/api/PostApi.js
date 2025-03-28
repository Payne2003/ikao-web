import instance from '@/api/axios'
const PostApi = {
  getPosts: async () => {
    try {
      const response = await instance.get(`/posts`)
      return response
    } catch (error) {
      console.log()
      throw error
    }
  },
  getRandomPosts: async () => {
    const response = await instance.get(`/posts`)
    const posts = response

    if (posts.length <= 2) return posts // Nếu có <= 2 bài thì trả về luôn

    // Xáo trộn mảng bài viết (Fisher-Yates Shuffle)
    for (let i = posts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[posts[i], posts[j]] = [posts[j], posts[i]]
    }

    return posts.slice(0, 2) // Lấy 2 bài đầu tiên sau khi xáo trộn
  }
}

export default PostApi
