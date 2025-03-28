import ImgBlog from '../../../../assets/image/imageblog2.png'
// eslint-disable-next-line react/prop-types
const BlogCard = ({ name }) => {
  return (
      <div>
        <div className="w-full relative">
          <img
            sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
            src={ImgBlog}
            alt="Blog"
            width={180}
            height={180}
            className='w-103 h-40 sm:w-56 sm:h-30 lg:w-80 xl:w-90 md:w-58 md:h-38 transition-transform duration-500 ease-in-out hover:scale-105'
          />
          <span className="absolute text-3xl text-white font-bold left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
            {name}
          </span>
        </div>
      </div>
  )
}

export default BlogCard
