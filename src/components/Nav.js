import React, { useState } from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Nav = ({  }) => {
  const navigate = useNavigate(),
    dispatch = useDispatch()

  const items = [
    { text: 'Homepage', icon: '', address: '/' },
    { text: 'Pokémon', icon: '', address: '/pokemon' },
    { text: 'Games', icon: '', address: '/games' },
    { text: 'Regions', icon: '', address: '/regions' },
  ]

  return (
    <div
      className='sticky w-screen h-header bg-slate-500 top-0 animate-fadeIn z-40'
    >
      {items.map(x => (
        <Button
          text={x.text}
          onClick={() => navigate(x.address)}
        />
      ))}

      <Button
        text='reset'
        onClick={() => dispatch({
          type: 'RESET'
        })}
      />
    </div>
  )
}

export default Nav