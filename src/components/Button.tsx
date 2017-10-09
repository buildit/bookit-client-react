import * as React from 'react'

interface ButtonProps {
  id: string
  disabled: boolean
  children: string
  onClick: () => void
}

const Button = ({ children, ...rest }: ButtonProps) => (
  <button { ...rest } type="button">{ children }</button>
)

export default Button
