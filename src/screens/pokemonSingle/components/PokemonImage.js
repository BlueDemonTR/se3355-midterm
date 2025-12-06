import { reduceClass } from 'lib'
import React, { useState } from 'react'

const PokemonImage = ({ item }) => {
  const [hover, setHover] = useState(false),
    [pressed, setPressed] = useState(false),
    sprite = getSprite()

  function getSprite() {
    const spr = hover && item.shiny ? item.shiny : item

    return spr[pressed ? 'back' : 'front']
  }

  if(!item) return null

  return (
    <img 
      src={sprite}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={reduceClass([
        'pixelated'
      ])} 
      alt={`a pokemon sprite`}
    />
  )
}

export default PokemonImage