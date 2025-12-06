import React, { useState } from 'react'

const AudioPlayer = ({ audio }) => {

  return (
    <div>
      <audio controls>
        <source src={audio} type='audio/ogg' />
        Your browser does not support the audio element.
      </audio> 
    </div>
  )
}

export default AudioPlayer