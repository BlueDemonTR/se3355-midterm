import { Box, Button, ContentArea, ListItem, ListWrapper, Paginator, Text, Title } from 'components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemon } from 'services'

const PAGE_SIZE = 20

const Pokemon = ({  }) => {
  const [page, setPage] = useState(0),
    [endReached, setEndReached] = useState(false),
    pokemon = useSelector(state => state.pokemon) ?? [],
    dispatch = useDispatch(),
    currentPokemons = pokemon.slice(page * 20, (page + 1) * 20)

  async function fetchPokemon() {
    const len = pokemon?.length ?? 0

    setEndReached(false)

    if(len > (page + 1) * PAGE_SIZE) return

    dispatch({
      type: 'LOADING_BUTTON',
      payload: 'navigator'
    })

    const res = await getPokemon(pokemon?.length, 'navigator')
    
    dispatch({
      type: 'LOADING_BUTTON',
      payload: null
    })

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

      <ListWrapper>
        {currentPokemons?.map(x => (
          <ListItem item={x} navigateTo='pokemon' />
        ))}
      </ListWrapper>

      <Paginator 
        setPage={setPage}
        page={page}
        endReached={endReached}
      />
    </ContentArea>
  )
}

export default Pokemon