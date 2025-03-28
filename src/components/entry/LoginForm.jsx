import instance from '@/api/axios'
import { CustomButton } from '@/components/common/Button/CustomButton'
import InputComponent from '@/components/common/Input/InputComponent'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { loginSuccess } from '@/store/authSlice'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false) // Thêm trạng thái loading
  const dispatch = useDispatch()

  const handleChangeEmail = (e) => setEmail(e.target.value)
  const handleChangePassword = (e) => setPassword(e.target.value)

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
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (loading) return // Tránh spam nhiều lần

    // Kiểm tra đầu vào
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    if (emailError || passwordError) {
      toast.error(emailError || passwordError)
      return
    }

    setLoading(true) // Bắt đầu loading

    try {
      const response = await instance.post('/login', { email, password })
      dispatch(loginSuccess(response))
      toast.success('Đăng nhập thành công!')
      setTimeout(() => {
        window.location.href = '/'
      }, 2000) // Đợi 2 giây trước khi chuyển trang để hiển thị toast
    } catch (error) {
      const errorMsg = error.response || 'Đăng nhập thất bại. Vui lòng thử lại.'
      toast.error(errorMsg)
    } finally {
      setLoading(false) // Kết thúc loading
    }
  }

  return (
    <div className="flex justify-center mt-50 md:mt-0">
      <section className="bg-transparent w-full sm:w-[80%] md:w-[60%] md:mt-0 xl:p-0">
        <div className="text-2xl w-full p-6 space-y-4 md:space-y-2 sm:p-10">
          <h1 className="font-bold leading-tight text-center py-4 tracking-tight text-black md:text-4xl">
            Đăng nhập
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <InputComponent
              label="Email"
              type="email"
              name="email"
              classInput="bg-gray-50 border border-gray-300 text-text rounded-lg focus:outline-none focus:ring-hover focus:border-hover text-md md:text-xl block w-full p-2.5"
              placeholder="name@company.com"
              value={email}
              onChange={handleChangeEmail}
              validate={validateEmail}
              required
              autoComplete="email"
            />
            <InputComponent
              label="Mật khẩu"
              type="password"
              name="password"
              placeholder="••••••••"
              classInput="bg-gray-50 border border-gray-300 text-text rounded-lg focus:outline-none focus:ring-hover focus:border-hover text-md md:text-xl block w-full p-2.5"
              value={password}
              onChange={handleChangePassword}
              validate={validatePassword}
              required
              autoComplete="current-password"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-text rounded bg-white accent-hover"
                  name="remember"
                />
                <label htmlFor="remember" className="ml-3 text-xl text-text">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <a href="#" className="text-xl font-medium text-hover hover:underline">
                Quên mật khẩu?
              </a>
            </div>
            <CustomButton
              disabled={!email.length || !password.length || loading}
              type="submit"
              className={`w-full text-white font-medium rounded-lg text-xl py-4 text-center transition-all ${
                !email.length || !password.length || loading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary hover:bg-hover cursor-pointer'
              }`}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </CustomButton>
            <p className="text-xl font-light text-text">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="font-medium text-hover hover:underline">
                Đăng ký
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}

export default LoginForm
