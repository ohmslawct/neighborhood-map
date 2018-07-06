
import React, {Component} from 'react'
// import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'



export class Map extends React.Component {

    componentDidMount(){
      console.log("Component Did Mount!");
      this.loadMap();

    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.google !== this.props.google) {
        this.loadMap();
      }
    }

    loadMap() {
    console.log("loadMap Executing");
    console.log(this.props);

    // check if google is available
    if (this.props && this.props.google)
    {
      console.log("The Google Available");

    const {google} = this.props;
    const maps = google.maps;

    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);

    let zoom = 10;
    let lat = 41.3079952;
    let lng = -72.9248016;

    const center = new maps.LatLng(lat, lng);
    const mapConfig = Object.assign({}, {
      center: center,
      zoom: zoom
    })
    this.map = new maps.Map(node, mapConfig);

  }
    }

  render() {
    return (
      <div ref='map'>

      </div>
    )
  }
}


export default Map
