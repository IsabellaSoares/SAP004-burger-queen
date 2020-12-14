import React from 'react'

const Input = ({ type, placeholder, onChange }) => {
  return (
    <input
      required
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default Input