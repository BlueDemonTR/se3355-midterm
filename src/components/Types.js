import React, { useState } from 'react'
import Box from './Box'
import TypePlate from './TypePlate'

const Types = ({ types }) => {

  return (
    <Box vertical noFlex justifyAround gap='gap-2'>
      {types.map((item) => (
        <TypePlate
          item={item}
        />
      ))}
    </Box>
  )
}

export default Types