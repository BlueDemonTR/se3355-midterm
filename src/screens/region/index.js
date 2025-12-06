import { Box, Collapsable, ContentArea, FullScreenLoading, Hypertext, Text } from 'components'
import { getSeperator, textColors } from 'lib'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getRegionDetails } from 'services'

const Region = ({  }) => {
  const { id } = useParams(),
    [loading, setLoading] = useState(true),
    [data, setData] = useState(null)

  useEffect(() => {
    getDetails()
  }, [id])

  async function getDetails() {
    const res = await getRegionDetails(id)

    setLoading(false)

    if(!res) return

    setData(res)
  }

  if(loading) return <FullScreenLoading />
  
  const { playable, name, otherNames, locations, pokedexes } = data
  

  return (
    <ContentArea>
      <Box noFlex>
        <Text size='text-3xl' bold>
          {name}
        </Text>

        <Text col={textColors.GREY} size='text-xs'>
          (Otherwise known as {otherNames.join(', ')})
        </Text>
      </Box>

      <Box noFlex>
        <Text>
          {name} is a region in Pokémon that appears in the mainline games {playable.map((x, i) => (
            <React.Fragment>
              <Hypertext item={x} />

              {getSeperator(i, playable.length)}
            </React.Fragment>
          ))}
        </Text>
      </Box>

      <Collapsable 
        title='Locations in this area'
        content={locations.map(x => (
          <Text>
            {x}
          </Text>
        ))}
      />

      <Text size='text-xl' bold>
        Pokedéxes in this area
      </Text>

      {pokedexes.map(pokedex => (
        <Collapsable 
          title={pokedex.description}
          content={pokedex.pokemon.map(x => (
            <Text>
              {x.entry_number}-{' '}

              <Hypertext item={{ name: x.name, url: `/pokemon/${x.id}` }} />
            </Text>
          ))}
        />
      ))}


    </ContentArea>
  )
}

export default Region