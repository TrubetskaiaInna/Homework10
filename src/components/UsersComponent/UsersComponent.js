import React, { Component } from 'react'
import axios from 'axios'
import UserComponent from '../UserComponent/UserComponent'
import './UsersComponent.sass'

class UsersComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
  }

  getUsers = (e) => {
    e.preventDefault()
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        console.log(res.data)
        this.setState({ users: res.data})
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <>
        <button
          onClick={this.getUsers}
          className='button'>
          Get Users
        </button>
        <div className='wrapperUsers'>
          {this.state.users.map(user =>
            <UserComponent
              key={user.id}
              userId={user.id}
              name={user.name}
            />)}
        </div>
      </>
    )
  }
}

export default UsersComponent
