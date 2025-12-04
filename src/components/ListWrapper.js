import React, { useState } from 'react'
import Button from './Button'
import Text from './Text'
import { useNavigate } from 'react-router-dom'
import Box from './Box'
import { reduceClass } from 'lib'

const ListItem = ({ children }) => {

  return (
    <div 
      className={
        reduceClass([
          'grid',
          'grow',
          'grid-cols-2',
          'gap-1'
        ])
      }
    >
      {children}
    </div>
  )
}

export default ListItem