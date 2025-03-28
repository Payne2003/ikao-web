/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import HeaderComponent from '../../common/Header/HeaderComponent'
import FooterComponent from '@/components/common/Footer/FooterComponent'
import Modal from '@/components/common/Modal/Modal'
import DirectoryMobile from '@/components/common/DirectoryMobile/DirectoryMobile'
import { CustomButton } from '@/components/common/Button/CustomButton'
import { FaBars } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import ContactButtons from '@/components/common/Contact/ContactButtons'
import { store } from '@/store/store'
import { fetchUserFromToken } from '@/store/authSlice'
import { initUserOrderAsync } from '@/store/orderSlice'
const LayoutClient = ({ children }) => {
  const location = useLocation()
  const [isOpenProduct, setIsOpenProduct] = useState(false)
  const getBreadcrumb = () => {
    const paths = location.pathname
      .split('/')
      .filter(Boolean)
      .map((path) => decodeURIComponent(path.trim())) // Giải mã URL
    return ['Home', ...paths].join(' / ')
  }
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.auth.accessToken || null)

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserFromToken()) // Chỉ fetch user nếu có accessToken
    }
  }, [dispatch, accessToken])
  const user = useSelector((state) => state.auth.user) // Dùng selector đã memoized
  useEffect(() => {
    if (user?.id) {
      dispatch(initUserOrderAsync(user.id))
    }
  }, [dispatch, user?.id])
  return (
    <Provider store={store}>
      <ToastContainer className="text-xl" />
      <div className="w-full h-full bg-[#F3F4F6]">
        <div>
          <HeaderComponent>
            <CustomButton
              onClick={() => setIsOpenProduct(!isOpenProduct)}
              className="md:hidden transition-all cursor-pointer mb-2"
            >
              {isOpenProduct ? (
                <IoClose size={45} className="hover:animate-spin" />
              ) : (
                <FaBars size={32} />
              )}
            </CustomButton>
          </HeaderComponent>
          <div className="bg-transparent container">
            <h3 className="bg-[#F3F4F6] capitalize pt-60 pb-14 sm:py-10 block text-black text-2xl font-bold py-8 ">
              {getBreadcrumb()}
            </h3>
            {children}
          </div>
          <FooterComponent />
        </div>
        <Modal
          isOpen={isOpenProduct}
          onMouseEnter={() => setIsOpenProduct(true)}
          modalClass="fixed top-0 flex z-3 sm:hidden right-0 left-0 bottom-0 bg-white"
          animation={isOpenProduct ? 'slide-in-left' : 'slide-out-left'}
        >
          <DirectoryMobile />
        </Modal>
        <ContactButtons />
      </div>
    </Provider>
  )
}

export default LayoutClient
