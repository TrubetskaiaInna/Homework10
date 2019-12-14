import React, { Component } from 'react'
import axios from 'axios'
import './UserComponent.sass'
import SimpleSnackbar from '../MessageComponent/MessageComponent'

class UserComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      action: false,
      error: ''
    }
  }

  getPost = (e) => {
    e.preventDefault()
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${this.props.userId}`)
      .then(res => {
        console.log(res.data)
        this.props.setPosts(res.data)
        this.setState({
          action:true
        })
      })
      .catch(err => this.setState({ error: `${err}` }))
  }

  render () {
    return (
      <>
        <div className='user' onClick={this.getPost}>
          {this.props.name}
        </div>
          <div className='error'>{this.state.error}</div>
          {this.state.action ? <SimpleSnackbar/> : null}
      </>
    )
  }
}

export default UserComponent
