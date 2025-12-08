import Box from 'components/Box'
import Button from 'components/Button'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const GenerationFilter = ({ selected = [], handleSelect }) => {
  const generations = useSelector(state => state.data?.generations)

  return (
    <Box gap='gap-1'>
      {generations.map(({ name, id }) => (
        <Button 
          text={name}
          onClick={() => handleSelect(id)}
          active={selected.includes(id)}
        />
      ))}
    </Box>
  )
}

export default GenerationFilter