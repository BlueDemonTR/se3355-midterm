import { reduceClass } from 'lib'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Button = ({ text, onClick, disabled, loadingButton }) => {
  const isLoading = useSelector(state => state.appState.loadingButton === loadingButton)

  function handleClick(e) {
    onClick(e)

    // Stops clicking through elements
		if (!e) e = window.event
		e.cancelBubble = true
		if (e.stopPropagation) e.stopPropagation()
  }

  return (
    <button
      className={reduceClass([
        'bg-white', 
        'hover:bg-blue-200', 
        'active:bg-blue-300', 
        'disabled:hover:bg-white',
        'disabled:text-gray-500',
        'transition-colors',
        'border-2', 
        'rounded-2xl',
        'p-1'
      ])}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {text}
    </button>
  )
}

export default Button