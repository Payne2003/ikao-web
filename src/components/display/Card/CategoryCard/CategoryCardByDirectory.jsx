/* eslint-disable react/prop-types */
import Column from '@/components/common/Column/Column'

// eslint-disable-next-line react/prop-types
const CategoryCardByDirectory = ({ widthImg, category }) => {
  return (
    <div className="bg-white category-viewer min-w-[210px] rounded-lg shadow-sm py-4 w-[33%] md:w-[23%] cursor-pointer hover:shadow-md transition-shadow">
      <Column className="w-auto flex ml-4 relative" align="start" justify="center" gap={4}>
        <h3 className="text-black w-50 text-2xl py-4 ">
          {category?.name || 'Danh mục'}
        </h3>
        {category?.img && (
          <img
            sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
            src={category.img}
            className={`absolute ${widthImg} top-[-24px] right-0`}
            alt={category?.name || 'Danh mục'}
          />
        )}
      </Column>
    </div>
  )
}

export default CategoryCardByDirectory
