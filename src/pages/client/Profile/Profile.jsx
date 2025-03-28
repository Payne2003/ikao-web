import { useEffect, useState } from 'react'
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai'
import { MdPayment } from 'react-icons/md'
import avatar from '@/assets/image/coso.png'
import AccountInfo from '@/components/common/ProfileSections/AccountInfo'
import OrderManagement from '@/components/common/ProfileSections/OrderManagement'
import PaymentHistory from '@/components/common/ProfileSections/PaymentHistory'
import Logout from '@/components/common/ProfileSections/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserFromToken } from '@/store/authSlice'

const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState('Thông tin tài khoản')
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.auth.accessToken || null)

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserFromToken()) // Chỉ fetch user nếu có accessToken
    }
  }, [dispatch, accessToken])
  const user = useSelector((state) => state.auth.user)
  const menuItems = [
    {
      id: 1,
      label: 'Thông tin tài khoản',
      icon: <AiOutlineUser size={24} />,
      component: <AccountInfo />
    },
    {
      id: 2,
      label: 'Quản lý đơn hàng',
      icon: <AiOutlineShoppingCart size={24} />,
      component: <OrderManagement />
    },
    {
      id: 3,
      label: 'Lịch sử thanh toán',
      icon: <MdPayment size={24} />,
      component: <PaymentHistory />
    }
  ]

  return (
    <div className="flex gap-4 flex-col sm:flex-row w-full h-auto bg-[#F3F4F6]">
      <div className="sm:w-1/4 w-full p-8 flex flex-col gap-10 border-r bg-white shadow-md rounded-2xl border-gray-300">
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-4">
            <img
              sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
              src={avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <p className="text-xl text-gray-500">Tài khoản của</p>
              <span className="text-xl capitalize font-semibold">{user?.fullname}</span>
            </div>
          </div>
          <div>
            <Logout />
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center text-xl space-x-3 p-3 rounded cursor-pointer transition duration-200 ${
                selectedMenu === item.label
                  ? 'bg-hover text-white'
                  : 'hover:bg-hover hover:text-white'
              }`}
              onClick={() => setSelectedMenu(item.label)}
            >
              {item.icon}
              <p>{item.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="sm:w-3/4 w-full flex flex-col">
        {menuItems.find((item) => item.label === selectedMenu)?.component}
      </div>
    </div>
  )
}

export default Profile
