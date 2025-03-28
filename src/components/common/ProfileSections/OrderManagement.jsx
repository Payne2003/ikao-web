import { useEffect, useState } from 'react'
import HeadingProfile from '@/components/common/HeadingProfile/HeadingProfile'
import InputComponent from '@/components/common/Input/InputComponent'
import { Link } from 'react-router-dom'
import OrderApi from '@/api/OrderApi'
import { useSelector } from 'react-redux'
const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const user = useSelector((state) => state.auth.user)
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await OrderApi.getOrderSuccess(user?.id)
      setOrders(response)
    }
    fetchOrders()
  }, [user?.id])
  return (
    <div className="flex flex-col w-full h-auto text-xl">
      <HeadingProfile title={'Quản lý đơn hàng của bạn'} />
      <div className="flex flex-col bg-white shadow-md rounded-2xl p-6">
        <div className="flex items-center  justify-between mb-4">
          <p className="text-xl font-semibold">
            Tổng chi tiêu: <span className="text-red-500">0đ</span>
          </p>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <InputComponent label="Từ ngày" type="date" classInput="w-1/3" />
          <InputComponent label="Đến ngày" type="date" classInput="w-1/3" />
          <button className="bg-primary hover:bg-hover text-white px-10 py-2 rounded-lg">
            Thống kê
          </button>
        </div>
        <Link className="bg-primary text-center hover:bg-hover text-white px-4 py-2 rounded-lg mb-4">
          Tạo đơn hàng
        </Link>
        <div className="overflow-auto w-full rounded-lg shadow hidden md:block">
          {orders.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-20 p-6 text-md font-semibold tracking-wide text-left">No.</th>
                  <th className="p-6 text-md font-semibold tracking-wide text-left">Mã đơn hàng</th>
                  <th className="p-6 text-md font-semibold tracking-wide text-left">Người đặt</th>
                  <th className="p-6 text-md font-semibold tracking-wide text-left">
                    Tổng giá trị đơn hàng
                  </th>
                  <th className="p-6 text-md font-semibold tracking-wide text-left">
                    Trạng thái đơn hàng
                  </th>
                  <th className="p-6 text-md font-semibold tracking-wide text-left">
                    Tổng số sản phẩm
                  </th>
                  <th className="p-6 text-md font-semibold tracking-wide text-left">Ngày đặt</th>
                  <th className="p-6 text-md font-semibold tracking-wide text-left">Ngày giao</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders?.map((order, index) => (
                  <tr key={order?.id} className="bg-white">
                    <td className="p-6 text-xl text-gray-700 whitespace-nowrap">{index + 1}</td>
                    <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                      <a href="#" className="font-bold text-hover hover:underline">
                        {order?.id}
                      </a>
                    </td>
                    <td className="p-6 text-xl text-gray-700 whitespace-nowrap">{user.fullname}</td>
                    <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                      {order?.totalPrice || 0}đ
                    </td>
                    <td className="p-6 text-xl text-gray-700  whitespace-nowrap">
                      {' '}
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
                    <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                      {order?.orderItem.length}
                    </td>
                    <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleString()}
                    </td>
                    <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                      {new Date(order.updated_at).toLocaleString()}
                    </td>
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
              <div key={order.id} className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-center">
                  <a href="#" className="text-hover font-bold text-2xl hover:underline">
                    Đơn hàng #{order.id}
                  </a>
                  <span className="text-sm px-3 py-1 bg-green-200 text-green-700 rounded-full">
                    {order.status}
                  </span>
                </div>
                <div className="mt-2 text-lg text-gray-700">
                  <p>
                    <strong>Người đặt:</strong> {user?.fullname || 'N/A'}
                  </p>
                  <p>
                    <strong>Tổng giá trị:</strong> {order.totalPrice?.toLocaleString() || '0'}đ
                  </p>
                  <p>
                    <strong>Tổng sản phẩm:</strong> {order.orderItem.length}
                  </p>
                  <p>
                    <strong>Ngày đặt:</strong>{' '}
                    {order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}
                  </p>
                  <p>
                    <strong>Ngày giao:</strong>{' '}
                    {order.updated_at ? new Date(order.updated_at).toLocaleString() : 'N/A'}
                  </p>
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
  )
}

export default OrderManagement
