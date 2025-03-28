import instance from '@/api/axios'
import { toast } from 'react-toastify'

const RatingApi = {
  getTotalRatingProductById: async (productId) => {
    try {
      const res = await instance.get(`/ratings`)
      const ratings = res || [] // Đảm bảo dữ liệu không bị undefined

      // Lọc ra các đánh giá có rating hợp lệ (không null)
      const validRatings = ratings.filter((r) => r.product_id === productId && r.rating !== null)

      // Tính tổng số sao
      const totalStars = validRatings.reduce((sum, r) => sum + r.rating, 0)

      // Số lượng đánh giá hợp lệ
      const ratingCount = validRatings.length

      return { totalStars, ratingCount } // Trả về cả tổng số sao & số lượng đánh giá
    } catch (error) {
      console.error('Lỗi lấy tổng số sao:', error)
      return { totalStars: 0, ratingCount: 0 } // Trả về 0 nếu có lỗi
    }
  },
  // Lấy danh sách bình luận theo productId
  getComments: async (productId) => {
    try {
      const res = await instance.get(`/ratings?product_id=${productId}`)
      return res || [] // Đảm bảo trả về mảng rỗng nếu không có dữ liệu
    } catch (error) {
      console.error('Lỗi lấy bình luận:', error)
      return []
    }
  },

  createComment: async ({ user, productId, comment, rating = null, parentId }) => {
    try {
      const userName = user?.fullname
      const extingReating = await instance.get(`/ratings?product_id=${productId}&user_id=${user?.id}`)
      const hasRated = extingReating.some((r) => r.parent_id == null)
      if (hasRated && rating !== null) {
        toast.warning('Bạn đã đánh giá sản phẩm này rồi ❤️!')
        return null // Không tiếp tục gửi request nếu đã đánh giá
      }
      const payload = {
        product_id: productId,
        user_id: user.id,
        user_name: userName,
        comment,
        parent_id: parentId,
        created_at: new Date().toISOString()
      }

      if (parentId !== null) {
        payload.parent_id = parentId
      }
      if (rating !== null) {
        payload.rating = rating
      }
      const res = await instance.post(`/ratings`, payload)
      return res // Chỉ trả về dữ liệu cần thiết
    } catch (error) {
      console.error('Lỗi tạo bình luận:', error)
      throw error
    }
  },
  // Cập nhật bình luận (cập nhật toàn bộ dữ liệu của comment)
  updateComment: async (commentId, updatedCommentData) => {
    try {
      const res = await instance.put(`/ratings/${commentId}`, updatedCommentData)
      return res
    } catch (error) {
      console.error('Lỗi cập nhật bình luận:', error)
      throw error
    }
  },
  // Xóa bình luận
  deleteComment: async (commentId) => {
    try {
      await instance.delete(`/ratings/${commentId}`)
      return { success: true }
    } catch (error) {
      console.error('Lỗi xóa bình luận:', error)
      throw error
    }
  }
}

export default RatingApi
