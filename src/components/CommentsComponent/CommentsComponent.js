// @flow
import React, { Component } from 'react'
import './CommentsComponent.sass'

type Props = {
  comment: string
}

type State = {
  comment: string
}

class CommentsComponent extends Component <Props, State> {
  constructor (props: Object = {}) {
    super(props)
    this.state = {
      comment: props.comment || ''
    }
  }

  render () {
    let { comment } = this.state
    return (
      <div className='comment'>
        <span>{comment}</span>
      </div>
    )
  }
}

export default CommentsComponent
