import instance from '@/api/axios'

const FavoritesApi = {
  getTotalFavoritesByProductId: async (id) => {
    try {
      const response = await instance.get(`/favorites`)
      const favorites = response || []

      // Lọc số lượng yêu thích của sản phẩm
      const totalFavorites = favorites.filter((f) => f.product_id === id).length

      return { totalFavorites }
    } catch (error) {
      console.error('Lỗi lấy số lượt yêu thích:', error)
      return { totalFavorites: 0 } // Trả về 0 nếu có lỗi
    }
  },

  // Thêm sản phẩm vào danh sách yêu thích
  addFavorite: async (user_id, product_id, date_now) => {
    try {
      // 1️⃣ Kiểm tra xem sản phẩm đã có trong danh sách yêu thích chưa
      const checkResponse = await instance.get(
        `/favorites?user_id=${user_id}&product_id=${product_id}`
      )

      if (checkResponse.length > 0) {
        return { error: 'Bạn đã yêu thích sản phẩm này!' } // Trả về lỗi nếu đã tồn tại
      }

      // 2️⃣ Nếu chưa tồn tại, thực hiện thêm mới
      const response = await instance.post(`/favorites`, {
        user_id,
        product_id,
        created_at: date_now
      })

      return response // Trả về dữ liệu khi thêm thành công
    } catch (error) {
      console.error('Lỗi khi thêm vào danh sách yêu thích:', error)
      return { error: 'Lỗi khi thêm vào danh sách yêu thích' }
    }
  }
}

export default FavoritesApi
