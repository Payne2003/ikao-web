import OrderApi from '@/api/OrderApi'
import HeadingProfile from '@/components/common/HeadingProfile/HeadingProfile'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const PaymentHistory = () => {
  const [orders, setOrders] = useState([])
  const user = useSelector((state) => state.auth.user)
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await OrderApi.getAllOrderByUserId(user?.id)
      setOrders(response)
    }
    fetchOrders()
  }, [user?.id])
  const totalPrice =
    orders?.orderItem?.reduce((total, item) => total + item?.price * item?.quantity, 0)
  return (
    <div className="flex flex-col w-full h-auto">
      <HeadingProfile title={'Lịch sử mua hàng'} />

      <div className="flex flex-col bg-white shadow-md rounded-2xl p-6 w-full">
        <div className="w-full p-4">
          <div className="overflow-auto w-full rounded-lg shadow hidden md:block">
            {orders.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50 border-b-1 border-gray-200">
                  <tr>
                    <th className="p-4 text-xl text-left font-semibold">STT</th>
                    <th className="p-4 text-xl text-left font-semibold">Mã đơn hàng</th>
                    <th className="p-4 text-xl text-left font-semibold">Ngày đặt</th>
                    <th className="p-4 text-xl text-left font-semibold">Trạng thái</th>
                    <th className="p-4 text-xl text-left font-semibold">Số đơn</th>
                    <th className="p-4 text-xl text-left font-semibold">Tổng giá trị</th>
                    <th className="p-4 text-xl text-left font-semibold">Phí vận chuyển</th>
                    <th className="p-4 text-xl text-left font-semibold">Tổng</th>
                    <th className="p-4 text-xl text-left font-semibold">Tạm tính</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id} className="bg-white">
                      <td className="p-4 text-xl text-text">{index + 1}</td>
                      <td className="p-4 text-xl text-hover hover:underline">{order?.id}</td>
                      <td className="p-4 text-xl text-text">
                        {new Date(order.created_at).toLocaleString()}
                      </td>
                      <td className="p-4 text-xl text-text">
                        <span
                          className={`px-3 py-1 font-semibold text-white rounded-full ${
                            order?.status === 'pending'
                              ? 'bg-yellow-300'
                              : order?.status === 'shipped'
                              ? 'bg-blue-300'
                              : order?.status === 'successful'
                              ? 'bg-green-300'
                              : order?.status === 'canceled'
                              ? 'bg-red-300'
                              : 'bg-gray-300'
                          }`}
                        >
                          {order?.status}
                        </span>
                      </td>
                      <td className="p-4 text-xl text-text">{order?.orderItem?.length}</td>
                      <td className="p-4 text-xl text-text">{order.totalValue || 0} đ</td>
                      <td className="p-4 text-xl text-text">{order.shipping_pee || 0} đ</td>
                      <td className="p-4 text-xl text-text">{order.grandTotal || 0} đ</td>
                      <td className="p-4 text-xl text-text">{order.provisional || 0} đ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-xl text-gray-500 text-center">Không có đơn hàng nào</div>
            )}
          </div>

          {/* Mobile View */}
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="bg-white space-y-3 w-full p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between text-2xl font-bold">
                    <a href="#" className="text-hover hover:underline">
                      {order.id}
                    </a>
                    <span className="text-gray-500 text-lg">{order.month}</span>
                  </div>
                  <div className="text-xl text-gray-700">
                    <span className="font-semibold">Ngày đặt:</span> {order.orderDate}
                  </div>
                  <div className="text-xl text-gray-700">
                    <span className="font-semibold">Số đơn:</span> {order.orderCount}
                  </div>
                  <div className="text-xl text-gray-700">
                    <span className="font-semibold">Tổng giá trị:</span>{' '}
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(totalPrice)}
                  </div>
                  <div className="text-xl text-gray-700">
                    <span className="font-semibold">Hoàn tiền:</span> {order.refund} đ
                  </div>
                  <div className="text-xl text-gray-700">
                    <span className="font-semibold">Tổng:</span> {order.grandTotal} đ
                  </div>
                  <div className="text-xl text-gray-700">
                    <span className="font-semibold">Tạm tính:</span> {order.provisional} đ
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-xl text-gray-500 text-center col-span-2">
                Không có đơn hàng nào
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentHistory
