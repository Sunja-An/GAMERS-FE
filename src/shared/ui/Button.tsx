import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold border-none rounded-xl cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2'

  const variantStyles = {
    primary: 'bg-gradient-primary text-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)]',
    secondary: 'bg-gradient-secondary text-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(245,87,108,0.4)]',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
  }

  const sizeStyles = {
    small: 'px-5 py-2 text-sm',
    medium: 'px-8 py-3 text-base',
    large: 'px-12 py-4 text-xl',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
