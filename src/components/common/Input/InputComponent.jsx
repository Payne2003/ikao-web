import { useState } from 'react'
import PropTypes from 'prop-types'

const InputComponent = ({
  type = 'text',
  // eslint-disable-next-line react/prop-types
  name,
  label,
  placeholder,
  icon,
  disabled = false,
  validate,
  onChange,
  onFocus,
  onBlur,
  classInput
  // eslint-disable-next-line react/prop-types
  ,autoComplete 
}) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [isTouched, setIsTouched] = useState(false)
  const inputBorderClass =
    error && isTouched ? 'border-red-500' : value && !error ? 'border-green-500' : 'border-gray-300'

  const handleChange = (e) => {
    let newValue

    if (type === 'checkbox') {
      newValue = e.target.checked // Boolean (true/false)
    } else if (type === 'radio') {
      newValue = e.target.value // Giá trị của radio button là chuỗi
    } else {
      newValue = e.target.value // Các trường input thông thường
    }

    setValue(newValue)

    if (validate) {
      const validationError = validate(newValue)
      setError(validationError)
    } else {
      // Chỉ kiểm tra trim() nếu newValue là chuỗi
      if (typeof newValue === 'string' && !newValue.trim()) {
        setError('')
      } else {
        setError('')
      }
    }

    if (onChange) {
      onChange(e)
    }
  }

  const handleFocus = (e) => {
    if (!isTouched) setIsTouched(true) // Đảm bảo chỉ set một lần
    if (onFocus) {
      onFocus(e)
    }
  }

  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e)
    }
  }

  return (
    <div className="flex flex-col w-full h-full">
      {label && <label className="text-xl font-bold text-text mb-2">{label}</label>}
      <div
        className={`relative w-auto flex items-center  ${inputBorderClass} ${
          disabled
            ? 'bg-gray-200 cursor-not-allowed'
            : error && isTouched
            ? 'border-red-500'
            : value && !error
            ? 'border-green-500'
            : 'border-gray-300'
        }`}
      >
        {icon && <span className="mr-2 text-gray-500">{icon}</span>}
        {type === 'textarea' ? (
          <textarea
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${classInput}`}
            autoComplete={autoComplete} // ✅ Đảm bảo có dòng này
          />
        ) : type === 'radio' || type === 'checkbox' ? (
          <input
            type={type}
            name={name} // Quan trọng: name phải giống nhau để chỉ chọn 1 radio
            checked={value}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-6 h-6 cursor-pointer"
          />
        ) : (
          <input
            type={type}
            className={`${classInput} ${inputBorderClass}`}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete={autoComplete} // ✅ Đảm bảo có dòng này
          />
        )}
      </div>
      {error && isTouched && <span className="text-xl text-red-500 mt-1">{error}</span>}
    </div>
  )
}

InputComponent.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'textarea', 'search', 'checkbox']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  validate: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  classInput: PropTypes.string
}

export default InputComponent
