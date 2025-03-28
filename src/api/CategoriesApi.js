import instance from '@/api/axios'

const CategoriesApi = {
  // Lấy danh sách danh mục
  getCategories: async () => {
    try {
      const response = await instance.get('/categories')
      return response
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error)
      throw error
    }
  },

  // Lấy danh mục theo ID
  getCategoryById: async (id) => {
    try {
      const response = await instance.get(`/categories/${id}`)
      return response // Trả về dữ liệu danh mục hợp lệ
    } catch (error) {
      console.error('Lỗi khi lấy danh mục theo ID:', error)
      throw error // Ném lỗi nếu là lỗi khác ngoài 404
    }
  },
  // Lấy danh mục cha (các danh mục có parent_id === null)
  getParentCategories: async () => {
    try {
      const response = await instance.get('/categories')
      return response.filter((category) => category.parent_id === null)
    } catch (error) {
      console.error('Lỗi khi lấy danh mục cha:', error)
      throw error
    }
  },

  // Lấy danh mục con theo ID của danh mục cha
  getChildCategories: async (id) => {
    try {
      const response = await instance.get('/categories')
      return response.filter((category) => category.parent_id === id)
    } catch (error) {
      console.error('Lỗi khi lấy danh mục con:', error)
      throw error
    }
  }
}

export default CategoriesApi
