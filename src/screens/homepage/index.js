import { ContentArea, Hypertext, Section, Text, Title } from 'components'
import { Api, textColors } from 'lib'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenerations } from 'services'

const Homepage = ({  }) => {
  const summary = useSelector(state => state.data?.summary),
    generationsLen = useSelector(state => state.data?.generations?.length),
    dispatch = useDispatch()

  async function getSummary() {
    if(!summary) return

    const res = await Api.get('https://en.wikipedia.org/api/rest_v1/page/summary/Pokemon', {}, 'navigator')
    if(!res) return

    dispatch({
      type: 'SET_SUMMARY',
      payload: res.extract
    })
  }

  useEffect(() => {
    getSummary()
  }, [])

  return (
    <ContentArea>
      <Title>
        Pokémon Wiki
      </Title>

      <Section>
        <Text italic>
          {summary} <br />
          
          <Text col={textColors.GREY} size='text-xs'>
            - Summary pulled from Wikipedia
          </Text>
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