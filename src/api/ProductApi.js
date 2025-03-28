import instance from '@/api/axios'

const ProductApi = {
  getProductDetail: async () => {
    try {
      const response = await instance.get(`http://localhost:3000/product-list?product_id=1`);
      return response
    } catch (error) {
      console.error("Error fetching product detail:", error);
      return null;
    }
  }
  ,   
  getProductSizeById: async (id) => {
    try {
      const response = await instance.get(`/products_join_product-size/${id}`)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error)
      throw error
    }
  },
  // Lấy sản phẩm theo ID
  getProductById: async (id) => {
    try {
      const response = await instance.get(`/products/${id}`)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error)
      throw error
    }
  },
  getAllProducts: async () => {
    try {
      const response = await instance.get(`/products`)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error)
      throw error
    }
  },
  // Lấy sản phẩm theo danh mục
  getAllProductsByCategory: async (categoryId) => {
    try {
      // Lấy danh sách danh mục hợp lệ
      const categoriesResponse = await instance.get('/categories')
      const validCategories = categoriesResponse.map((cat) => cat.id) // Lấy danh sách ID danh mục

      // Kiểm tra nếu categoryId không tồn tại trong danh mục hợp lệ
      if (!validCategories.includes(categoryId)) {
        return [] // Trả về mảng rỗng
      }

      // Nếu danh mục hợp lệ, gọi API lấy sản phẩm
      const response = await instance.get(`/products?category_id=${categoryId}`)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm theo danh mục:', error.response || error.message)
      throw error
    }
  }
}

export default ProductApi
