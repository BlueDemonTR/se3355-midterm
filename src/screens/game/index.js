import { Box, Collapsable, ContentArea, FullScreenLoading, Hypertext, Section, Text, Title } from 'components'
import { getSeperator, textColors } from 'lib'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGameDetails } from 'services'

const Game = ({  }) => {
  const { id } = useParams(),
    [loading, setLoading] = useState(true),
    [data, setData] = useState(null)

  useEffect(() => {
    getDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function getDetails() {
    const res = await getGameDetails(id)

    setLoading(false)

    if(!res) return

    setData(res)
  }

  if(loading) return <FullScreenLoading />
  
  const { 
    name,
    move_learn_methods,
    generation,
    pokedexes,
    regions,
    versions,

   } = data
  

  return (
    <ContentArea>
      <Title>
        {name}
      </Title>

      <Section>
        <Text>
          {name} is a group of games in Generation {generation} being formed by the mainline games {versions.map((x, i) => (
            <React.Fragment>
              <b>{x}</b>
              {getSeperator(i, versions.length)}
            </React.Fragment>
          ))}
        </Text>
      </Section>

      <Box noFlex>
        <Text>
          In these games moves can be learnt by: {move_learn_methods.map((x, i) => (
            <React.Fragment key={i}>
              {x}{getSeperator(i, move_learn_methods.length)}
            </React.Fragment>
          ))}
        </Text>
      </Box>

      {!!regions.length && (
        <Collapsable 
          title='Regions that appear in these games'
          content={regions.map((x, i) => (
            <Text key={i}>
              <Hypertext item={x} />
            </Text>
          ))}
        />
      )}

      {!!pokedexes.length && (
        <React.Fragment>
          <Text size='text-xl' bold>
            Pokedéxes that appear in these games
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
        </React.Fragment>
      )}


    </ContentArea>
  )
}

export default Game