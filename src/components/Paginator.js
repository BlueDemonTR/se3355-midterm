import React, { useState } from 'react'
import Box from './Box'
import Button from './Button'
import Text from './Text'

const Paginator = ({ page, endReached, setPage }) => {
  const hasPrev = page > 0


  return (
    <Box vertical fullW justifyBetween noFlex>
      <Box>
        <Button 
          text='Previous' 
          disabled={!hasPrev} 
          loadingButton='fetchPokemon' 
          onClick={() => setPage(page => page - 1)} 
        />
      </Box>

      <Box alignCenter justifyCenter>
        <Text size='text-lg'>{page + 1}</Text>
      </Box>

      <Box>
        <Button 
          text='Next' 
          disabled={endReached} 
          loadingButton='fetchGames' 
          onClick={() => setPage(page => page + 1)} 
        />
      </Box>
    </Box>
  )
}

export default Paginator