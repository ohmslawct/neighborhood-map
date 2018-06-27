import React, {Component} from 'react'
import ReactDOM from 'react-dom';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

onMarkerClick(){
        console.log("Marker Click");
      }


renderMarkers(){
  return(
  this.props.filteredLocationsOnly.map(location => {
    return(
      <Marker
       title={location.title}
       name={location.title}
       position={location.position}
      />
    )
  })
 )
};


render() {
    return(
      <Map
      google={this.props.google}
      zoom={12}
      style={this.props.style}
      initialCenter={{
           lat: 41.314937,
           lng: -72.9078257
         }}
      >
      {this.renderMarkers()}
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBDsB6fa3n0w6FoZk4_r7zG3cGl7xjZ3dY'
})(MapContainer)
