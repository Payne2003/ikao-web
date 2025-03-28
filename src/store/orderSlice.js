import OrderApi from '@/api/OrderApi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const saveOrderToLocalStorage = (order) => {
  if (order?.user_id) {
    localStorage.setItem(`order_${order.user_id}`, JSON.stringify(order))
  }
}

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order, { rejectWithValue }) => {
    try {
      await OrderApi.updateOrder(order.id, order)
      return order
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật order:', error)
      return rejectWithValue(error.response || 'Lỗi không xác định')
    }
  }
)

export const initUserOrderAsync = createAsyncThunk('order/initUserOrder', async (id) => {
  try {
    const order = await OrderApi.getOrderByUser(id);
    saveOrderToLocalStorage(order);
    return order;
  } catch (error) {
    console.error('❌ Lỗi khi khởi tạo order:', error);
    return null;
  }
});


export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderItem: [],
    address: '',
    orderNote: '',
    payment: 'Thanh toán khi nhận hàng',
    status: 'pending',
    shipping_fee: 0,
    discount: 0,
    created_at: Date.now(),
    updated_at: Date.now()
  },
  reducers: {
    addOrderProduct: (state, action) => {
      if (!state.user_id) return

      const { orderItem } = action.payload
      const itemOrder = state.orderItem.find((item) => item.product_id === orderItem.product_id)

      if (itemOrder) {
        itemOrder.quantity += orderItem.quantity
      } else {
        state.orderItem.push({ ...orderItem, quantity: orderItem.quantity || 1 })
      }
      saveOrderToLocalStorage(state) // Lưu localStorage sau khi cập nhật API thành công
    },
    increaseQuantity: (state, action) => {
      if (!state.user_id) return

      const { idProduct } = action.payload
      const itemOrder = state.orderItem.find((item) => item.product_id === idProduct)

      if (itemOrder) {
        itemOrder.quantity++
      }
      saveOrderToLocalStorage(state) // Lưu localStorage sau khi cập nhật API thành công
    },
    decreaseQuantity: (state, action) => {
      if (!state.user_id) return

      const { idProduct } = action.payload
      const itemOrder = state.orderItem.find((item) => item.product_id === idProduct)

      if (itemOrder) {
        if (itemOrder.quantity > 1) {
          itemOrder.quantity--
        } else {
          state.orderItem = state.orderItem.filter((item) => item.product_id !== idProduct)
        }
      }
      saveOrderToLocalStorage(state) // Lưu localStorage sau khi cập nhật API thành công
    },
    removeOrderProduct: (state, action) => {
      if (!state.user_id) return

      const { idProduct } = action.payload
      state.orderItem = state.orderItem.filter((item) => item.product_id !== idProduct)
      saveOrderToLocalStorage(state) // Lưu localStorage sau khi cập nhật API thành công
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initUserOrderAsync.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload
        }
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload
        }
      })
  }
})

export const {
  addOrderProduct,
  increaseQuantity,
  decreaseQuantity,
  removeOrderProduct,
  switchUserOrder
} = orderSlice.actions

export default orderSlice.reducer