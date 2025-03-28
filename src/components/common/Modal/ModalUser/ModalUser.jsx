/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { CustomButton } from '@/components/common/Button/CustomButton'
import Modal from '@/components/common/Modal/Modal'
import { LucideCircleUser } from 'lucide-react'
import { AiOutlineLogin } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { useEffect, useState } from 'react'
import instance from '@/api/axios'

// eslint-disable-next-line react/prop-types
const ModalUser = ({ isOpen }) => {
  const accessToken = localStorage.getItem("accessToken");
  return (
    <Modal
      isOpen={isOpen}
      modalClass="absolute  mt-3 top-full right-0"
      modalOverlay="hidden"
      modalContent="flex bg-white border-1 border-gray-200 rounded-4xl relative"
      animation="zoom-in"
    >
      <div className="h-auto w-100 py-4 rounded-4xl px-4 flex flex-col gap-4">
        {/* Nút Account */}
        {accessToken && (
          <Link className="cursor-pointer w-full h-full" to={accessToken ? '/profile' : '/login'}>
            <CustomButton
              leftIcon={<LucideCircleUser size={20} />}
              className="w-full flex justify-center gap-4 items-center text-2xl text-white cursor-pointer hover:bg-hover bg-button rounded-4xl h-auto py-6"
            >
              Account
            </CustomButton>
          </Link>
        )}
        {/* Nút Login */}
        {!accessToken && (
          <Link className="cursor-pointer w-full h-full" to="/login">
            <CustomButton
              leftIcon={<AiOutlineLogin size={20} />}
              className="w-full flex justify-center gap-4 items-center text-2xl text-white cursor-pointer hover:bg-hover bg-primary rounded-4xl h-auto py-6"
            >
              Login
            </CustomButton>
          </Link>
        )}

        {/* Nút Tạo đơn */}
        {(accessToken) && (
          <Link className="cursor-pointer w-full h-full" to="/create-order">
            <CustomButton
              leftIcon={<IoMdAddCircleOutline size={20} />}
              className="w-full flex justify-center gap-4 items-center text-2xl text-white cursor-pointer hover:bg-hover bg-primary rounded-4xl h-auto py-6"
            >
              Tạo đơn
            </CustomButton>
          </Link>
        )}
      </div>
    </Modal>
  )
}

export default ModalUser
