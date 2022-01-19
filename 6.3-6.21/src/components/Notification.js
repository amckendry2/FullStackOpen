import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message }) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    position: 'fixed',
    top: 10,
    backgroundColor: 'grey',
    color: 'white'
  }

  let msg = null
  if(message.message !== null){
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

const mapStateToProps = state => ({
  message: state.message   
})

export default connect(
  mapStateToProps,
  null
)(Notification)