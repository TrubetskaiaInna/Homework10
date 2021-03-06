// @flow
import React, { Component } from 'react'
import axios from 'axios'
import './UserComponent.sass'
import SimpleSnackbar from '../MessageComponent/MessageComponent'

type Posts = {
  userId: number,
  id: number,
  title: string,
  body: string
}

type setPostCallback = (Array<Posts>) => void

type Props = {
  name: string,
  userId: number,
  setPosts: setPostCallback
}

type State = {
  action: boolean,
  error: string
}

type Response<T> = {
  data: T,
  status: number
}

class UserComponent extends Component<Props, State> {
  constructor (props: Object = {}) {
    super(props)
    this.state = {
      action: false,
      error: ''
    }
  }

  getPost = async (e: SyntheticEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    try {
      const response: Response<Array<Posts>> = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${this.props.userId}`)
      this.props.setPosts(response.data)
      this.setState({
        action: true
      })
    } catch (err) {this.setState({ error: `${err},Loading failed` })}
  }

  render () {
    let { name } = this.props
    let { action } = this.state
    return (
      <>
        <div className='user' onClick={this.getPost}>
          <span> {name}</span>
        </div>
        <div className='error'>{this.state.error}</div>
        {action ? <SimpleSnackbar/> : null}
      </>
    )
  }
}

export default UserComponent
