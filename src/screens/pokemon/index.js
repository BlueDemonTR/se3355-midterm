import { Box, Button, ContentArea, Text, Title } from 'components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemon } from 'services'

const PAGE_SIZE = 20

const Pokemon = ({  }) => {
  const [page, setPage] = useState(0),
    [endReached, setEndReached] = useState(false),
    pokemon = useSelector(state => state.pokemon) ?? [],
    hasPrev = page > 0,
    dispatch = useDispatch(),
    currentPokemons = pokemon.slice(page * 20, (page + 1) * 20)

  async function fetchPokemon() {
    const len = pokemon?.length ?? 0

    if(len > (page + 1) * PAGE_SIZE) return

    const res = await getPokemon(pokemon?.length, 'navigator')
    if(!res) return

    if(res.endReached) setEndReached(true)

    dispatch({
      type: 'POKEMON_PUSH_MULTIPLE',
      payload: res.data
    })
  }

  useEffect(() => {
    fetchPokemon()
  }, [page])

  return (
    <ContentArea>
      <Title>
        Pokémon
      </Title>

      <Box grow>
        {currentPokemons?.map(x => (
          <p>
            {x.name}
          </p>
        ))}
      </Box>

      <Box vertical fullW justifyBetween noFlex> 
        <Button text='Previous' disabled={!hasPrev} loadingButton='fetchPokemon' onClick={() => setPage(page - 1)} />

        <Text>{page + 1}</Text>

        <Button text='Next' disabled={endReached} loadingButton='fetchGames' onClick={() => setPage(page + 1)} />
      </Box>

    </ContentArea>
  )
}

export default Pokemon