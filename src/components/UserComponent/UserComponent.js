import React, { Component } from 'react'
import axios from 'axios'
import PostAndCommentComponent from '../PostAndCommentComponent/PostAndCommentComponent'
import './UserComponent.sass'

class UserComponent extends Component {
  constructor (props){
    super(props)
    this.state = {
      posts: []
    }
  }

  getPost = (e) => {
    e.preventDefault()
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${this.props.userId}`)
      .then(res=>{
        console.log(res.data)
        this.setState({posts: res.data})
      })
      .catch(err=> console.log(err))
  }

  render () {
    return (
      <>
      <div className='user' onClick={this.getPost}>
        {this.props.name}
      </div>
        <div className='wrapperPost'>
        {this.state.posts.map(post =>
          <PostAndCommentComponent
            key={post.id}
            postId={post.id}
            title={post.title}
          />)}
        </div>
        </>
    )
  }
}

export default UserComponent
