import { CustomButton } from '@/components/common/Button/CustomButton'

// eslint-disable-next-line react/prop-types
const CategoryCard = ({ id, name, onClick }) => {
  return (
    <li className="active">
      <CustomButton
        key={id}
        onClick={() => onClick(id)} // Gọi khi click
        className="hidden sm:flex cursor-pointer px-3 py-8 text-3xl hover:text-hover bg-transparent text-text rounded"
      >
        {name}
      </CustomButton>
    </li>
  )
}

export default CategoryCard
