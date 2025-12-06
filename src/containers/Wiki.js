
import { Box, FullScreenLoading, Nav } from 'components'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Game, Games, Homepage, Pokemon, PokemonSingle, Region, Regions } from 'screens'

const Wiki = ({  }) => {
  const navigatorLoading = useSelector(state => state.appState?.loadingButton === 'navigator')

  return (
    <Box relative>
      {navigatorLoading && (
        <FullScreenLoading />
      )}
      <Nav />

      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/pokemon' element={<Pokemon />} />
        <Route exact path='/regions' element={<Regions />} />
        <Route exact path='/games' element={<Games />} />
        <Route exact path='/pokemon/:id' element={<PokemonSingle />} />
        <Route exact path='/region/:id' element={<Region />} />
        <Route exact path='/game/:id' element={<Game />} />
      </Routes>
    </Box>
  )
}

export default Wiki