import { ResultsWithPagination } from 'components'
import React from 'react'
import { useSelector } from 'react-redux'
import { getPokemon } from 'services'

const Pokemon = () => {
  const pokemon = useSelector(state => state.pokemon) ?? []

  return (
    <ResultsWithPagination 
      items={pokemon}
      pullMore={getPokemon}
      pullMoreAction='POKEMON_PUSH_MULTIPLE'
      title='Pokémon'
      navigateTo='pokemon'
    />
  )
}

export default Pokemon