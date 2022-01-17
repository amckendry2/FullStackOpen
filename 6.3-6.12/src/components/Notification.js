import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const message = useSelector(state => state.message)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  let msg = null
  if(message){
    if(message.category === "NEW")
      msg = "added note: " + message.message
    if(message.category === "VOTE")
      msg = "voted for: " + message.message
  }
  return (
    <>
      {msg !== null &&
        <div style={style}>
          {msg}
        </div>
      }
    </>
  )
}

export default Notification