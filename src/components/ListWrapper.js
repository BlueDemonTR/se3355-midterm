import React, { useState } from 'react'
import Button from './Button'
import Text from './Text'
import { useNavigate } from 'react-router-dom'
import Box from './Box'
import { reduceClass, style } from 'lib'

const ListWrapper = ({ children }) => {

  return (
    <section className={reduceClass(style.listWrapper)}>
      {children}
    </section>
  )
}

export default ListWrapper