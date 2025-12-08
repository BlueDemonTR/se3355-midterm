import React, { useState } from 'react'
import Box from './Box'
import { reduceClass, style } from 'lib'

const TypePlate = ({ item }) => {
  const { name, sprite } = item

  return (
    <div className={reduceClass(style.typePlate)}>
      <img
        alt={name} 
        src={sprite} 
      />
    </div>
  )
}

export default TypePlate