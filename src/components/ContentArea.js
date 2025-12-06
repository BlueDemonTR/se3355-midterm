import { reduceClass } from 'lib'
import React, { useState } from 'react'

const ContentArea = ({ children }) => {

  return (
    <div
      className={reduceClass([
        'flex', 
        'flex-col', 
        'flex-1', 
        'w-full', 
        'min-h-content', 
        'items-center'
      ])}
    >
      <div
        className={reduceClass([
          'flex', 
          'flex-col', 
          'flex-1', 
          'w-full', 
          'p-2', 
          'animate-fadeIn', 
          'gap-4', 
          'md:max-w-screen-lg'
        ])}
      >
        {children}
      </div>
    </div>
  )
}

export default ContentArea