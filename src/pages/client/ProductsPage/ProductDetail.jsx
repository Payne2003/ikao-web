
import ProductApi from '@/api/ProductApi'
import ProductDetailComponent from '@/components/common/ProductDetail/ProductDetailComponent'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ProductDetail = () => {
  const location = useLocation()
  const ProductId = location.pathname.split('/').pop() // Lấy ID cuối cùng từ URL
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductApi.getProductById(ProductId);
        setProduct(response || []); // Đảm bảo không bị undefined
      } catch (error) {
        console.error("Error fetching products:", error);
        setProduct([]); // Đặt giá trị rỗng để tránh lỗi
      }
    };
  
    fetchProducts();
  }, [ProductId]);
  return (
      <ProductDetailComponent {...product} />
  )
}

export default ProductDetail
