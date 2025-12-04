import { Box, Button, ContentArea, Text, Title } from 'components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames, getPokemon } from 'services'

const PAGE_SIZE = 20

const Games = ({  }) => {
  const [page, setPage] = useState(0),
    [endReached, setEndReached] = useState(false),
    games = useSelector(state => state.games) ?? [],
    hasPrev = page > 0,
    dispatch = useDispatch(),
    currentGames = games.slice(page * 20, (page + 1) * 20)

  async function fetchGames() {
    const len = games?.length ?? 0

    if(len > (page + 1) * PAGE_SIZE) return

    const res = await getGames(games?.length, 'navigator')
    if(!res) return

    if(res.endReached) setEndReached(true)

    dispatch({
      type: 'GAMES_PUSH_MULTIPLE',
      payload: res.data
    })
  }

  useEffect(() => {
    fetchGames()
  }, [page])

  return (
    <ContentArea>
      <Title>
        Generation
      </Title>

    
      <Box grow>
        {currentGames?.map(x => (
          <p>
            {x.name}
          </p>
        ))}
      </Box>

      <Box vertical fullW justifyBetween noFlex> 
        <Button text='Previous' disabled={!hasPrev} loadingButton='fetchGames' onClick={() => setPage(page - 1)} />

        <Text>{page + 1}</Text>

        <Button text='Next' disabled={endReached} loadingButton='fetchGames' onClick={() => setPage(page + 1)} />
      </Box>

    </ContentArea>
  )
}

export default Games