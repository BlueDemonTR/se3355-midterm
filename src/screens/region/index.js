import { Collapsable, ContentArea, FullScreenLoading, Hypertext, Section, Text, Title } from 'components'
import { getSeperator } from 'lib'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRegionDetails } from 'services'

const Region = () => {
  const { id } = useParams(),
    [loading, setLoading] = useState(true),
    [data, setData] = useState(null)

  useEffect(() => {
    getDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Title 
        children={name}
        otherNames={otherNames}
      />

      <Section>
        <Text>
          {name} is a region in Pokémon that appears in the mainline games {playable.map((x, i) => (
            <React.Fragment>
              <Hypertext item={x} />

              {getSeperator(i, playable.length)}
            </React.Fragment>
          ))}
        </Text>
      </Section>

      <Collapsable 
        title='Locations in this area'
        content={locations.map(x => (
          <Text>
            {x}
          </Text>
        ))}
      />

      <Section gap='gap-2'>
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
      </Section>
    </ContentArea>
  )
}

export default Region