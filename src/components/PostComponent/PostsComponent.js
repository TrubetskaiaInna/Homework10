import React, { Component } from 'react'
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent'
import './PostsComponent.sass'
import axios from 'axios'
import SimpleSnackbar from '../MessageComponent/MessageComponent'

class PostsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      spinner: true,
      numberCom: '',
      post: props.post || []
    }
  }

  componentDidMount () {
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${this.props.postId}`)
      .then(res => {
        let number = res.data.length
        console.log(res.data)
        this.setState({ numberCom: number, spinner: false })
      })
      .catch(err=>this.setState({error:`${err},Loading failed`}))
  }

  getComments = (e) => {
    e.preventDefault()
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${this.props.postId}`)
      .then(res => {
        console.log(res.data)
        this.props.setComments(res.data)
        this.setState({
          action:true
        })
      })
      .catch(err => this.setState({error:`${err}`}))
  }

  render () {
    let { post } = this.state
    return (
      <>
      <div className='post' onClick={this.getComments}>
        <span>{post.title}</span>
        {this.state.spinner ? <SpinnerComponent/> :
          <div className='numberCom'>{this.state.numberCom} </div>}
      </div>
        <div className='error'>{this.state.error}</div>
        {this.state.action ? <SimpleSnackbar/> : null}
        </>
    )
  }
}

export default PostsComponent
