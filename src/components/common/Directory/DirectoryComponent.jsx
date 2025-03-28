import CategoriesApi from '@/api/CategoriesApi'
import { CustomButton } from '@/components/common/Button/CustomButton'
import { useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
export function DirectoryComponent({ className = '' }) {
  const [categoriesDirectory, setCategoriesDirectory] = useState([])

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

  return (
    <div className={` max-w-[200px] bg-transparent overflow-hidden :f ${className}`}>
      <div className="bg-transparent ">
        {categoriesDirectory.map((directory) => (
          <CustomButton
            key={directory.id}
            className="w-full py-6 flex text-2xl items-center justify-evenly px-3 text-left text-black font-bold hover:text-black hover:bg-[rgba(0,0,0,0.1)] border-b border-gray-200"
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
  )
}
