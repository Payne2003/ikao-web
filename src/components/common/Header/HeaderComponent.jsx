/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import logo from '@/assets/image/logo.png'
import { RiShoppingBag4Line } from 'react-icons/ri'
// import { FaBars, FaPhoneAlt } from 'react-icons/fa'
// import { MdOutlineSell } from 'react-icons/md'
// import NavigationCard from '../../navigation/CardNavigation/NavigationCard'
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'
import { CustomButton } from '../Button/CustomButton'
import CategoryByDirectory from '@/components/common/Grid/CategoryByDirectoryGrid/CategoryByDirectory'
import ModalUser from '@/components/common/Modal/ModalUser/ModalUser'
import InputComponent from '@/components/common/Input/InputComponent'
import { CiSearch } from 'react-icons/ci'
// import { LucideCircleUser } from 'lucide-react'
import { useSelector } from 'react-redux'
import { FaBars } from 'react-icons/fa'
import CategoriesApi from '@/api/CategoriesApi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// eslint-disable-next-line react/prop-types
const HeaderComponent = ({ children }) => {
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false) // Đánh dấu đã cuộn hay chưa
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenUser, setIsOpenUser] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoriesDirectory, setCategoriesDirectory] = useState([])
  const [selectedDirectoryId, setSelectedDirectoryId] = useState(null) // ID danh mục đang hover
  // const [isOpenProductMobile, setIsOpenProductMobile] = useState(false)
  // const accessToken = localStorage.getItem("accessToken");
  const user = useSelector((state) => state.auth.user)
  useEffect(() => {
    const fetchCategoriesDirectory = async () => {
      try {
        const data = await CategoriesApi.getParentCategories()
        setCategoriesDirectory(data)
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error)
      }
    }
    fetchCategoriesDirectory()
  }, [])
  const handleDirectoryHover = useCallback(
    async (directoryId) => {
      if (selectedDirectoryId === directoryId) return
      setSelectedDirectoryId(directoryId)
      setCategories([]) // Reset danh mục trước khi lấy dữ liệu mới

      try {
        const data = await CategoriesApi.getChildCategories(directoryId)
        setCategories(data)
      } catch (error) {
        console.error('Lỗi khi lấy danh mục con:', error)
      }
    },
    [selectedDirectoryId]
  )
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY

      if (scrollTop === 0) {
        // Khi quay lại đầu trang, reset trạng thái
        setIsScrollingDown(false)
        setHasScrolled(false)
        return
      }

      if (!hasScrolled) {
        // Chỉ set khi lần đầu tiên rời khỏi đầu trang
        setIsScrollingDown(true)
        setHasScrolled(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolled])
  const [loadingSearch, setLoadingSearch] = useState(false)

  const handleLoadingSearchClick = () => {
    setLoadingSearch(true)
    setTimeout(() => setLoadingSearch(false), 2000)
  }

  const order = useSelector((state) => state.order)
  return (
    <div className="text-text sm:pt-36 md:pt-35 lg:pt-35">
      <div
        className={`container-scroll bg-white h-[var(--navbar-height)] shadow-md flex ${
          isScrollingDown ? 'slide-down' : 'visible'
        }`}
      >
        <div className="container md:flex-nowrap w-full items-center flex justify-between gap-1 md:gap-3 lg:grid lg:gap-2 lg:grid-cols-[3fr_6fr_3fr]">
          <div className="flex gap-2 items-center transition-all duration-150">
            {children}

            <a
              href="/"
              className="logo-wrapper flex items-center shadow-md transition-all"
              title="IGA Nội Thất Thông Minh"
            >
              <img
                sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                src={logo}
                width={120}
                height={120}
                alt="logo IGA Nội Thất Thông Minh"
              />
            </a>
          </div>

          <div className="md:flex-1 hidden md:block w-full lg:order-none">
            <div className="md:w-full w-full">
              <div className="shadow-md flex h-auto rounded-full items-center relative border-2 border-gray-100 focus:border-pink-200 text-xl ">
                <select className=" flex-1 pl-4 py-5 border-0 text-2xl text-center focus:ring-transparent collection-options mr-4">
                  <option>Danh mục sản phẩm</option>
                  <option>Sản phẩm bán chạy</option>
                </select>

                <div className="flex-3 relative text-2xl ">
                  <InputComponent
                    type="search"
                    required=""
                    classInput={'w-[80%] h-full outline-none'}
                    placeholder="Tìm theo tên sản phẩm..."
                  />
                  <InputComponent type="hidden" name="type" value="product" />
                </div>
                <CustomButton
                  type="submit"
                  className="bg-primary px-10 cursor-pointer   text-white rounded-l-0 right-0 h-full flex absolute rounded-tr-full rounded-br-full  items-center"
                  isLoading={loadingSearch}
                  onClick={handleLoadingSearchClick}
                  leftIcon={<CiSearch size={20} />}
                ></CustomButton>
              </div>
            </div>
          </div>
          <div className="cart-card flex items-center ml-auto gap-0 relative">
            <Link
              to={user ? '/checkout' : '#'}
              // onClick={handleCartClick}
              className="flex items-center px-5 py-3 shadow-sm bg-border hover:bg-neutral-200 active:scale-95 transition-all pl-1 rounded-xl"
            >
              <span className="cart-announcement">{order?.orderItem?.length || 0}</span>
              <CustomButton
                className="flex w-full cursor-pointer h-full justify-between text-2xl items-center"
                leftIcon={<RiShoppingBag4Line className="mx-3" size={26} />}
              >
                Giỏ Hàng
              </CustomButton>
            </Link>
            <div
              onMouseEnter={() => setIsOpenUser(true)}
              className="relative sm:hidden mx-4 flex flex-1 items-center w-auto h-full"
            >
              {user ? (
                // Nếu có accessToken, hiển thị ảnh mặc định
                <div className="bg-white w-15 h-15 rounded-full mr-2 flex items-center justify-center overflow-hidden">
                  <img
                    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                    src={
                      user.image ||
                      'https://th.bing.com/th/id/OIP.dCpgPQ0i-xX2gZ-yonm54gHaHa?w=202&h=202&c=7&r=0&o=5&pid=1.7'
                    }
                    alt="User Avatar"
                    width={80}
                    height={80}
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                // Nếu chưa đăng nhập, hiển thị nút Account
                <img
                  sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                  src={
                    'https://th.bing.com/th/id/OIP.dCpgPQ0i-xX2gZ-yonm54gHaHa?w=202&h=202&c=7&r=0&o=5&pid=1.7'
                  }
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
              )}
              <ModalUser isOpen={isOpenUser} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[var(--header-bottom)] bg-primary hidden xl:flex items-center sub-header">
        <div onMouseLeave={() => setIsOpen(false)} className="container h-full relative">
          <div className="flex justify-between h-full items-center relative gap-2">
            <div className="navigation-header h-full gap-6 flex  relative w-full">
              <div
                onMouseLeave={() => setIsOpen(false)}
                className="flex items-center text-white cursor-pointer hover:text-sub-hover "
              >
                <div
                  onMouseEnter={() => setIsOpen(true)}
                  className="inline-flex h-full  gap-3 items-center  flex-row"
                >
                  {/* dùng map hoặc forEach để đư ra dữ liệu */}
                  <FaBars size={20} />
                  <a className="font-semibold text-2xl">
                    <span>Danh mục sản phẩm</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-10 text-white cursor-pointer">
                <div className="inline-flex items-center  flex-row gap-1  hover:text-sub-hover">
                  {/* dùng map hoặc forEach để đư ra dữ liệu */}
                  <Link
                    to={'/blogs'}
                    className="w-full h-full cursor-pointer  font-semibold text-2xl"
                  >
                    Blog
                  </Link>
                </div>
                <div className="inline-flex items-center  flex-row gap-1   hover:text-sub-hover">
                  {/* dùng map hoặc forEach để đư ra dữ liệu */}
                  <Link to="/products" className="w-full h-full cursor-pointer font-semibold">
                    <span className="w-full h-full font-semibold text-2xl">Products</span>
                  </Link>
                </div>
                <div className="inline-flex items-center  flex-row gap-1   hover:text-sub-hover">
                  {/* dùng map hoặc forEach để đư ra dữ liệu */}
                  <Link className="w-full h-full cursor-pointer font-semibold">
                    <span className="w-full h-full font-semibold text-2xl">Sản phẩm yêu thích</span>
                  </Link>
                </div>
                <div
                  onClick={() => {
                    const element = document.getElementById('location')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="inline-flex items-center  flex-row gap-1 hover:text-sub-hover"
                >
                  {/* dùng map hoặc forEach để đư ra dữ liệu */}
                  <CustomButton className="w-full h-full cursor-pointer font-semibold">
                    <span className="w-full h-full font-semibold text-2xl">Các điểm bán hàng</span>
                  </CustomButton>
                </div>
                <div className="inline-flex items-center  flex-row gap-1   hover:text-sub-hover">
                  {/* dùng map hoặc forEach để đư ra dữ liệu */}
                  <Link
                    to={user ? '/profile' : '#'}
                    onClick={(e) => {
                      if (!user) {
                        e.preventDefault() // Ngăn chặn điều hướng
                        toast.warning('Vui lòng đăng nhập để kiểm tra đơn hàng!', {
                          position: 'top-right',
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          theme: 'colored'
                        })
                      }
                    }}
                    className="w-full h-full cursor-pointer font-semibold"
                  >
                    <span className="w-full h-full font-semibold text-2xl">Kiểm tra đơn hàng</span>
                  </Link>
                </div>
              </div>
            </div>
            <div
              onMouseLeave={() => setIsOpenUser(false)}
              className="flex justify-between items-center"
            >
              <div className="min-h-[4.8rem] overflow-hidden ">
                <nav>{/* <NavigationCard /> */}</nav>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap ">
                <div
                  onMouseEnter={() => setIsOpenUser(true)}
                  className="relative flex items-center w-auto h-full"
                >
                  {user ? (
                    // Nếu có accessToken, hiển thị ảnh mặc định
                    <div className="bg-white w-15 h-15 rounded-full mr-2 flex items-center justify-center overflow-hidden">
                      <img
                        sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                        src={
                          user?.image ||
                          'https://th.bing.com/th/id/OIP.dCpgPQ0i-xX2gZ-yonm54gHaHa?w=202&h=202&c=7&r=0&o=5&pid=1.7'
                        }
                        alt="User Avatar"
                        width={80}
                        height={80}
                        className="object-cover rounded-full shadow-md"
                      />
                    </div>
                  ) : (
                    // Nếu chưa đăng nhập, hiển thị nút Account
                    <img
                      sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                      src={
                        'https://th.bing.com/th/id/OIP.dCpgPQ0i-xX2gZ-yonm54gHaHa?w=202&h=202&c=7&r=0&o=5&pid=1.7'
                      }
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    />
                  )}
                  <ModalUser isOpen={isOpenUser} />
                </div>
                {/* <CustomButton
                  className={
                    'text-black w-auto cursor-pointer button-hover pr-2 bg-white text-2xl h-14  rounded-sm flex items-center justify-between'
                  }
                  leftIcon={<MdOutlineSell className="ml-2" size={28} />}
                >
                  {' '}
                  Tư vấn thiết kế{' '}
                </CustomButton>
                <CustomButton
                  className={
                    'text-black w-auto cursor-pointer bg-white px-4 text-2xl h-14  rounded-sm flex items-center justify-between'
                  }
                  leftIcon={<FaPhoneAlt className="phone-icon text-button-2" size={20} />}
                >
                  {' '}
                  0395.757.650{' '}
                </CustomButton> */}
              </div>
            </div>
          </div>
          <div onMouseEnter={() => setIsOpen(true)} className="z-2 absolute w-full top-full">
            <Modal
              isOpen={isOpen}
              animation="fade-in"
              modalContent="flex flex-row bg-white border-1 border-gray-200 rounded-b-2xl relative"
            >
              <div className="bg-transparent overflow-hidden border-r-1 w-100 border-gray-200">
                <div className="bg-transparent">
                  {categoriesDirectory.map((directory) => (
                    <CustomButton
                      key={directory.id}
                      className="w-full py-6 flex text-2xl items-center justify-evenly px-3 text-left text-black font-bold hover:bg-[rgba(0,0,0,0.1)] border-b border-gray-200"
                      onMouseEnter={() => handleDirectoryHover(directory.id)}
                    >
                      <img
                        src={directory.img}
                        sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                        className="mr-2"
                        width={28}
                        alt=""
                      />
                      <span>{directory.name}</span>
                    </CustomButton>
                  ))}
                </div>
              </div>
              <CategoryByDirectory categoryByDirectory={categories} sizeImg={'w-26'} />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent
