
import PostGrid from '../../../components/common/Grid/PostGrid/PostGrid'
import ProductGrid from '../../../components/common/Grid/ProductGrid/ProductGrid'

const ProductsPage = () => {
  return (
    <section className="grid sm:grid-rows-[auto_auto] md:grid-rows-[auto_auto] lg:grid-rows-[auto_auto] bg-gray-100">
      <ProductGrid display="flex" initialLimit={20} />
      <h2 className='text-3xl text-black py-10 w-full font-bold '>Bài viết liên quan</h2>
      <PostGrid initialLimit={2} colGrid={1} layout="row" />
    </section>
  )
}

export default ProductsPage
