import clsx from 'clsx'

// eslint-disable-next-line react/prop-types
const PostCard = ({
  // eslint-disable-next-line react/prop-types
  layout = 'row',
  // eslint-disable-next-line react/prop-types
  src = '',
  // eslint-disable-next-line react/prop-types
  date = '10-10-2023',
  // eslint-disable-next-line react/prop-types
  name,
  // eslint-disable-next-line react/prop-types
  description,
  // eslint-disable-next-line react/prop-types
  heading
}) => {
  return (
    <div
      className={clsx(
        'bg-white  cursor-pointer shadow-md rounded-4xl overflow-hidden hover:shadow-lg transition-shadow',
        layout === 'row' ? 'flex flex-row items-center gap-4' : 'flex flex-col'
      )}
    >
      {/* Image */}
      <div
        className={clsx(
          'overflow-hidden',
          layout === 'row'
            ? 'w-[120px] h-[120px] sm:w-[180px] sm:h-[140px] md:w-[200px] md:h-[160px]'
            : 'w-full'
        )}
      >
        <img
          sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
          src={src}
          alt="Blog"
          width={800}
          height={100}
          className={clsx(
            'h-full object-cover transition-transform duration-300 hover:scale-105',
            layout === 'col' && 'aspect-[6/3]'
          )}
        />
      </div>

      {/* Content */}
      <div
        className={clsx(
          'py-4 h-full flex-1 flex flex-col justify-start items-start gap-2',
          layout === 'row' ? 'px-4' : 'px-6'
        )}
      >
        <h2 className="text-2xl sm:text-4xl md:text-4xl font-bold line-clamp-2 leading-15 text-black hover:text-hover transition-colors">
          {heading}
        </h2>

        <p className="text-text font-medium text-xl sm:text-2xl md:text-3xl">
          <span>{date}</span> - <span>{name}</span>
        </p>

        <p className="text-gray-500 line-clamp-3 text-xl sm:text-2xl md:text-3xl">{description}</p>
      </div>
    </div>
  )
}

export default PostCard
