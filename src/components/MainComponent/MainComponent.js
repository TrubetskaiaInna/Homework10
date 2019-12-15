// @flow
import React, { Component } from 'react'
import axios from 'axios'
import UserComponent from '../UserComponent/UserComponent'
import './MainComponent.sass'
import SimpleSnackbar from '../MessageComponent/MessageComponent'
import PostsComponent from '../PostComponent/PostsComponent'
import CommentsComponent from '../CommentsComponent/CommentsComponent'

type Users = {
  id: number,
  name: string
}

type Posts = {
  id: number,
  title: string
}

type Comments = {
  id: number,
  name: string
}

type Response = {
  data: Array<Object>
}

type State = {
  users: Array<Users>,
  posts: Array<Posts>,
  comments: Array<Comments>,
  action: boolean,
  error: string
}

class MainComponent extends Component<{}, State> {
  constructor (props: Object) {
    super(props)
    this.state = {
      posts: [],
      users: [],
      comments: [],
      action: false,
      error: ''
    }
  }

  getUsers = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response: Response = await axios.get(`https://jsonplaceholder.typicode.com/users`)
      this.setState({
        users: response.data,
        action: true
      })
    } catch (err) {this.setState({ error: `Loading failed,${err}` })}
  }

  setPosts: Function = (posts: Object) => {
    this.setState({ posts, comments: [] })
  }
  setComments: Function = (comments: Object) => {
    this.setState({ comments })
  }

  render () {
    let { error, users, action, posts, comments } = this.state
    return (
      <>
        <button
          onClick={this.getUsers}
          className='button'>
          Get Users
        </button>

        <div className='error'>{error}</div>

        <div className='wrapperComponents'>
          <div className='wrapperUsers'>
            {users.map(user =>
              <UserComponent
                setPosts={this.setPosts}
                key={user.id}
                userId={user.id}
                name={user.name}
              />)}
            {action ? <SimpleSnackbar/> : null}
          </div>

          <div className='wrapperPosts'>
            {posts.map((post: Object) => {
              return (
                <PostsComponent
                  setComments={this.setComments}
                  key={post.id}
                  postId={post.id}
                  post={post.title}/>
              )
            })}
          </div>

          <div className={'commentsWrapper'}>
            {comments.map((comment: Object) => {
              return <CommentsComponent
                comment={comment.name}
                key={comment.id}/>
            })}
          </div>
        </div>
      </>
    )
  }
}

export default MainComponent
