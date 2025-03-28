import CustomBanner from '@/components/common/Banner/CustomBanner'
import ProductGrid from '@/components/common/Grid/ProductGrid/ProductGrid'
import TrendsGrid from '@/components/common/Grid/TrendsGrid/TrendsGrid'
import { Suspense } from 'react'

const HomePage = () => {
  return (
    <section className="grid sm:grid-rows-[auto_auto_auto] md:grid-rows-[auto_auto_auto] lg:grid-rows-[auto_auto_auto] bg-gray-100">
      <CustomBanner />
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductGrid display={'hidden'} initialLimit={10} />
      </Suspense>
      <Suspense fallback={<div>Loading trends...</div>}>
        <TrendsGrid />
      </Suspense>
    </section>
  )
}

export default HomePage
