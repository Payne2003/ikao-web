import UserApi from '@/api/UserApi'
import HeadingProfile from '@/components/common/HeadingProfile/HeadingProfile'
import InputComponent from '@/components/common/Input/InputComponent'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserFromToken } from '@/store/authSlice'
const AccountInfo = () => {
  const [selectedGender, setSelectedGender] = useState('')
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleChangeFullname = (e) => setFullName(e.target.value)
  const handleChangePhone = (e) => setPhone(e.target.value)
  const handleChangeEmail = (e) => setEmail(e.target.value)
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.auth.accessToken || null)

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserFromToken()) // Chỉ fetch user nếu có accessToken
    }
  }, [dispatch, accessToken])
  const user = useSelector((state) => state.auth.user) // Dùng selector đã memoized
  //xử lý ảnh
  const defaultImage =
    'https://th.bing.com/th/id/OIP.dCpgPQ0i-xX2gZ-yonm54gHaHa?w=202&h=202&c=7&r=0&o=5&pid=1.7' // Ảnh mặc định
  const [image, setImage] = useState(defaultImage)
  const fileInputRef = useRef(null)

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target.result)
      reader.readAsDataURL(file)

      // Upload ảnh lên ImgBB
      const uploadedImageUrl = await handleFileUpload(file)
      if (uploadedImageUrl) {
        setImage(uploadedImageUrl)
      }
    } else {
      toast.error('Vui lòng chọn một file hình ảnh hợp lệ!', { position: 'top-right' })
    }
  }
  const handleFileUpload = async (file) => {
    const apiKey = 'fe43f4a1aa3899b2450f0a43d24ef712' // Lấy API key từ ImgBB
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      return data.data.url // Trả về URL ảnh
    } catch (error) {
      console.error('Lỗi upload ảnh:', error)
    }
  }

  //xử lý hết
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
  const validateGender = (value) => {
    if (!value) return 'Vui lòng chọn giới tính'
    return ''
  }
  const inputClass =
    'bg-gray-50 border border-gray-300 text-text rounded-lg focus:outline-none focus:ring-hover focus:border-hover text-xl md:text-xl block w-full p-2.5'
  const handleGenderChange = (e) => setSelectedGender(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const error =
      validateFullname(fullname) ||
      validatePhone(phone) ||
      validateEmail(email) ||
      validateGender(selectedGender)

    if (error) {
      toast.error(error, { position: 'top-right', autoClose: 3000 })
      return
    }
    // Nếu mật khẩu mới không có giá trị, loại bỏ password trong dữ liệu gửi đi
    const userData = {
      id: user?.id,
      fullname,
      email,
      phone,
      gender: selectedGender,
      image
    }

    try {
      await UserApi.updateUser(user?.id, {
        id: user?.id,
        fullname: fullname,
        email: email,
        phone: phone,
        gender: selectedGender,
        image: image,
        password: user?.password
      })
      localStorage.setItem('user', JSON.stringify(userData))

      toast.success('Cập nhật thành công!', { position: 'top-right', autoClose: 3000 })
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Cập nhật không thành công, vui lòng thử lại!', {
        position: 'top-right',
        autoClose: 3000
      })
    }
  }
  return (
    <div className="flex flex-col w-full h-auto">
      <HeadingProfile title={'Thông tin tài khoản'} />
      <div className="bg-white relative shadow-md rounded-2xl p-6 w-full">
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          {/* Hình ảnh xem trước */}
          <div
            className="absolute w-50 z-1 top-[-98px] h-50 bg-white shadow-xl border-1 border-gray-300 rounded-full left-[50%] -translate-x-1/2 flex items-center justify-center overflow-hidden"
            onClick={() => fileInputRef.current.click()}
            style={{ cursor: 'pointer' }}
          >
            <img
              sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
              src={user?.image}
              alt="Uploaded Preview"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Input ẩn để chọn file từ máy */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <InputComponent
            label={'Full Name'}
            name={'fullName'}
            type="text"
            value={fullname}
            placeholder={'Nhập họ và tên'}
            onChange={handleChangeFullname}
            classInput={inputClass}
          ></InputComponent>
          <InputComponent
            label={'Phone'}
            type="text"
            value={phone}
            placeholder={'Nhập số điện thoại'}
            onChange={handleChangePhone}
            classInput={inputClass}
          />
          <InputComponent
            label={'Email'}
            type="email"
            value={email}
            placeholder={'Nhập email'}
            onChange={handleChangeEmail}
            classInput={inputClass}
          />

          <div className="flex text-xl text-text space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Nam"
                checked={selectedGender === 'Nam'}
                onChange={handleGenderChange}
              />
              <span className="ml-2">Nam</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Nữ"
                checked={selectedGender === 'Nữ'}
                onChange={handleGenderChange}
              />
              <span className="ml-2">Nữ</span>
            </label>
          </div>

          <button
            type="submit"
            className="text-2xl px-10 py-4 w-auto text-white rounded-2xl hover:bg-hover bg-primary flex justify-center items-center"
            onClick={handleSubmit}
          >
            Cập nhật
          </button>
          <ChangePasswordForm userId={user?.id} />
        </form>
      </div>
    </div>
  )
}

export default AccountInfo
