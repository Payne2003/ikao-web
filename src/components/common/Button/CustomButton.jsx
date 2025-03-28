/* eslint-disable react/prop-types */
import React from 'react'
import { Loader2 } from 'lucide-react'

export const CustomButton = React.forwardRef(
  (
    {
      className,
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    return (
      <button
        type="button"
        className={`${className} ${disabled ? 'bg-gray-400 cursor-not-allowed' : ''}`}
        disabled={disabled || isLoading}
        ref={ref}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin mr-2" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    )
  }
)

CustomButton.displayName = 'CustomButton'
