import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { useState } from 'react'
import ImageGalleryModal from '@/components/common/Modal/Img/ImageGalleryModal'
// eslint-disable-next-line react/prop-types
const SliderComponent = ({ arr, slidesPerView = 1, classImg = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };
  return (
    <div className="relative z-0 sm:m-0 w-full rounded-3xl h-full group">
      {/* Nút điều hướng */}
      <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-2 cursor-pointer text-white bg-transparent bg-opacity-50 p-2 border border-white rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300">
        <FaAngleLeft size={30} />
      </div>
      <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-2 cursor-pointer text-white bg-transparent bg-opacity-50 p-2 border border-white rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
        <FaAngleRight size={30} />
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom'
        }}
        slidesPerView={slidesPerView}
        slidesPerGroup={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        lazyPreloadPrevNext={1} // Tải trước ảnh kế tiếp
        className="w-full h-full rounded-2xl"
        breakpoints={{
          0: { pagination: false },
          640: { pagination: { clickable: true } }
        }}
      >
        {arr.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center rounded-2xl">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={`${classImg} transition-transform duration-500 ease-in-out hover:scale-105`}
              onClick={() => openModal(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
       {/* Modal hiển thị ảnh */}
       <ImageGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={arr}
        initialIndex={selectedImageIndex}
      />
    </div>
  )
}
SliderComponent.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default SliderComponent
