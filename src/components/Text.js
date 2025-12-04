import { reduceClass, textColors } from 'lib'
import React, { useMemo, useState } from 'react'

const Text = ({ 
  col = textColors.BLACK,
  size = 'text-base',
  bold = false,
  med = false,
  taCenter,
  children
}) => {
  const classes = useMemo(generateClasses, [col, size, bold, med, taCenter])

  function generateClasses() {
    const classes = [col, size]

    if(taCenter) classes.push('text-center')

    if(bold) classes.push('font-bold')
    else if(med) classes.push('font-bold')

    return classes
  }

  return (
    <p
      className={reduceClass(classes)}
    >
      {children} {taCenter}
    </p>
  )
}

export default Text