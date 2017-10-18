import * as React from 'react'

interface ButtonProps {
  id?: string
  disabled?: boolean
  children: string
  onClick?: () => void,
  type: 'button' | 'submit'
}

const Button = ({ children, type, ...rest }: ButtonProps) => (
  <button { ...rest } type={type}>{ children }</button>
)

export default Button
