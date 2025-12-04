import { reduceClass } from 'lib'
import React, { useMemo, useState } from 'react'

const Box = ({ 
  children, 
  vertical, 
  noFlex, 
  relative, 
  fullW, 
  fullH, 
  justifyBetween, 
  justifyCenter,
  grow,
  alignCenter
}) => {
  const classes = useMemo(generateClasses, [vertical, noFlex, relative, fullW, fullH, justifyBetween, grow, alignCenter, justifyCenter])
  
  function generateClasses() {
    const classes = ['flex']

    classes.push(vertical ? 'flex-row' : 'flex-col')
    classes.push(noFlex ? 'flex-none' : 'flex-1')

    if(relative) classes.push('relative')
    if(fullW) classes.push('w-full')
    if(fullH) classes.push('h-full')

    if(justifyBetween) classes.push('justify-between')
    else if (justifyCenter) classes.push('justify-center') 

    if(grow) classes.push('grow')
    if(alignCenter) classes.push('items-center')

    return classes
  }

  return (
    <div
      className={reduceClass(classes)}
    >
      { children }
    </div>
  )
}

export default Box