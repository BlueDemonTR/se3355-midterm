import { Hypertext } from 'components'
import React from 'react'

const PokemonText = ({ pokemon }) => {

  return (
    <span>
      <img 
        className='size-8 inline'
        src={pokemon.sprite} 
        alt={pokemon.name}   
      />

      <Hypertext 
        item={{
          name: pokemon.name,
          url: `/pokemon/${pokemon.id}`
        }}
      />
    </span>
  )
}

export default PokemonText