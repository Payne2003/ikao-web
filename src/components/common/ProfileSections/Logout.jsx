import Modal from "@/components/common/Modal/ModalSystem";
import { logout } from "@/store/authSlice";
import { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Logout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Bạn đã đăng xuất thành công!", {
      position: "top-right",
      autoClose: 2000,
    });
    window.location.href = '/login'
  };

  // Đóng modal khi nhấn phím Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
       
      >
        <AiOutlineLogout size={30} />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Xác nhận đăng xuất"
        content="Bạn có chắc chắn muốn đăng xuất?"
        type="confirmation"
        buttons={[
          {
            label: "Xác nhận",
            className: "text-xl bg-red-500 text-white",
            onClick: handleLogout,
          },
        ]}
      />
    </div>
  );
};

export default Logout;