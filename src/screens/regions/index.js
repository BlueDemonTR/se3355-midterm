import { ResultsWithPagination } from 'components'
import React from 'react'
import { useSelector } from 'react-redux'
import { getRegions } from 'services'

const Regions = () => {
  const regions = useSelector(state => state.regions) ?? []
  
  return (
    <ResultsWithPagination
      items={regions}
      pullMore={getRegions}
      pullMoreAction='REGIONS_PUSH_MULTIPLE'
      title='Pokémon'
    />
  )
}

export default Regions