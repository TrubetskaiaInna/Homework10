import React, { Component } from 'react'
import axios from 'axios'
import UserComponent from '../UserComponent/UserComponent'
import './UsersComponent.sass'
import SimpleSnackbar from '../MessageComponent/MessageComponent'

class UsersComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
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
      .catch(err => this.setState({error:`${err}`}))
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
        <div className='wrapperUsers'>
          {this.state.users.map(user =>
            <UserComponent
              key={user.id}
              userId={user.id}
              name={user.name}
            />)}
          {this.state.action ?  <SimpleSnackbar/>: null}
        </div>
      </>
    )
  }
}

export default UsersComponent
