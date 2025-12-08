
import { Box, FullScreenLoading, Nav } from 'components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Game, Games, Homepage, Pokemon, PokemonSingle, Region, Regions } from 'screens'
import { getGenerations } from 'services'

const Wiki = ({  }) => {
  const navigatorLoading = useSelector(state => state.appState?.loadingButton === 'navigator'),
    generationsLen = useSelector(state => state.data?.generations?.length),
    dispatch = useDispatch()

  useEffect(() => {
    fetchGenerations()
  }, [])

  async function fetchGenerations() {
    if(generationsLen) return
    
    const res = await getGenerations()
    if(!res) return

    dispatch({
      type: 'SET_GENERATIONS',
      payload: res.data
    })
  }


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