import instance from '@/api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'


const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  user: null
}

// Thunk lấy user từ API bằng email trong JWT
export const fetchUserFromToken = createAsyncThunk(
  'auth/fetchUserFromToken',
  async (_, { getState, rejectWithValue }) => {
    const { accessToken } = getState().auth
    if (!accessToken) return rejectWithValue('No access token')

    try {
      // Giải mã JWT để lấy email
      const decoded = jwtDecode(accessToken) 
      const userEmail = decoded.email
      if (!userEmail) return rejectWithValue('No email found in token')

      // Gọi API để tìm user theo email
      const response = await instance.get(`/users?email=${userEmail}`)
      if (response.length === 0) return rejectWithValue('User not found')

      return response[0] // json-server-auth trả về danh sách, lấy user đầu tiên
    } catch (error) {
      return rejectWithValue(error.response || 'Failed to fetch user')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
      localStorage.setItem('accessToken', action.payload.accessToken)
    },
    logout: (state) => {
      state.accessToken = null
      state.user = null
      localStorage.removeItem('accessToken')
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserFromToken.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
