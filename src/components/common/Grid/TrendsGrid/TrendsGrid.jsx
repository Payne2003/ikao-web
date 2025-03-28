
import Grid from '@/components/common/Grid/Grid'
import Row from '@/components/common/Row/Row'
import ViewerCategoryCard from '@/components/display/ViewerCategoryCard/ViewerCategoryCard'
import { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import { motion } from 'framer-motion'

const TrendsGrid = () => {
  const [categories, setCategory] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 10

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error('Error fetching products:', err))
  }, [])

  // Lấy dữ liệu cho trang hiện tại
  const offset = currentPage * itemsPerPage
  const currentItems = categories.slice(offset, offset + itemsPerPage)
  const pageCount = Math.ceil(categories.length / itemsPerPage)

  // Xử lý khi chuyển trang
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <div className="h-auto pt-20">
      <div className="flex justify-center flex-col items-center">
        <h2 className="text-6xl text-center font-bold px-10 py-10">Xu hướng mua sắm</h2>
      </div>

      {/* Danh sách categories có animation */}
      <motion.div
        key={currentPage} // Khi currentPage thay đổi, motion.div sẽ re-render với animation
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Grid rows={5} cols={3} gap={4} className="w-full h-auto">
          <Row justify="between" className="row-viewer flex-wrap col-span-5 row-span-3">
            {currentItems.map((category, index) => (
              <ViewerCategoryCard
                key={index}
                title={category.name}
                viewCount={10}
                onClick={() => console.log(`Clicked ${category.name}`)}
              />
            ))}
          </Row>
        </Grid>
      </motion.div>

      {/* Phân trang */}
      <div className="flex justify-center items-center mt-10">
        <ReactPaginate
          previousLabel={<FaAngleLeft />}
          nextLabel={<FaAngleRight />}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'flex items-center space-x-2'}
          pageClassName={
            'relative w-20 shadow-sm h-20 rounded-full overflow-hidden cursor-pointer hover:bg-hover'
          }
          pageLinkClassName={'w-full shadow-sm text-xl h-full flex justify-center items-center'}
          activeClassName={'bg-primary shadow-sm text-white'}
          previousClassName={
            'w-20 h-20 rounded-full shadow-sm flex justify-center items-center text-xl bg-white hover:bg-hover cursor-pointer'
          }
          previousLinkClassName={'w-full h-full rounded-full shadow-sm flex  justify-center items-center'}
          nextClassName={
            'w-20 h-20 rounded-full flex justify-center shadow-sm items-center text-xl bg-white hover:bg-hover cursor-pointer'
          }
          nextLinkClassName={'w-full h-full flex justify-center rounded-full items-center'}
          disabledClassName={'opacity-50 cursor-not-allowed'}
        />
      </div>
    </div>
  )
}

export default TrendsGrid
