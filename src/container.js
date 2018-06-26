import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Map from './mapComponent';


const google=window.google;

export class Container extends React.Component {



  render() {


    const style = {
      width: '100vw',
      height: '100vh'
    }

    if (!this.props.loaded) {
      return (<div>Loading...</div>)
    }

    return (
      <div style={style}>
        <Map google={this.props.google}
          />
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyBDsB6fa3n0w6FoZk4_r7zG3cGl7xjZ3dY'
})(Container)
