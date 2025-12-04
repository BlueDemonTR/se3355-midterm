import { Box, Button, ContentArea, ListItem, ListWrapper, Paginator, Text, Title } from 'components'
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

    setEndReached(false)

    if(len > (page + 1) * PAGE_SIZE) return

    dispatch({
      type: 'LOADING_BUTTON',
      payload: 'navigator'
    })

    const res = await getGames(games?.length, 'navigator')

    dispatch({
      type: 'LOADING_BUTTON',
      payload: null
    })

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
        Games
      </Title>

      <ListWrapper>
        {currentGames?.map(x => (
          <ListItem item={x} navigateTo='game' />
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

export default Games