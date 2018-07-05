import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export class MapContainer extends Component {

state = {
     showingInfoWindow: false,
     activeMarker: {},
     selectedPlace: []
   };

onMarkerClick = (props, marker, e) =>{
  this.props.showInfoWindowNow(props);
}

onInfoWindowClose = () => {
  this.props.closeInfoWindowNow();
  this.forceUpdate()
}

renderInfoWindow(myMarker){
  return(
    this.props.filteredLocationsOnly.map(location => {

      return(
       <InfoWindow
       title={location.title}
       position={location.position}
       visible={location.infoWindowStatus}
           onClose={() =>{
             location.infoWindowStatus = false;
               this.forceUpdate()}
           }
       >
      <div>
      <h1>{location.title}</h1>
      Recent News:<br/>
      {location.infoWindow.content}
      {location.infoWindow.contentUrl}
      {// inserting <Link> creates error
      }
      <br/>
      Source: New York Times
      {(() => {
      //  console.log("Location: ", location);
      })()}


      </div>
      </InfoWindow>
    ) // return InfoWindow
    })
  )
} //renderInfoWindow


renderMarkers(){
  return(
  this.props.filteredLocationsOnly.map(location => {
    return(
      <Marker
       title={location.title}
       position={location.position}
       onClick={this.onMarkerClick}
       name={location.title}
      />
    )
  })
 )
};



render() {
    return(
      <div>

      <Map
      google={this.props.google}
      zoom={15}
      style={this.props.style}
      initialCenter={{
           lat: 41.3076822,
           lng: -72.9259595
         }}
      >
      {this.renderMarkers()}
      {this.renderInfoWindow()}

      </Map>


      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBDsB6fa3n0w6FoZk4_r7zG3cGl7xjZ3dY'
})(MapContainer)
