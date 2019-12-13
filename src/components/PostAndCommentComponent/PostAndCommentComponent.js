import React, { Component } from 'react'
import axios from 'axios'
import './PostAndCommentComponent.sass'
import SimpleSnackbar from '../MessageComponent/MessageComponent'
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent'

class PostAndCommentComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: [],
      numberCom: '',
      action: false,
      spinner: true,
      error: ''
    }
  }

  componentDidMount () {
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${this.props.postId}`)
      .then(res => {
        let number = res.data.length
        console.log(res.data)
        this.setState({ numberCom: number, spinner: false })
      })
      .catch(err=>this.setState({error:`${err}`}))
  }

  getComments = (e) => {
    e.preventDefault()
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${this.props.postId}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          comments: res.data,
          action: true,
        })
      })
      .catch(err => this.setState({error:`${err}`}))
  }

  render () {
    return (
      <>
        <div className='post' onClick={this.getComments}>
          {this.props.title}
          {this.state.spinner ? <SpinnerComponent/> :
            <div className='numberCom'>{this.state.numberCom} </div>}
        </div>
        <div className='wrapperComments'>
          <div className='error'>{this.state.error}</div>
          {this.state.comments.map(comment =>
            <div className='comment' key={comment.id}> {comment.name} </div>
          )}
        </div>
        {this.state.action ? <SimpleSnackbar/> : null}
      </>
    )
  }
}

export default PostAndCommentComponent
