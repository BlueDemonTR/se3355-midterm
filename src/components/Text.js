import { reduceClass, textColors } from 'lib'
import React, { useMemo, useState } from 'react'

const Text = ({ 
  col = textColors.BLACK,
  size = 'text-base',
  bold = false,
  med = false,
  children
}) => {
  const classes = useMemo(generateClasses, [col, size, bold, med])

  function generateClasses() {
    const classes = [col, size]

    if(bold) classes.push('font-bold')
    else if(med) classes.push('font-bold')

    return classes
  }

  return (
    <p
      className={reduceClass(classes)}
    >
      {children}
    </p>
  )
}

export default Text