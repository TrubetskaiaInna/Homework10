// @flow
import React, { Component } from 'react'
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent'
import './PostsComponent.sass'
import axios from 'axios'
import SimpleSnackbar from '../MessageComponent/MessageComponent'

type Comments = {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
}

type setCommentsCallback = (Array<Comments>) => void

type Props = {
  postId: number,
  setComments: setCommentsCallback
}

type  State = {
  spinner: boolean,
  numberCom: number,
  post: string,
  action: boolean,
  error: string
}

type Response<T> = {
  data: T,
  status: number
}

class PostsComponent extends Component<Props, State> {
  constructor (props: Object = {}) {
    super(props)
    this.state = {
      spinner: true,
      action: false,
      numberCom: 0,
      error: '',
      post: props.post || ''
    }
  }

  componentDidMount = async (): Promise<void> => {
    const response: Response<Array<Comments>> = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${this.props.postId}`)
    try {
      let numberComment = response.data.length
      this.setState({ numberCom: numberComment, spinner: false })
    } catch (err) {this.setState({ error: `${err},Loading failed` })}
  }

  getComments = async (e: SyntheticEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    try {
      const response: Response<Array<Comments>> = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${this.props.postId}`)
      this.props.setComments(response.data)
      this.setState({
        action: true
      })
    } catch (err) { this.setState({ error: `${err},Loading failed` })}
  }

  render () {
    let { post, error, action, spinner, numberCom } = this.state
    return (
      <>
        <div className='post' onClick={this.getComments}>
          <span>{post}</span>
          {spinner ? <SpinnerComponent/> :
            <div className='numberCom'>{numberCom} </div>}
        </div>
        <div className='error'>{error}</div>
        {action ? <SimpleSnackbar/> : null}
      </>
    )
  }
}

export default PostsComponent
