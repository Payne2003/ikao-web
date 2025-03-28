/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  isOpen,
  onClose,
  title = "",
  content = "",
  buttons = [],
  type = "default", 
}) {
  // Đóng modal khi bấm ra ngoài
  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="modal-overlay"
          className="fixed inset-0 bg-[rgba(0,0,0,0.3)] bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg h-auto w-auto max-w-full relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tiêu đề */}
            {title && <h2 className="text-3xl p-8 font-semibold mb-4">{title}</h2>}

            {/* Nội dung */}
            <div className="p-8 pt-0 text-2xl">
              {type === "loading" ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
                </div>
              ) : (
                content
              )}
            </div>

            {/* Nút hành động */}
            <div className="flex justify-end  pt-0 p-8 gap-4">
              {type === "confirmation" && (
                <button
                  className="px-8 py-4 text-xl bg-gray-300 text-black rounded-lg"
                  onClick={onClose}
                >
                  Hủy
                </button>
              )}
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className={`px-8 py-4 text-xl rounded-lg ${button.className || "bg-blue-500 text-white"}`}
                  onClick={button.onClick}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}