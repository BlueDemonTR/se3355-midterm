import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Button = ({ text, onClick, disabled, loadingButton }) => {
  const isLoading = useSelector(state => state.appState.loadingButton === loadingButton)

  return (
    <button
      className='bg-white border-2 rounded-2xl p-1'
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {text}
    </button>
  )
}

export default Button