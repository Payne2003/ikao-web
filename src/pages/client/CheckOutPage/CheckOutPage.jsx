import Column from '@/components/common/Column/Column'
import Grid from '@/components/common/Grid/Grid'
import InputComponent from '@/components/common/Input/InputComponent'
import Row from '@/components/common/Row/Row'
import { useState } from 'react'
import { FaAngleLeft, FaShoppingCart } from 'react-icons/fa'
import { IoLocation } from 'react-icons/io5'
import { CustomButton } from '@/components/common/Button/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  decreaseQuantity,
  increaseQuantity,
  removeOrderProduct,
  updateOrderAsync
} from '@/store/orderSlice'
import { CiSquareRemove } from 'react-icons/ci'
const CheckOutPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const order = useSelector((state) => state.order)
  const [address, setAddress] = useState('')
  const [orderNote, setOrderNote] = useState('')
  const dispatch = useDispatch()
  const totalPrice =
    order?.orderItem?.reduce((total, item) => total + item?.price * item?.quantity, 0) || 0
  const user = useSelector((state) => state.auth.user)
  const handleIncrease = (idProduct) => {
    dispatch(increaseQuantity({ idProduct }))

    setTimeout(() => {
      const updateOrder = JSON.parse(localStorage.getItem(`order_${user.id}`))
      dispatch(updateOrderAsync(updateOrder))
    }, 200) // Đợi 0.3s để đảm bảo localStorage được cập nhật
    toast.success('Cập nhật số lượng thành công!')
  }

  const handleDecrease = (idProduct) => {
    dispatch(decreaseQuantity({ idProduct }))

    setTimeout(() => {
      const updateOrder = JSON.parse(localStorage.getItem(`order_${user.id}`))
      dispatch(updateOrderAsync(updateOrder))
    }, 300)
    toast.success('Giảm số lượng thành công!')
  }

  const handleRemove = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }))

    setTimeout(() => {
      const updateOrder = JSON.parse(localStorage.getItem(`order_${user.id}`))
      dispatch(updateOrderAsync(updateOrder))
    }, 300)
    toast.success('Xóa sản phẩm khỏi giỏ hàng!')
  }
  const handleSubmit = (event) => {
    event.preventDefault() // Chặn hành động reload trang mặc định

    const storedOrder = JSON.parse(localStorage.getItem(`order_${user.id}`))

    if (storedOrder) {
      const updatedOrder = {
        ...storedOrder,
        status: 'successful',
        address,
        orderNote,
        payment: selectedMethod,
        updated_at: Date.now()
      }

      dispatch(updateOrderAsync(updatedOrder))

      // Xóa order khỏi localStorage sau khi đặt hàng thành công
      localStorage.removeItem(`order_${user?.id}`)

      toast.success('Đặt hàng thành công!')
    } else {
      toast.error('Không tìm thấy đơn hàng!')
    }
  }

  return (
    <form action="" onSubmit={(e) => handleSubmit(e)}>
      <section className="grid grid-cols-1 auto-rows-auto gap-4 sm:grid-cols-2 bg-gray-100">
        <Row
          justify="start"
          align="start"
          className="col-span-1 gap-4  flex-col sm:col-span-1 w-full h-auto sm:row-span-1"
        >
          <Column
            justify="start"
            align="center"
            className="text-2xl p-6 shadow-sm rounded-md bg-white font-bold w-full flex flex-row gap-3"
          >
            <IoLocation className="text-primary" size={20} />
            <span>Thông tin mua hàng</span>
          </Column>
          <Column
            justify="start"
            className="text-2xl shadow-sm p-6 rounded-md bg-white w-full h-auto font-bold flex gap-3"
          >
            <div className="w-full">
              <div className="w-full py-2 flex items-center">
                <label htmlFor="" className="w-50 text-xl">
                  Tên khách hàng:{' '}
                </label>
                <InputComponent
                  disabled
                  classInput={'w-full py-2 bg-white  px-2 border text-xl rounded-md items-center'}
                  type="text"
                  placeholder={user?.fullname}
                  value={user?.fullname}
                  name={'Họ và tên'}
                />
              </div>
              <div className="w-full py-2 flex items-center">
                <label htmlFor="" className="w-50 text-xl">
                  Số điện thoại:{' '}
                </label>
                <InputComponent
                  disabled
                  classInput={'w-full py-2 bg-white  px-2 border text-xl rounded-md items-center'}
                  type="text"
                  name={'Số điện thoại'}
                  placeholder={user?.phone}
                  value={user?.phone}
                />
              </div>
              <div className="w-full py-2 flex items-center">
                <label htmlFor="" className="w-50 text-xl">
                  Địa chỉ nhận hàng:{' '}
                </label>
                <InputComponent
                  classInput={'w-full py-2 bg-white  px-2 border text-xl rounded-md items-center'}
                  type="text"
                  placeholder={'Mẫu: ( số nhà,số đường,xã, huyện , tỉnh ) hoặc đường link gg map'}
                  name={'Vị trí nhận hàng'}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="w-full py-2 flex ">
                <label htmlFor="" className="w-50 text-xl align-text-top">
                  Ghi chú đơn hàng:{' '}
                </label>
                <InputComponent
                  classInput={
                    'w-full min-h-47 flex items-start bg-white  px-2 border text-xl rounded-md '
                  }
                  type="textarea"
                  placeholder={'Ví dụ: màu sắc, kích thước, địa chỉ nhận hàng, giờ nhận hàng.'}
                  name={'thông tin chi tiết'}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                />
              </div>
            </div>
          </Column>
        </Row>
        <Row className="col-span-1 flex-col h-auto sm:col-span-1 sm:row-span-1">
          <Column
            justify="start"
            className="p-6 shadow-sm rounded-md text-2xl bg-white font-bold w-full flex flex-row gap-3"
          >
            <FaShoppingCart className="text-primary" size={20} />
            <span>Đơn hàng ({order?.orderItem?.length} sản phẩm)</span>
          </Column>
          <Column justify="start" className="p-6 shadow-sm rounded-md w-full bg-white  h-full">
            <div className="w-full">
              <Grid cols={4} rows={4} className="w-full h-full">
                <div className="col-span-4 pb-2 row-span-1  border-b-1 border-b-gray-300 row w-full h-auto flex justify-between text-center">
                  <div className="text-2xl text-black font-bold px-2 flex-2">Sản phẩm</div>
                  <div className="text-2xl text-black font-bold px-2 flex-1">Số lượng</div>
                  <div className="text-2xl text-black font-bold px-2 flex-1">Đơn giá</div>
                  <div className="text-2xl text-black font-bold px-2 flex-1">Thành tiền</div>
                  <div className="text-2xl text-black font-bold px-2 flex-1">Thao tác</div>
                </div>
                {order?.orderItem?.map((order) => {
                  return (
                    <div
                      key={order?.id}
                      className="border-b-1 pb-4 border-b-gray-300 col-span-4 row-span-1 row w-full h-auto flex justify-between items-center text-center"
                    >
                      <div className="text-2xl flex-2 flex gap-3 text-black font-bold px-2">
                        <img
                          src={order?.image}
                          sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                          className="w-30 h-30"
                          alt=""
                        />
                        <span className="text-xl text-left text-text w-full h-auto line-clamp-2">
                          {order?.name}
                        </span>
                      </div>
                      <div className="text-2xl flex-1 flex justify-center gap-0 text-black font-bold px-2">
                        <CustomButton
                          onClick={() => handleDecrease(order?.product_id)}
                          className="border-gray-400 border-1 w-10 h-10 flex justify-center items-center text-xl font-bold"
                        >
                          -
                        </CustomButton>
                        <span className="border-gray-400 border-1 w-10 h-10 flex justify-center items-center text-xl font-bold">
                          {order?.quantity}
                        </span>
                        <CustomButton
                          onClick={() => handleIncrease(order?.product_id)}
                          className="border-gray-400 border-1 w-10 h-10 flex justify-center items-center text-xl font-bold"
                        >
                          +
                        </CustomButton>
                      </div>
                      <div className="text-2xl justify-center flex-1 text-black font-bold px-2">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(order?.price)}
                      </div>
                      <div className="text-2xl justify-center flex-1 text-black font-bold px-2">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(order?.price * order?.quantity)}
                      </div>
                      <CustomButton
                        onClick={() => handleRemove(order?.product_id)}
                        className="text-black flex-1 rounded-md flex justify-center hover:text-red-600"
                      >
                        <CiSquareRemove size={20} />
                      </CustomButton>
                    </div>
                  )
                })}

                <div className="col-span-4 border-b-1 pb-4 border-b-gray-300 row-span-1 row w-full h-auto flex text-center">
                  <Link
                    to={'/products'}
                    className="text-xl flex flex-3 text-hover items-center gap-1"
                  >
                    <FaAngleLeft size={10} />
                    <p>Chọn sản phẩm khác</p>
                  </Link>
                  <div className="flex-1 text-xl text-black flex justify-between">
                    <div className="text-left justify-between ">
                      <p>Tạm tính: </p>
                      <p>Thuế: </p>
                    </div>
                    <div className="justify-between text-right">
                      <p className="price">
                        {' '}
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(totalPrice)}
                      </p>
                      <p className="price">0</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 row-span-1 h-auto flex justify-end">
                  <div className="text-xl w-90 text-black flex justify-between h-24 flex-col">
                    <div className="text-left flex justify-between">
                      <p className="text-button font-bold">Tổng tiền: </p>
                      <p className="price text-button font-bold">
                        {' '}
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(totalPrice)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <InputComponent
                        type="text"
                        placeholder={'Nhập mã giảm giá'}
                        classInput={
                          'w-auto outline-none h-10 p-2 border-1 border-r-0 border-gray-200'
                        }
                      />
                      <CustomButton className="h-auto cursor-pointer bg-gray-200 w-50">
                        Áp dụng
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </Grid>
            </div>
          </Column>
        </Row>
        <Row className="sm:col-span-2 sm:row-span-1">
          <div className="p-4 bg-white rounded-lg flex flex-col items-center shadow-md w-full ">
            <h2 className="flex items-center w-full font-semibold text-2xl mb-4">
              <span className="mr-2">📌</span> Hình thức thanh toán
            </h2>

            <div className="space-y-6 w-full text-xl py-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={selectedMethod === 'cod'}
                  onChange={() => setSelectedMethod('cod')}
                />
                <span>Thanh toán khi nhận hàng</span>
              </label>
              {selectedMethod === 'cod' && (
                <div className="p-3 bg-gray-100 text-gray-700 rounded-md">
                  Thanh toán bằng tiền mặt khi nhận hàng tại nhà hoặc showroom.
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-[40%] sm:w-[20%] text-2xl mt-4 py-4 px-4 bg-primary text-white font-bold rounded-lg hover:bg-hover flex items-center justify-center"
            >
              🛒 GỬI ĐƠN HÀNG
            </button>

            <p className="text-xl text-gray-600 text-center mt-2">
              Khi bạn Gửi đơn hàng, Mua hàng có nghĩa là bạn đồng ý với
              <a href="#" className="text-black hover:text-hover ">
                các chính sách của gotrangtri.vn
              </a>
            </p>
          </div>
        </Row>
      </section>
    </form>
  )
}

export default CheckOutPage
