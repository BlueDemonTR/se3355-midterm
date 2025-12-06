import { reduceClass, textColors } from 'lib'
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Text = ({
  item
}) => {
  const { name, url } = item,
    navigate = useNavigate()
  
  return (
    <span
      className={reduceClass([
        'text-blue-700',
        'hover:text-blue-500',
        'underline',
        'cursor-pointer'
      ])}
      onClick={() => navigate(url)}
    >
      {name}
    </span>
  )
}

export default Text