/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import CategoryCard from '@/components/display/Card/CategoryCard/CategoryCard'
import ProductCard from '@/components/display/Card/ProductCard/ProductCard'
import { CustomButton } from '@/components/common/Button/CustomButton'
import ProductApi from '@/api/ProductApi'
import CategoriesApi from '@/api/CategoriesApi'

// eslint-disable-next-line react/prop-types
const ProductGrid = ({ initialLimit, className = '', display }) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [visibleCount, setVisibleCount] = useState(initialLimit)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoriesApi.getParentCategories()
        setCategories(data)
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error)
      }
    }
    fetchCategories()
  }, [])

  // Lấy sản phẩm theo danh mục
  const handleCategoryChange = useCallback(async (id) => {
    try {
      setSelectedCategory(id) // Cập nhật danh mục được chọn
      setLoading(true)
      const data = await ProductApi.getAllProductsByCategory(id) // Lấy sản phẩm theo danh mục
      setProducts(data)
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm theo danh mục:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleAllProducts = async () => {
    try {
      setSelectedCategory('all') // Cập nhật trạng thái nút "Tất cả" đang chọn
      setLoading(true)
      const data = await ProductApi.getAllProducts() // Lấy tất cả sản phẩm
      setProducts(data)
    } catch (error) {
      console.error('Lỗi khi lấy tất cả sản phẩm:', error)
    } finally {
      setLoading(false)
    }
  }

  // Khi vào trang chỉ lấy toàn bộ sản phẩm
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true)
        const data = await ProductApi.getAllProducts() // Chỉ lấy toàn bộ sản phẩm
        setProducts(data)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllProducts()
  }, []) // Chạy 1 lần khi vào trang

  const toggleProductView = () => {
    if (visibleCount >= products.length) {
      setVisibleCount(initialLimit)
    } else {
      setVisibleCount((prev) => Math.min(prev + 10, products.length))
    }
  }
  const [minPrice, setMinPrice] = useState(1700000)
  const [maxPrice, setMaxPrice] = useState(13100000)

  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value)
    if (value < maxPrice) setMinPrice(value)
  }

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value)
    if (value > minPrice) setMaxPrice(value)
  }
  return (
    <div className={`h-auto w-full flex flex-col gap-6 mt-4 overflow-hidden ${className}`}>
      <div
        className={clsx(
          `bg-white rounded-2xl p-10 shadow-sm text-center flex justify-center ${display} font-bold w-full h-auto`
        )}
      >
        <div className="flex justify-between items-center w-full">
          {/* Thanh trượt giá */}
          <div className="flex flex-col items-center w-full max-w-md">
            <input
              type="range"
              min="1700000"
              max="13100000"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="w-full appearance-none bg-hover h-2 rounded-lg"
            />
            <div className="flex justify-between w-full text-primary text-xl mt-2">
              <span>{minPrice.toLocaleString('vi-VN')}đ</span>
              <span>{maxPrice.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>

          {/* Bộ lọc sắp xếp */}
          <select className="bg-white shadow-sm  p-4 rounded-sm text-xl">
            <option value="highest">Đánh giá cao nhất</option>
            <option value="lowest">Giá thấp nhất</option>
            <option value="highest-price">Giá cao nhất</option>
          </select>
        </div>
      </div>

      <ul
        className="hidden bg-white  rounded-2xl shadow-sm  sm:flex gap-4 p-4 justify-between items-center pb-2 overflow-x-auto whitespace-nowrap  scrollbar-hide"
        style={{ display: 'flex', flexWrap: 'nowrap' }}
      >
        {/* Nút "Tất cả" */}
        <li>
          <CustomButton
            onClick={handleAllProducts}
            className={`cursor-pointer hidden sm:flex items-center h-full text-3xl rounded-sm 
      ${selectedCategory === 'all' ? 'text-hover' : 'text-text'}`}
          >
            Tất cả
          </CustomButton>
        </li>

        {/* Danh mục còn lại */}
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            {...category}
            onClick={() => handleCategoryChange(category.id)}
            isSelected={selectedCategory === category.id}
          />
        ))}
      </ul>

      {/* Hiển thị danh sách sản phẩm */}
      <div className="max-w-[1200px] flex h-auto">
        <div className="w-full flex box-border justify-start gap-4 sm:gap-7 md:gap-6 lg:gap-[13px] flex-wrap">
          {loading ? (
            <p className="text-center w-full text-gray-500">Đang tải sản phẩm...</p>
          ) : products.length > 0 ? (
            products
              .slice(0, visibleCount)
              .map((product) => <ProductCard key={product.id} product={product} {...product} />)
          ) : (
            <p className=" flex justify-center items-center text-3xl font-bold h-200 w-full text-gray-500">
              Không có sản phẩm nào.
            </p>
          )}
        </div>
      </div>

      {/* Nút hiển thị thêm / thu gọn */}
      {selectedCategory === 'all' && (
        <div className="flex justify-center mt-6">
          <CustomButton
            onClick={toggleProductView}
            className="px-10 py-4 border-2 cursor-pointer text-2xl border-primary bg-transparent text-primary hover:bg-primary hover:text-white rounded-4xl transition-all"
          >
            {visibleCount >= products.length ? 'Thu gọn' : 'Hiển thị thêm'}
          </CustomButton>
        </div>
      )}

      {/* Nút khám phá tất cả */}
      {selectedCategory !== 'all' && (
        <div className="flex justify-center h-auto py-20">
          <CustomButton
            onClick={handleAllProducts}
            className=" cursor-pointer bg-white text-text text-xl w-60 h-16 rounded-full shadow-sm hover:shadow-md hover:text-hover transition-shadow"
          >
            Khám phá tất cả
          </CustomButton>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
