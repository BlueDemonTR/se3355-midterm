import React, { useState } from 'react'
import Button from './Button'
import Text from './Text'
import { useNavigate } from 'react-router-dom'
import Box from './Box'
import { reduceClass } from 'lib'

const ListItem = ({ navigateTo, item }) => {
  const { name, id, sprite, title } = item,
    navigate = useNavigate()

  return (
    <div 
      className={
        reduceClass([
          'flex',
          'flex-col',
          'bg-white', 
          'shadow-lg', 
          'border-2', 
          'rounded-lg', 
          'flex-1', 
          'justify-center', 
          'items-center',
          'transition-colors',
          'hover:bg-slate-100',
          'hover:shadow-xl'
        ])
      }
      onClick={() => navigate(`/${navigateTo}/${id}`)}
    >
      {!!sprite && (
        <img src={sprite} alt={`${name}'s sprite`}/>
      )}

      {!!title && (
        <Text size='text-2xl'>
          Gen {title}
        </Text>
      )}
      
      <Text taCenter>
        {name}
      </Text>
    </div>
  )
}

export default ListItem