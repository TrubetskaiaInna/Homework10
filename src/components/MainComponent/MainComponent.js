import React, { Component } from 'react'
import axios from 'axios'
import UserComponent from '../UserComponent/UserComponent'
import './MainComponent.sass'
import SimpleSnackbar from '../MessageComponent/MessageComponent'

import PostsComponent from '../PostComponent/PostsComponent'
import CommentsComponent from '../CommentsComponent/CommentsComponent'

class MainComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      users: [],
      comments: [],
      action: false,
      error: ''
    }
  }

  getUsers = (e) => {
    e.preventDefault()
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        console.log(res.data)
        this.setState({
          users: res.data,
          action: true
        })
      })
      .catch(err => this.setState({ error: `${err}` }))
  }

  setPosts = (posts) => {
    this.setState({ posts, comments: [] })
  }
  setComments = (comments) => {
    this.setState({ comments })
  }

  render () {
    return (
      <>
        <button
          onClick={this.getUsers}
          className='button'>
          Get Users
        </button>
        <div className='error'>{this.state.error}</div>

        <div className='wrapperComponents'>
          <div className='wrapperUsers'>
            {this.state.users.map(user =>
              <UserComponent
                setPosts={this.setPosts}
                key={user.id}
                userId={user.id}
                name={user.name}
              />)}
            {this.state.action ? <SimpleSnackbar/> : null}
          </div>
          <div className='wrapperPosts'>
            {this.state.posts.map((post) => {
              return (
                <PostsComponent setComments={this.setComments} key={post.id} postId={post.id} post={post}/>
              )
            })}
          </div>
          <div className={'commentsWrapper'}>
            {this.state.comments.map((comment) => {
              return <CommentsComponent comment={comment} key={comment.id}/>
            })}
          </div>

        </div>
      </>
    )
  }
}

export default MainComponent
