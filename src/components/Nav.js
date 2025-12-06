import React, { useState } from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reduceClass } from 'lib'

const Nav = ({  }) => {
  const navigate = useNavigate()

  const items = [
    { text: 'Homepage', icon: '', address: '/' },
    { text: 'Pokémon', icon: '', address: '/pokemon' },
    { text: 'Games', icon: '', address: '/games' },
    { text: 'Regions', icon: '', address: '/regions' },
  ]

  return (
    <div
      className={reduceClass([
        'flex', 
        'flex-col', 
        'flex-1', 
        'items-center',
        'sticky', 
        'w-100%', 
        'h-header', 
        'bg-slate-500', 
        'top-0', 
        'animate-fadeIn', 
        'z-40'
      ])}
    >
      <div
        className={reduceClass([
          'flex', 
          'flex-row', 
          'flex-1', 
          'w-full', 
          'p-2', 
          'animate-fadeIn', 
          'justify-between',
          'gap-4', 
          'md:max-w-screen-lg'
        ])}
      >
        {items.map(x => (
          <Button
            text={x.text}
            onClick={() => navigate(x.address)}
          />
        ))}
      </div>
    </div>
  )
}

export default Nav