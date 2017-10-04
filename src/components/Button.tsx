import * as React from 'react'

interface ButtonProps {
  id: string;
  disabled: boolean;
  children: string;
  onClick: () => void;
}

const Button = (bp: ButtonProps) => (
  <button { ...bp } type="button">{ bp.children }</button>
)

export default Button
