import instance from '@/api/axios'
import { CustomButton } from '@/components/common/Button/CustomButton'
import InputComponent from '@/components/common/Input/InputComponent'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

function RegisterForm() {
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChangeFullname = (e) => setFullName(e.target.value)
  const handleChangePhone = (e) => setPhone(e.target.value)
  const handleChangeEmail = (e) => setEmail(e.target.value)
  const handleChangePassword = (e) => setPassword(e.target.value)
  const handleChangeconfirmPassword = (e) => setconfirmPassword(e.target.value)

  const validateFullname = (value) => {
    if (!value.trim()) return 'Họ và tên không được để trống'
    if (value.length < 3) return 'Họ và tên phải có ít nhất 3 ký tự'
    return ''
  }

  const validatePhone = (value) => {
    const phoneRegex = /^[0-9]{10}$/
    if (!value.trim()) return 'Số điện thoại không được để trống'
    if (!phoneRegex.test(value)) return 'Số điện thoại không hợp lệ'
    return ''
  }

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value.trim()) return 'Email không được để trống'
    if (!emailRegex.test(value)) return 'Email không hợp lệ'
    return ''
  }

  const validatePassword = (value) => {
    if (!value.trim()) return 'Mật khẩu không được để trống'
    if (value.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự'
    if (!/[A-Z]/.test(value)) return 'Mật khẩu phải chứa ít nhất một chữ hoa'
    if (!/[0-9]/.test(value)) return 'Mật khẩu phải chứa ít nhất một số'
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      return 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt'
    return ''
  }

  const validateConfirmPassword = (value) => {
    if (!value.trim()) return 'Xác nhận mật khẩu không được để trống'
    if (value !== password) return 'Mật khẩu xác nhận không khớp'
    return ''
  }

  const inputClass =
    'bg-gray-50 border border-gray-300 text-text rounded-lg focus:outline-none focus:ring-hover focus:border-hover text-md md:text-xl block w-full p-2.5'

  const handleSubmit = async (event) => {
    event.preventDefault() // Ngăn trang reload
    setErrorMessage('') // Xóa lỗi cũ

    const formData = {
      fullname,
      phone,
      email,
      password
    }
    // Kiểm tra đầu vào trước khi gửi request
    const fullnameError = validateFullname(fullname)
    const phoneError = validatePhone(phone)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password)

    if (fullnameError || phoneError || emailError || passwordError || confirmPasswordError) {
      setErrorMessage('Vui lòng kiểm tra lại thông tin đăng ký!')
      return
    }
    try {
      await instance.post('/register', formData)
      window.location.href = '/login'
    } catch (error) {
      console.error('Lỗi khi gửi đăng ký:', error.response || error)

      if (error.response === 'Email already exists') {
        setErrorMessage('Email đã tồn tại. Vui lòng sử dụng email khác.')
        return
      } else {
        setErrorMessage('Đăng ký thất bại. Vui lòng thử lại.')
        return
      }
    }
  }

  return (
    <div className="flex justify-center mt-50 md:mt-0">
      <section className="bg-transparent w-full sm:w-[80%] md:w-[60%] md:mt-0 xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-black md:text-3xl">
            Đăng ký
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <InputComponent
              label="Name"
              type="text"
              name="fullName"
              value={fullname}
              classInput={inputClass}
              onChange={handleChangeFullname}
              placeholder="Nguyễn Văn A"
              validate={validateFullname}
              required
            />
            <InputComponent
              label="Phone"
              type="tel"
              name="phone"
              value={phone}
              classInput={inputClass}
              onChange={handleChangePhone}
              placeholder="0123456789"
              validate={validatePhone}
              required
            />
            <InputComponent
              label="Email"
              type="email"
              name="email"
              value={email}
              classInput={inputClass}
              onChange={handleChangeEmail}
              validate={validateEmail}
              placeholder="name@company.com"
              required
            />
            <InputComponent
              label="Password"
              type="password"
              name="password"
              value={password}
              classInput={inputClass}
              onChange={handleChangePassword}
              placeholder="••••••••"
              validate={validatePassword}
              required
            />
            <InputComponent
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              classInput={inputClass}
              onChange={handleChangeconfirmPassword}
              validate={validateConfirmPassword}
              placeholder="••••••••"
              required
            />
            {errorMessage && <p className="text-red-500 text-xl font-semibold">{errorMessage}</p>}

            <CustomButton
              disabled={
                !email.length ||
                !password.length ||
                !confirmPassword.length ||
                !phone.length ||
                !fullname.length
              }
              type="submit"
              className={`w-full  text-white  font-medium rounded-lg text-xl py-4 text-center ${
                !email.length || !password.length
                  ? ' bg-[#ccc] cursor-not-allowed'
                  : 'bg-primary hover:bg-hover cursor-pointer'
              }`}
            >
              Đăng ký
            </CustomButton>
            <p className="text-xl sm:text-xl font-light text-text">
              Đã có tài khoản?{' '}
              <Link to="/login" className="font-medium text-hover hover:underline">
                Đăng nhập
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}

export default RegisterForm

// bg-gray-50 border border-gray-300 text-text rounded-lg focus:outline-none focus:ring-hover focus:border-hover text-md md:text-xl block w-full p-2.5
