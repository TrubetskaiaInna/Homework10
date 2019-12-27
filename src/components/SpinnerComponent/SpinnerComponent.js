import Loader from 'react-loader-spinner'
import React, { Component } from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class SpinnerComponent extends Component {
  render () {
    return (
      <Loader
        type='Oval'
        color='#00BFFF'
        height={20}
        width={20}
      />
    )
  }
}
export default SpinnerComponent
