import Column from "../../common/Column/Column"
// eslint-disable-next-line react/prop-types
const ViewerCategoryCard = ({ title, viewCount = 0, onClick }) => {
    return (
      <div
        className="bg-white category-viewer rounded-lg shadow-sm py-3 lg:w-[19.2%] w-[48.2%] md:w-[31.99999%] cursor-pointer hover:shadow-md transition-shadow"
        onClick={onClick}
      >
        <Column className="w-auto flex ml-4" align="start" justify="center" gap={4}>
          <h3 className="text-black w-full text-2xl ">{title}</h3>
          <p className="text-xl text-text">{viewCount.toLocaleString()} lượt xem</p>
        </Column>
      </div>
    )
  }
  
  export default ViewerCategoryCard