import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { CustomButton } from '@/components/common/Button/CustomButton'
import { IoMdClose } from 'react-icons/io'

const ImageGalleryModal = ({ isOpen, onClose, images, initialIndex = 0 }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  const modalRoot = document.getElementById('modal-root')

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(initialIndex)
      document.body.style.overflow = 'hidden' // Ngăn cuộn trang khi mở modal
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, initialIndex])

  if (!isOpen || !modalRoot) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-80 flex items-center justify-center z-[9999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Khi bấm ngoài modal, đóng modal
      >
        <motion.div
          className="bg-white rounded-xl shadow-lg h-auto w-auto max-w-5xl relative flex"
          initial={{ y: -50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -50, opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()} // Ngăn đóng modal khi bấm vào ảnh
        >
          {/* Nút đóng modal */}
          <CustomButton
            className="absolute top-0 right-0 flex justify-center items-center text-white bg-bg-tran w-20 h-20 rounded-full hover:text-red-500"
            onClick={onClose}
          >
            <IoMdClose size={30} />
          </CustomButton>

          {/* Ảnh lớn bên trái */}
          <div className="w-[70%] p-4 flex justify-center items-center">
            <img
              src={images[selectedIndex]}
              alt="Selected"
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
            />
          </div>

          {/* Danh sách ảnh nhỏ bên phải */}
          <div className="w-[30%] p-4 overflow-y-auto max-h-[80vh] flex flex-col gap-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`cursor-pointer w-full h-20 object-cover rounded-lg border-2 ${
                  index === selectedIndex ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalRoot
  )
}

ImageGalleryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialIndex: PropTypes.number
}

export default ImageGalleryModal
