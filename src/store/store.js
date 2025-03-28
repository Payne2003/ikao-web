import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/store/authSlice'
import orderReducer from '@/store/orderSlice'
// import ordersItemReducer from '@/store/oderItemSlice'
export const store = configureStore({
  reducer: {
    auth: authSlice,
    order: orderReducer,
    // orders: ordersItemReducer, // Thêm dấu phẩy cuối để dễ đọc hơn
  },
})
