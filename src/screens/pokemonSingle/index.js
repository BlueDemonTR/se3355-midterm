import { AudioPlayer, Box, Collapsable, ContentArea, FullScreenLoading, Hypertext, Section, Table, Text, Title, TypePlate } from 'components'
import { getSeperator, textColors } from 'lib'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPokemonDetails, getRegionDetails } from 'services'
import { PokemonImage, PokemonText } from './components'

const PokemonSingle = ({  }) => {
  const { id } = useParams(),
    [loading, setLoading] = useState(true),
    [data, setData] = useState(null)

  useEffect(() => {
    getDetails()
  }, [id])

  async function getDetails() {
    const res = await getPokemonDetails(id)

    setLoading(false)

    if(!res) return

    setData(res)
  }

  if(loading) return <FullScreenLoading />
  
  const { 
    playable, 
    name, 
    otherNames, 
    moves, 
    abilities, 
    description, 
    sprite, 
    types,
    stats,
    cries,
    evolvesFrom,
    evolvesInto
  } = data

  return (
    <ContentArea>
      <Title 
        children={name}
        otherNames={otherNames} 
      />

      <Section alignCenter directionSwap gap='gap-2'>
        <PokemonImage item={sprite} />
        
        <Box gap='gap-2'>
          <Box noFlex mobileHidden wid>
            {!!stats.length && (
              <Table
                title='Base Stats'
                columns={['name', 'base_stat']}
                data={stats}
              />
            )}
          </Box>
          
          <Box vertical noFlex justifyAround gap='gap-2'>
            {types.map((item) => (
              <TypePlate 
                item={item}
              />
            ))}
          </Box>
          
          <AudioPlayer 
            audio={cries}
          />
        </Box>
      </Section>

      <Text italic>
        "{description}"
      </Text>

      {!!(evolvesFrom || evolvesInto.length) && (
        <Text>
          It{' '}
          {!!evolvesFrom && (
            <span>evolves from <PokemonText pokemon={evolvesFrom} /> </span>
          )}
          {!!evolvesInto.length && (
            <span>
              {!!evolvesFrom && 'and'} evolves into {evolvesInto.map((x, i) => (
                <React.Fragment>
                  <PokemonText 
                    pokemon={x}
                  />

                  {getSeperator(i, evolvesInto.length)}
                </React.Fragment>
              ))}
            </span>
          )}
        </Text>

      )}

      <Section>
        <Text>
          {name} is a Pokémon that appears in the mainline games {playable.map((x, i) => (
            <React.Fragment>
              <Hypertext item={x} />

              {getSeperator(i, playable.length)}
            </React.Fragment>
          ))}
        </Text>
      </Section>

      <Collapsable 
        title='Moves that this Pokémon can learn'
        content={moves.map(x => (
          <Text>
            {x}
          </Text>
        ))}
      />

      <Collapsable 
        title='Abilities that this Pokémon can get'
        content={abilities.map(x => (
          <Text>
            {x}
          </Text>
        ))}
      />

      <Section webHidden>
        {!!stats.length && (
          <Table
            title='Base Stats'
            columns={['name', 'base_stat']}
            data={stats}
          />
        )}
      </Section>
    </ContentArea>
  )
}

export default PokemonSingle