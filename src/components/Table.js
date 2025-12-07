import { capitalize, reduceClass } from 'lib'
import React, { useState } from 'react'
import Text from './Text'

const Table = ({ columns = [], data = [] }) => {

  return (
    <table
      className={reduceClass([
        'w-full'
      ])}
    >
      <tr>
        {columns.map(x => (
          <th
            className={reduceClass([
              'border-4',
              'p-2'
            ])}
          >
            <Text bold>
              {capitalize(x)}
            </Text>
          </th>
        ))}
      </tr>

      {data.map(row => (
        <tr>
          {columns.map(key => (
            <th
              className={reduceClass([
                'border-2',
                'border-t-0',
                'p-2'
              ])}
            >
              <Text med>
                {row[key]}
              </Text>
            </th>
          ))}
        </tr>
      ))}
    </table>
  )
}

export default Table