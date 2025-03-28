import { useState, useEffect } from "react"
// Create a unique ID for the style tag to avoid conflicts
const styleId = "modal-animations-styles"



export default function Modal({
  // eslint-disable-next-line react/prop-types
  isOpen,
  // eslint-disable-next-line react/prop-types
  animation = "fade-in",
  // eslint-disable-next-line react/prop-types 
  modalClass = "",
  // eslint-disable-next-line react/prop-types
  children,
  // eslint-disable-next-line react/prop-types
  modalContent = "",
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [animationClass, setAnimationClass] = useState("")

  // Add styles to document head on component mount
  useEffect(() => {
    // Check if style tag already exists
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement("style")
      styleTag.id = styleId
      styleTag.innerHTML = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }

        .modal-fade-in {
          animation: fadeIn 0.5s forwards;
        }

        .modal-fade-in-up {
          animation: fadeInUp 0.5s forwards;
        }

        .modal-fade-in-down {
          animation: fadeInDown 0.5s forwards;
        }

        .modal-zoom-in {
          animation: zoomIn 0.5s forwards;
        }

        .modal-slide-in-right {
          animation: slideInRight 0.5s forwards;
        }

        .modal-slide-in-left {
          animation: slideInLeft 0.5s forwards;
        }

        .modal-bounce {
          animation: bounce 0.5s forwards;
        }

        .modal-fade-out {
          animation: fadeIn 0.5s forwards reverse;
        }

        .modal-fade-out-up {
          animation: fadeInUp 0.5s forwards reverse;
        }

        .modal-fade-out-down {
          animation: fadeInDown 0.5s forwards reverse;
        }

        .modal-zoom-out {
          animation: zoomIn 0.5s forwards reverse;
        }

        .modal-slide-out-right {
          animation: slideInRight 0.5s forwards reverse;
        }

        .modal-slide-out-left {
          animation: slideInLeft 0.5s forwards reverse;
        }

        .modal-bounce-out {
          animation: bounce 0.5s forwards reverse;
        }
      `
      document.head.appendChild(styleTag)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setAnimationClass(`modal-${animation}`)
    } else {
      // When closing, apply the "out" version of the animation
      if (isVisible) {
        const outAnimation = animation.replace("in", "out")
        setAnimationClass(`modal-${outAnimation === animation ? "fade-out" : outAnimation}`)

        // Wait for animation to complete before hiding
        const timer = setTimeout(() => {
          setIsVisible(false)
        }, 100)

        return () => clearTimeout(timer)
      }
    }
  }, [isOpen, animation])

  if (!isVisible && !isOpen) return null

  return (
      <div>
        <div className={`modal ${modalClass} ${animationClass}`}>
          <div
            className={`modal__body relative rounded-4xl  w-full transition-all duration-500`}
          >
            <div className={`h-auto w-full ${modalContent}`}>{children}</div>
          </div>
        </div>
      </div>
  )
}

