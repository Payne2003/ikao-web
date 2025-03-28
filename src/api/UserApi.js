import instance from './axios'

const UserApi = {
  // Hàm update user
  updateUser: async (id, data) => {
    try {
      // Gửi dữ liệu cập nhật lên server (chỉ gửi những trường cần cập nhật)
      const response = await instance.put(`/users/${id}`, data)

      return response 
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật user:', error)
      throw error
    }
  }
}

export default UserApi
