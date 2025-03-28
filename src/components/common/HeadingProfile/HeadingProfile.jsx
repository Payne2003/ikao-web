// eslint-disable-next-line react/prop-types
const HeadingProfile = ({ title }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow-md rounded-2xl w-full mb-6 h-30">
      <span className="text-5xl ml-6 font-bold text-hover">{title}</span>
    </div>
  )
}

export default HeadingProfile
