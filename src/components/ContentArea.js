import React, { useState } from 'react'

const ContentArea = ({ children }) => {

  return (
    <div
      className='flex flex-col flex-1 w-screen min-h-content items-center'
    >
      <div
        className='flex flex-col flex-1 w-full p-2 animate-fadeIn gap-4'
      >
        {children}
      </div>
    </div>
  )
}

export default ContentArea