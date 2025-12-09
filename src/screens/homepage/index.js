import { ContentArea, Hypertext, Section, Text, Title } from 'components'
import { Api, textColors } from 'lib'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Homepage = () => {
  const summary = useSelector(state => state.data?.summary),
    dispatch = useDispatch()

  async function getSummary() {
    if(summary) return

    const res = await Api.get('https://en.wikipedia.org/api/rest_v1/page/summary/Pokemon', {}, 'navigator')
    if(!res) return

    dispatch({
      type: 'SET_SUMMARY',
      payload: res.extract
    })
  }

  useEffect(() => {
    getSummary()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ContentArea>
      <Title>
        Pokémon Wiki
      </Title>

      <Section>
        <Text italic>
          {summary} <br />
        </Text>
          
        <Text italic col={textColors.GREY} size='text-xs'>
          - Summary pulled from Wikipedia
        </Text>
      </Section>

      <Section>
        <Text>
          In this wiki you can look over the many <Hypertext item={{ name: 'game generation', url: '/games' }} /> the series has, the <Hypertext item={{ name: 'regions', url: '/regions' }} /> in those areas and the namesake of the series, the <Hypertext item={{ name: 'Pokémon', url: '/pokemon' }} />.  
        </Text>
      </Section>
    </ContentArea>
  )
}

export default Homepage