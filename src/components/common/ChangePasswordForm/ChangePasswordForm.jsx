/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/common/ChangePasswordForm.jsx
import { useState } from 'react'
import { toast } from 'react-toastify'
import UserApi from '@/api/UserApi'
import InputComponent from '../Input/InputComponent'
import { useSelector } from 'react-redux'

const ChangePasswordForm = ({ userId }) => {
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangeOldPassword = (e) => setOldPassword(e.target.value)
  const handleChangePassword = (e) => setPassword(e.target.value)
  const handleChangeConfirmPassword = (e) => setConfirmPassword(e.target.value)
  const user = useSelector((state) => state.auth.user) // Dùng selector đã memoized

  const validatePassword = (value) => {
    if (!value.trim()) return 'Mật khẩu không được để trống'
    if (value.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự'
    if (!/[A-Z]/.test(value)) return 'Mật khẩu phải chứa ít nhất một chữ hoa'
    if (!/[0-9]/.test(value)) return 'Mật khẩu phải chứa ít nhất một số'
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      return 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt'
    return ''
  }
  const validateOldPassword = (value) => {
    if (!value.trim()) return 'Mật khẩu không được để trống'
    if (value.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự'
    if (!/[A-Z]/.test(value)) return 'Mật khẩu phải chứa ít nhất một chữ hoa'
    if (!/[0-9]/.test(value)) return 'Mật khẩu phải chứa ít nhất một số'
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      return 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt'
    if (value === password) return 'Mật khẩu xác nhận không được trùng với mật khẩu mới'
    return ''
  }
  const validateConfirmPassword = (value) => {
    if (!value.trim()) return 'Xác nhận mật khẩu không được để trống'
    if (value !== password) return 'Mật khẩu xác nhận không khớp'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Kiểm tra lỗi nhập liệu
    const errors = [
      validateOldPassword(oldPassword),
      validatePassword(password),
      validateConfirmPassword(confirmPassword)
    ].filter(Boolean) // Loại bỏ giá trị rỗng

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err, { position: 'top-right', autoClose: 3000 }))
      return
    }

    try {
      await UserApi.changePassword(userId, { oldPassword, password })
      toast.success('Mật khẩu đã được thay đổi!', { position: 'top-right', autoClose: 3000 })

      // Reset form sau khi đổi mật khẩu thành công
      setOldPassword('')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Cập nhật mật khẩu không thành công, vui lòng thử lại!',
        { position: 'top-right', autoClose: 3000 }
      )
    }
  }

  return (
    <form action="">
      <div className="text-2xl text-hover font-bold mt-10">
        <div>Thay đổi mật khẩu</div>
        <div className="flex flex-col gap-2">
          <InputComponent
            label={'Mật khẩu cũ'}
            type="password"
            value={oldPassword}
            onChange={handleChangeOldPassword}
            validate={validateOldPassword}
            classInput="bg-gray-50 border border-gray-300 text-text rounded-lg focus:outline-none focus:ring-hover focus:border-hover text-xl md:text-xl block w-full p-2.5"
          />
          <div className="flex space-x-2 justify-between items-end">
            <InputComponent
              label={'Mật khẩu mới'}
              type="password"
              value={password}
              onChange={handleChangePassword}
              validate={validatePassword}
              classInput="bg-gray-50 border border-gray-300 text-text rounded-lg focus:outline-none focus:ring-hover focus:border-hover text-xl md:text-xl block w-full p-2.5"
            />
            <InputComponent
              label={'Xác nhận mật khẩu mới'}
              type="password"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              validate={validateConfirmPassword}
              classInput="bg-gray-50 border border-gray-300 text-text rounded-lg focus:outline-none focus:ring-hover focus:border-hover text-xl md:text-xl block w-full p-2.5"
            />
          </div>
          <div className="flex mt-2">
            <input type="checkbox" className="w-10" />
            <p className="text-text font-bold text-xl">Đồng ý đổi mật khẩu</p>
          </div>
          <div className="w-full h-auto flex items-center justify-center">
            <button
              type="submit"
              className="text-2xl px-10 py-4 w-auto text-white rounded-2xl hover:bg-hover bg-primary flex justify-center items-center"
              onClick={handleSubmit}
            >
              Cập nhật mật khẩu
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ChangePasswordForm
