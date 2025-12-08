import Collapsable from 'components/Collapsable'
import ContentArea from 'components/ContentArea'
import Title from 'components/Title'
import { ListItem, ListWrapper, Paginator } from './components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const ResultsWithPagination = ({ items, title, pullMore, pullMoreAction }) => {
  console.log('GLOBAL', global);
  

  const [page, setPage] = useState(0),
    [endReached, setEndReached] = useState(false),
    currentItems = items.slice(page * global.PAGE_SIZE, (page + 1) * global.PAGE_SIZE),
    dispatch = useDispatch()

  async function fetchItems() {
    const len = items?.length ?? 0

    setEndReached(false)

    if(len > (page + 1) * global.PAGE_SIZE) return

    dispatch({
      type: 'LOADING_BUTTON',
      payload: 'navigator'
    })

    const res = await pullMore(items?.length)
    
    dispatch({
      type: 'LOADING_BUTTON',
      payload: null
    })

    if(!res) return

    if(res.endReached) setEndReached(true)

    dispatch({
      type: pullMoreAction,
      payload: res.data
    })
  }
  
  useEffect(() => {
    fetchItems()
  }, [page])
    
  return (
    <ContentArea>
      <Title>
        {title}
      </Title>

      <Collapsable
        title='Filter by generation'
        content={() => null}
      />

      <ListWrapper>
        {currentItems?.map(x => (
          <ListItem item={x} navigateTo='pokemon' />
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

export default ResultsWithPagination