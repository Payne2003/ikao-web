
import instance from './axios'
const OrderApi = {
  getOrderByUser: async (id) => {
    if (!id) return null // Dùng selector đã memoized
    try {
      const response = await instance.get('/order', { params: { user_id: id } })
      const orders = response
      // 🔍 Tìm order có status = "pending"
      let pendingOrder = orders.find((order) => order.status === 'pending')

      // Nếu không có đơn hàng nào "pending", tạo đơn mới
      if (!pendingOrder) {
        const newOrder = await instance.post('/order', {
          user_id: id,
          orderItem: [],
          address: '',
          orderNote: '',
          payment: 'Thanh toán khi nhận hàng',
          status: 'pending',
          shipping_fee: 0,
          discount: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        pendingOrder = newOrder
      }

      return pendingOrder
    } catch (error) {
      console.error('❌ Lỗi khi lấy order:', error)
      return null
    }
  },
  // 🛠 Tạo order mới nếu chưa có
  createOrder: async (orderData) => {
    try {
      const response = await instance.post('/order', orderData)
      return response
    } catch (error) {
      console.error('Lỗi khi tạo order:', error)
      return null
    }
  },

  updateOrder: async (orderId, updatedData) => {
    if (!orderId) return null
    try {
      const { data } = await instance.put(`/order/${orderId}`, updatedData)
      return data
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật order:', error.response || error.message)
      return null
    }
  },
  getOrderSuccess: async (id) => {
    try {
      const response = await instance.get('/order', { params: { user_id: id } })
      const orders = response // Lấy danh sách orders từ response

      if (!Array.isArray(orders)) {
        console.error('❌ API không trả về một mảng:', orders)
        return []
      }

      // 🔍 Lọc tất cả đơn hàng có status = "successful"
      const successOrders = orders.filter((order) => order.status === 'successful')

      return successOrders
    } catch (error) {
      console.error('❌ Lỗi khi lấy order:', error)
      return []
    }
  },
  getAllOrderByUserId: async (id) => {
    if (!id) return null // Dùng selector đã memoized
    try {
      const response = await instance.get('/order', { params: { user_id: id } })
      return response
    } catch (error) {
      console.error('❌ Lỗi khi lấy order:', error)
      return null
    }
  }
}

export default OrderApi
