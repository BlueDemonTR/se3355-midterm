import React, { useState } from 'react'
import Box from './Box'
import { reduceClass, textColors } from 'lib'
import Text from './Text'
import Section from './Section'

const Collapsable = ({ title, content }) => {
  const [open, setOpen] = useState(false)

  return (
    <Section>
      <button
        className={reduceClass([
          'bg-pokeball-red',
          'p-2',
          'border-4',
          'border-pokeball-black',
          'hover:bg-masterball-purple',
          'active:bg-masterball-pink',
          'transition-colors',
          'cursor-pointer',
          'w-full'
        ])}
        onClick={() => setOpen(!open)}
      >
        <Text col={textColors.WHITE} bold>
          {title}
        </Text>
      </button>

      <div className={reduceClass([
        'relative', 
        !open && 'h-0', 
        'w-full', 
        'flex', 
        'justify-center', 
        'mb-2',
      ])}>

        <div
          className={reduceClass([
            'bg-pokeball-white',
            'p-2',
            'border-4',
            'border-t-0',
            'border-black',
            'transition-all',
            'origin-top',
            'h-fit',
            open ? 'scale-y-100' : 'scale-y-0',
            open ? 'relative' : 'absolute',
            'top-0',
            'w-full',
            'z-10'
          ])}
        >
          {content}
        </div>

        <div 
          className={reduceClass([
            'bg-white',
            'p-2',
            'border-4',
            'border-black',
            'rounded-full',
            'absolute',
            'mx-auto',
            'top-[-0.75rem]',
            'z-20'
          ])}
        />

      </div>
    </Section>
  )
}

export default Collapsable