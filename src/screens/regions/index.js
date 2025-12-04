import { Box, Button, ContentArea, Text, Title } from 'components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRegions } from 'services'

const PAGE_SIZE = 20

const Regions = ({  }) => {
  const [page, setPage] = useState(0),
    [endReached, setEndReached] = useState(false),
    regions = useSelector(state => state.regions) ?? [],
    hasPrev = page > 0,
    dispatch = useDispatch(),
    currentRegions = regions.slice(page * 20, (page + 1) * 20)

  async function fetchRegions() {
    const len = regions?.length ?? 0

    if(len > (page + 1) * PAGE_SIZE) return

    const res = await getRegions(regions?.length, 'navigator')
    if(!res) return

    if(res.endReached) setEndReached(true)

    dispatch({
      type: 'REGIONS_PUSH_MULTIPLE',
      payload: res.data
    })
  }

  useEffect(() => {
    fetchRegions()
  }, [page])

  return (
    <ContentArea>
      <Title>
        Regions
      </Title>

      <Box grow>
        {currentRegions?.map(x => (
          <p>
            {x.name}
          </p>
        ))}
      </Box>

      <Box vertical fullW justifyBetween noFlex> 
        <Button text='Previous' disabled={!hasPrev} loadingButton='fetchRegions' onClick={() => setPage(page - 1)} />

        <Text>{page + 1}</Text>

        <Button text='Next' disabled={endReached} loadingButton='fetchGames' onClick={() => setPage(page + 1)} />
      </Box>

    </ContentArea>
  )
}

export default Regions