import React, { Component } from 'react'
import axios from 'axios'
import PostAndCommentComponent from '../PostAndCommentComponent/PostAndCommentComponent'
import './UserComponent.sass'
import SimpleSnackbar from '../MessageComponent/MessageComponent'

class UserComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      action: false,
      error: ''
    }
  }

  getPost = (e) => {
    e.preventDefault()
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${this.props.userId}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          posts: res.data,
          action: true
        })
      })
      .catch(err => this.setState({error:`${err}`}))
  }

  render () {
    return (
      <>
        <div className='user' onClick={this.getPost}>
          {this.props.name}
        </div>
        <div className='wrapperPost'>
          <div className='error'>{this.state.error}</div>
          {this.state.posts.map(post =>
            <PostAndCommentComponent
              key={post.id}
              postId={post.id}
              title={post.title}
            />)}
          {this.state.action ? <SimpleSnackbar/> : null}
        </div>
      </>
    )
  }
}

export default UserComponent
