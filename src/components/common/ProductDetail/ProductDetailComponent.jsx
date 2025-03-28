/* eslint-disable react-hooks/rules-of-hooks */
import SliderComponent from '@/components/common/Slider/SliderComponent'
import { CustomButton } from '@/components/common/Button/CustomButton'
import { TiTick } from 'react-icons/ti'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import imgBannerGiaohang from '@/assets/image/bannergiaohang.png'
import ProductGrid from '@/components/common/Grid/ProductGrid/ProductGrid'
import { CiHeart } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import RatingApi from '@/api/RatingApi'
import FavoritesApi from '@/api/FavoritesApi'
import { useNavigate } from 'react-router-dom'
import { addOrderProduct, updateOrderAsync } from '@/store/orderSlice'
import CommentListItem from '../Comment/CommentListItem'
import ProductApi from '@/api/ProductApi'
const ProductDetailComponent = (product) => {
  const [quantity, setQuantity] = useState(1)
  const [totalStars, setTotalStars] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)
  const [totalFavorites, setTotalFavorites] = useState(0)
  const [selectedImage, setSelectedImage] = useState()
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [sizes, setSizes] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [imgDefault, setImgDefault] = useState(null)
  // const [productlist, setProductList] = useState(null)
  // const [isLoading, setIsLoading] = useState(true)
  const accessToken = useSelector((state) => state.auth.accessToken || null)
  const user = useSelector((state) => state.auth.user)
  const fetchRating = useCallback(async () => {
    try {
      const { totalStars, ratingCount } = await RatingApi.getTotalRatingProductById(product.id)

      setTotalStars(totalStars)
      setRatingCount(ratingCount)
    } catch (error) {
      console.error('Lỗi khi lấy tổng đánh giá', error)
    }
  }, [product.id])
  useEffect(() => {
    if (product.image?.length > 0) {
      setImgDefault(product.image[0])
      setSelectedImage(product.image[0])
    }
    if (product.price > 0) {
      setSelectedPrice(product.price)
    }
  }, [product.image, product.price])

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { totalFavorites } = await FavoritesApi.getTotalFavoritesByProductId(product.id)
        setTotalFavorites(totalFavorites) // Cập nhật state
      } catch (error) {
        console.error('Lỗi khi lấy số lượt yêu thích:', error)
      }
    }

    fetchFavorites()
  }, [product.id])
  useEffect(() => {
    const fetchProductSize = async () => {
      if (!product?.id) return // Kiểm tra nếu product.id chưa có thì không gọi API

      try {
        const response = await ProductApi.getProductSizeById(product.id)
        setSizes(response.product_sizes || [])
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu kích thước:', error)
      }
    }

    fetchProductSize()
  }, [product?.id])

  useEffect(() => {
    fetchRating()
  }, [fetchRating])
  const averageRating = ratingCount > 0 ? (totalStars / ratingCount).toFixed(1) : '0'
  const handleAddToFavorites = async () => {
    if (user) {
      const date_now = new Date().toISOString()
      const result = await FavoritesApi.addFavorite(user?.id, product.id, date_now)

      if (result.error) {
        toast.error(result.error) // Hiển thị thông báo nếu đã yêu thích
        return
      }

      setTotalFavorites((prev) => prev + 1)
      toast.success('Sản phẩm đã được thêm vào yêu thích! 🎉')
    } else {
      toast.warning('Vui lòng đăng nhập để thêm vào yêu thích!') // 🔸 Thông báo trước
      setTimeout(() => {
        navigate('/login') // 🔸 Chuyển hướng sau khi thông báo hiển thị
      }, 500)
    }
  }
  const handleAddToCart = async () => {
    if (!accessToken || !user) {
      toast.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!')
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
      return
    } else {
      // 🔹 Lấy order từ localStorage
      const storedOrder = JSON.parse(localStorage.getItem(`order_${user.id}`))
      const order_id = storedOrder?.id || null // Nếu chưa có order, order_id = null

      dispatch(
        addOrderProduct({
          orderItem: {
            order_id,
            name: product?.description,
            quantity: quantity,
            image: product?.image[0],
            price: product?.price,
            product_id: product?.id
          }
        })
      )
      setTimeout(() => {
        const updateOrder = JSON.parse(localStorage.getItem(`order_${user.id}`))
        dispatch(updateOrderAsync(updateOrder))
      }, 300)
      toast.success('Thêm sản phẩm vào giỏ hàng thành công!', { position: 'top-right' })
    }
  }
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const productData = await ProductApi.getProductDetail()
  //       setProductList(productData)
  //     } catch (error) {
  //       console.error('Lỗi khi lấy sản phẩm:', error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchProduct()
  // }, [])
  const handleBuyNow = async () => {
    if (!accessToken || !user) {
      toast.warning('Vui lòng đăng nhập để mua hàng!')
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
      return
    }

    // 🔹 Lấy order từ localStorage
    const storedOrder = JSON.parse(localStorage.getItem(`order_${user.id}`))
    const order_id = storedOrder?.id || null

    // 🔹 Thêm sản phẩm vào giỏ hàng với quantity = 1
    dispatch(
      addOrderProduct({
        order_id,
        orderItem: {
          name: product?.description,
          quantity: 1, // Mua ngay -> số lượng luôn là 1
          image: product?.image[0],
          price: product?.price,
          product_id: product?.id
        }
      })
    )
    window.location.href = '/checkout'
    setTimeout(() => {
      const updateOrder = JSON.parse(localStorage.getItem(`order_${user.id}`))
      dispatch(updateOrderAsync(updateOrder)) // Đợi 0.5s để cập nhật giỏ hàng trước khi chuyển trang
    }, 300)
    toast.success('Sản phẩm đã được thêm, chuyển hướng đến thanh toán...', {
      position: 'top-right'
    })
  }
  console.log(user)
  return (
    <div className="w-full h-auto">
      <div className="w-full grid grid-cols-1 sm:flex-row sm:grid-cols-4 auto-rows-auto sm:py-10 gap-6">
        <div className="flex relative gap-4 flex-col col-span-1 row-span-2 sm:row-span-4 w-full h-auto">
          <div className="w-full">
            {/* Ảnh sản phẩm */}
            <img
              sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
              src={selectedImage}
              alt="Product Image"
              className="w-full h-full rounded-2xl shadow-sm object-cover"
            />
          </div>
          <div className="w-full sm:hidden flex col-span-1 row-span-1 ">
            <CustomButton className="w-[32.2%] bg-transparent flex items-center justify-center py-4 text-2xl">
              Mô tả
            </CustomButton>
            <CustomButton className="w-[32.2%] bg-transparent flex items-center justify-center py-4 text-2xl">
              Nhận xét
            </CustomButton>
            <CustomButton className="w-[32.2%] bg-transparent flex items-center justify-center py-4 text-2xl">
              Liên hệ
            </CustomButton>
          </div>
          <div className="w-full rounded-2xl shadow-sm col-span-1 row-span-1 h-[108px]">
            <SliderComponent
              slidesPerView={3}
              classImg={'w-[98%] h-full'}
              arr={Array.isArray(product.image) ? product.image : []}
            />
          </div>
          <div className="absolute top-2 right-4 bg-red-500 text-white text-2xl font-bold px-6 py-2 rounded-full flex items-center gap-1 shadow-xl">
            <CiHeart size={20} className="text-white mr-2" />
            {totalFavorites}
          </div>
        </div>
        <div className=" p-6 rounded-2xl shadow-sm gap-4 bg-white flex  col-span-1 flex-col sm:justify-between sm:col-span-3">
          <div className="flex flex-col w-full">
            <h2 className="text-4xl pb-6 font-bold">
              {/* Tủ rượu bằng gỗ kết hợp kính sang trọng GHS-51864 */}
              {product?.name}
            </h2>

            {/* <p className="text-3xl pt-10 font-semibold text-button">5,500,000₫</p>
          <p className="text-text text-xl">Tình trạng tồn kho: Còn hàng</p> */}
          </div>
          <div className="flex justify-between items-center">
            <div>
              {' '}
              <p className="text-text flex gap-2 items-center text-2xl">
                <span>Mã sản phẩm: </span>
                {/* GHS 51864 */}
                {product?.id}
              </p>
              <div className="w-[100%] hidden sm:flex items-center ">
                {' '}
                <p className="text-xl font-bold">Xem thêm: </p>{' '}
                <a className="text-xl " href="#">
                  Tủ rượu
                </a>{' '}
              </div>
            </div>
            <div className="mr-5 flex flex-col items-center">
              <div className="flex justify-between mt-[-2px] items-center text-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={clsx(
                      'text-5xl',
                      i < Math.round(averageRating) ? 'text-yellow-300' : 'text-gray-300'
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>
              <h2 className="hidden sm:flex">Xem {ratingCount} đánh giá gần đây</h2>
            </div>
          </div>
        </div>
        <div className="p-6 flex rounded-2xl shadow-sm gap-4 bg-white justify-between w-full flex-col h-auto items-start sm:col-span-2 sm:row-span-2">
          <div>
            <p className="text-3xl py-6 font-semibold text-button">
              {new Intl.NumberFormat('vi-VN').format(selectedPrice)}₫
            </p>
          </div>
          <div className="">
            <span className="text-2xl py-2  text-text">Kích thước</span>
            <div className="w-full py-4">
              {sizes.map((size) => (
                <CustomButton
                  key={size.product_sizes_id}
                  className="px-2 h-auto sm:text-xl text-2xl border border-hover mr-3"
                  onClick={() => {
                    setSelectedImage(size.img)
                    setSelectedPrice(size.price) // Cập nhật giá theo kích thước
                  }}
                >
                  {size.name}
                </CustomButton>
              ))}
            </div>
          </div>
          <p className="py-2 hidden sm:flex text-text text-xl">
            {product.stock > 0 ? 'Tình trạng tồn kho: Còn hàng' : 'Tình trạng tồn kho: Hết hàng'}
          </p>
          <div className=" flex col-span-1 gap-2">
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border text-2xl w-[10%] sm:w-[26%] sm:h-full rounded-lg text-black text-center"
            />
            <CustomButton
              onClick={handleAddToCart}
              className="bg-primary ml-1 text-xl sm:text-2xl hover:bg-hover sm:w-full w-60 flex justify-center items-center h-16 px-10 text-white rounded-lg"
            >
              Thêm vào giỏ
            </CustomButton>

            <CustomButton
              onClick={handleBuyNow}
              className="sm:w-full w-60 bg-primary text-xl sm:text-2xl hover:bg-hover flex justify-center items-center text-white h-16 px-14 rounded-lg ml-2"
            >
              Mua ngay
            </CustomButton>

            <CustomButton
              leftIcon={
                <CiHeart
                  className=" hidden sm:flex w-40 text-2xl text-black hover:text-button   rounded-lg"
                  onClick={handleAddToFavorites}
                  size={20}
                />
              }
              className=" flex justify-center items-center"
            />
          </div>
        </div>
        <div className="w-full bg-gray-200 shadow-sm border border-gray-300 px-8 rounded-2xl hidden sm:flex flex-col h-auto items-start sm:col-span-2 sm:row-span-2">
          <div className="w-full">
            <p className="text-2xl  py-6 font-semibold border-b-gray-400 border-b-1 text-black">
              XƯỞNG NỘI THẤT GỖ TRANG TRÍ - SINCE 2014
            </p>
          </div>
          <div className="text-md py-4">
            <p className="flex items-center">
              <TiTick className="text-hover text-2xl" />
              Trực tiếp làm tại Hà Nội, HCM & Đà Nẵng, có xe giao hàng của cty
            </p>
            <p className="flex items-center">
              <TiTick className="text-hover text-2xl" />
              Miễn phí vận chuyển hầu hết các quận tại Hà Nội, HCM, Đà Nẵng, Huế,Hội An , Hải Phòng,
              Bình Dương, Đồng Nai, Long An...
            </p>
            <p className="flex items-center">
              <TiTick className="text-hover text-2xl" />
              May đo theo yêu cầu của khách hàng - miễn phí thiết kế 3D
            </p>
            <p className="flex items-center">
              <TiTick className="text-hover text-2xl" />
              Chất liệu đa dạng, mdf lõi xanh, venner, sồi tự nhiên, có làm hàng sơn
            </p>
          </div>
        </div>
      </div>
      <div className="w-[98%] sm:hidden ml-3 items-center rounded-2xl bg-yellow-300 flex gap-2 my-6 py-3 px-2">
        {' '}
        <p className="ml-2 text-2xl font-bold">Xem thêm: </p>{' '}
        <a className="text-2xl hover:text-hover" href="#">
          Tủ rượu
        </a>{' '}
      </div>
      <ProductGrid display="hidden" initialLimit={10} />
      <div className="flex flex-col w-full h-auto">
        <div className="py-10">
          <img
            sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
            className="w-auto h-auto "
            src={imgBannerGiaohang}
            alt="banner giao hàng"
          />
        </div>
        <div className="py-10">
          <h2 className="font-bold text-5xl sm:text-6xl text-center">{product.name}</h2>
        </div>
        <div className="py-10">
          <p className="text-2xl sm:text-3xl text-center">
            <span className="font-bold">{product.name}</span> {product.description}
          </p>
        </div>
        <div className="h-auto flex flex-col items-center">
          <img
            className="w-full h-full rounded-2xl shadow-sm"
            sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
            src={imgDefault}
            alt="Product img"
          />
          <p className="italic text-xl py-2">kích thước nhỏ gọn của {product.name}</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto p-10  rounded-lg">
        <h2 className="text-5xl font-bold text-center mb-4">THÔNG SỐ KỸ THUẬT</h2>
        <table className="w-full text-xl border border-gray-300">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="p-6 font-semibold">Màu sắc</td>
              <td className="p-6">Khách hàng có thể tùy ý lựa chọn vân gỗ và màu cho sản phẩm</td>
            </tr>
            <tr className="border-b border-gray-300 bg-gray-100">
              <td className="p-6 font-semibold">Chất liệu</td>
              <td className="p-6">Gỗ MDF lõi xanh phủ melamine vân gỗ kết hợp màu</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-6 font-semibold">Kích thước</td>
              <td className="p-6">
                <ul className="list-none pl-5">
                  <li>Tủ quần áo: 120x40x190</li>
                  <li>Tủ đỉnh: 120x40x40 cm</li>
                  <li>Khách hàng có thể yêu cầu tùy chỉnh kích thước sản phẩm theo ý muốn</li>
                </ul>
              </td>
            </tr>
            <tr className="border-b border-gray-300 bg-gray-100">
              <td className="p-6 font-semibold">Bảo hành</td>
              <td className="p-6">12 tháng</td>
            </tr>
            <tr>
              <td className="p-6 font-semibold">Giao hàng</td>
              <td className="p-6">5 đến 7 ngày sau khi đặt hàng</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className=" w-full flex flex-col gap-4 h-auto py-18">
        <div className="flex py-10">
          {/* Phần hiển thị điểm trung bình */}
          <div className="flex flex-1 gap-4 justify-center items-center text-4xl font-extrabold flex-col">
            <p>Đánh giá trung bình</p>
            <span className="text-8xl text-button">4.8/5</span>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <button key={index} className={`text-3xl text-yellow-500`}>
                  ★
                </button>
              ))}
            </div>
            <span className="text-text text-2xl">(4 nhận xét)</span>
          </div>

          {/* Phần hiển thị tỷ lệ đánh giá */}
          <div className="flex flex-1 justify-center items-center flex-col gap-6">
            {[5, 4, 3, 2, 1].map((star) => {
              const percentage = star === 5 ? 75 : star === 4 ? 25 : 0 // Tùy chỉnh dữ liệu
              return (
                <div key={star} className="flex items-center w-full">
                  <span className="w-auto text-xl font-semibold">{star} ★</span>
                  <div className="flex-1 h-3 bg-gray-300 rounded-full overflow-hidden mx-2">
                    <div className="h-full bg-green-500 " style={{ width: `${percentage}%` }}></div>
                  </div>
                  <span className="w-10 text-xl font-semibold">{percentage}%</span>
                </div>
              )
            })}
          </div>
        </div>

        <h2 className="text-5xl font-extrabold bg-white rounded-2xl shadow-md p-4">
          <span className="p-4">GỬI NHẬN XÉT CỦA BẠN</span>
        </h2>
        <div className="w-full flex flex-col">
          <CommentListItem productId={product?.id} user={user} />
        </div>
      </div>
    </div>
  )
}
export default ProductDetailComponent
