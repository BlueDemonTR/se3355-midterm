import { Box, Button, ContentArea, ListItem, ListWrapper, Paginator, Text, Title } from 'components'
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

    setEndReached(false)

    if(len > (page + 1) * PAGE_SIZE) return

    dispatch({
      type: 'LOADING_BUTTON',
      payload: 'navigator'
    })

    const res = await getRegions(regions?.length, 'navigator')

    dispatch({
      type: 'LOADING_BUTTON',
      payload: null
    })
    
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

      <ListWrapper>
        {currentRegions?.map(x => (
          <ListItem item={x} navigateTo='region' />
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

export default Regions