import { ResultsWithPagination } from 'components'
import React from 'react'
import { useSelector } from 'react-redux'
import { getGames } from 'services'

const Games = () => {
  const games = useSelector(state => state.games) ?? []

  return (
    <ResultsWithPagination
      items={games}
      pullMore={getGames}
      pullMoreAction='GAMES_PUSH_MULTIPLE'
      title='Games'
      navigateTo='game'
    />
  )
}

export default Games