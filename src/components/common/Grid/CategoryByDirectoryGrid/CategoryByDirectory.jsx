/* eslint-disable react/prop-types */
import CategoryCardByDirectory from '@/components/display/Card/CategoryCard/CategoryCardByDirectory'

const CategoryByDirectory = ({ sizeImg, categoryByDirectory = [] }) => {
  return (
      <div className="w-full flex mt-6 h-full px-4 ">
        <div className="row-viewer flex gap-6 flex-wrap col-span-5 row-span-3 justify-start ">
          {categoryByDirectory.map((category) => (
            <CategoryCardByDirectory
              key={category.id} // Giả sử mỗi danh mục có một `id`
              widthImg={sizeImg}
              category={category} // Truyền dữ liệu danh mục vào component
            />
          ))}
        </div>
      </div>
  )
}

export default CategoryByDirectory
