import React, { Component } from 'react'
import  './CommentsComponent.sass'

class CommentsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: props.comment || []
    }
  }
  render () {
    let { comment } = this.state
    return (
      <div className='comment'>
        <span>{comment.name}</span>
      </div>
    )
  }
}

export default CommentsComponent
