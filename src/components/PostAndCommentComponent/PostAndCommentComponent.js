import React, { Component } from 'react'
import axios from 'axios'
import './PostAndCommentComponent.sass'

class PostAndCommentComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: [],
      numberCom: ''
    }
  }

  componentDidMount () {
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${this.props.postId}`)
      .then(res => {
        let number = res.data.length
        console.log(res.data)
        this.setState({ numberCom: number })
      })
  }

  getComments = (e) => {
    e.preventDefault()
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${this.props.postId}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          comments: res.data
        })
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <>
        <div className='post' onClick={this.getComments}>
          {this.props.title}
          <div className='numberCom'>{this.state.numberCom} </div>
        </div>
        <div className='wrapperComments'>
          {this.state.comments.map(comment =>
            <div className='comment' key={comment.id}> {comment.name} </div>
          )}
        </div>
      </>
    )
  }
}

export default PostAndCommentComponent
