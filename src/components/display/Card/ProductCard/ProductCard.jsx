import clsx from 'clsx'
import { Link } from 'react-router-dom'
import Row from '@/components/common/Row/Row'
import { CustomButton } from '@/components/common/Button/CustomButton'
import { useCallback, useEffect, useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import CategoriesApi from '@/api/CategoriesApi'
import RatingApi from '@/api/RatingApi'
import FavoritesApi from '@/api/FavoritesApi'

const ProductCard = ({
  // eslint-disable-next-line react/prop-types
  id,
  // eslint-disable-next-line react/prop-types
  name = 'sản phẩm',
  // eslint-disable-next-line react/prop-types
  image = [],
  // eslint-disable-next-line react/prop-types
  description = '',
  // eslint-disable-next-line react/prop-types
  price = 11231023,
  // eslint-disable-next-line react/prop-types
  category_id
}) => {
  const [categories, setCategories] = useState([])
  const [totalStars, setTotalStars] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)
  const [totalFavorites, setTotalFavorites] = useState(0) // Thêm state lưu số lượt yêu thích

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Cuộn lên đầu trang với hiệu ứng mượt
  }

  // Fetch danh mục sản phẩm
  useEffect(() => {
    const fetchCategories = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await CategoriesApi.getCategoryById(category_id)
        setCategories(response)
      } catch (error) {
        throw error
      }
    }

    fetchCategories()
  }, [category_id])

  // Fetch số sao đánh giá
  const fetchRating = useCallback(async () => {
    try {
      const { totalStars, ratingCount } = await RatingApi.getTotalRatingProductById(id)

      setTotalStars(totalStars)
      setRatingCount(ratingCount)
    } catch (error) {
      console.error('Lỗi khi lấy tổng đánh giá:', error)
      throw error
    }
  }, [id])

  useEffect(() => {
    fetchRating()
  }, [fetchRating])

  // Fetch số lượt yêu thích
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { totalFavorites } = await FavoritesApi.getTotalFavoritesByProductId(id)
        setTotalFavorites(totalFavorites) // Cập nhật state
      } catch (error) {
        console.error('Lỗi khi lấy số lượt yêu thích:', error)
        throw error
      }
    }

    fetchFavorites()
  }, [id])

  // Tính trung bình số sao (làm tròn 1 số thập phân)
  const averageRating = ratingCount > 0 ? (totalStars / ratingCount).toFixed(1) : '0'

  return (
    <div className="cursor-pointer xl:w-[19%] lg:w-[24%] w-[48.7%] md:w-[31.99999%] relative group rounded-2xl  bg-white shadow-md hover:rounded-b-none hover:shadow-lg select-none">
      <div className=" flex flex-col justify-between  transition-all">
        {/* Hình ảnh sản phẩm */}
        <Link
          to={`/products/${categories?.name?.replace(/\s+/g, '-') || 'unknown'}/${name.replace(
            /\s+/g,
            '-'
          )}/${id}`}
          onClick={handleScrollToTop} // Gọi hàm khi nhấn vào sản phẩm
        >
          <div className="w-full h-[200px] md:h-[280px] lg:h-[260px] xl:h-[220px] overflow-hidden rounded-t-2xl relative">
            {/* Ảnh chính */}
            <img
              src={image[0]}
              alt={description}
              className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            />
            {/* Ảnh hover */}
            {image[1] && (
              <img
                src={image[1]}
                alt={description}
                className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
              />
            )}
          </div>
        </Link>
        {/* Tiêu đề sản phẩm */}
        <h3 className=" h-auto mt-8 text-text text-xl px-5 w-full line-clamp-2 font-bold">
          {description}
        </h3>

        {/* Xếp hạng sao */}
        <Row justify="start" className="mt-1 ml-5">
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
        </Row>

        {/* Giá sản phẩm */}
        <p className="w-auto pb-4 pl-5 text-3xl text-button-2 font-bold mt-1 text-left">
          {price?.toLocaleString('vi-VN')}đ
        </p>
        {/* Phần mở rộng chứa button */}
        <div className="h-0 opacity-0 overflow-hidden absolute w-full top-full transition-all duration-700 ease-in-out group-hover:h-[38px] group-hover:opacity-100 bg-white rounded-b-2xl z-2 shadow-md transform group-hover:translate-y-0 translate-y-5">
          <CustomButton className="cursor-pointer flex items-center justify-between w-full h-full text-left pl-5 text-xl font-bold text-white bg-primary rounded-b-2xl">
            Giao hàng lấy ngay
            <img
              className="w-10 text-white mr-4"
              sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
              decoding="async"
              src="https://gotrangtri.vn/wp-content/plugins/dln-product/assets/images/free-shipping.png"
              alt="Giao hàng miễn phí"
            />
          </CustomButton>
        </div>
      </div>
      <div className="absolute top-2  right-4 bg-red-500 special text-white text-2xl font-bold px-6 py-2 rounded-full flex items-center gap-1 shadow-2xl">
        <CiHeart size={20} className="text-white mr-2" />
        {totalFavorites}
      </div>
    </div>
  )
}

export default ProductCard
