import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: []
  };

  onMarkerClick = (props, marker, e) => {
    this.props.showInfoWindowNow(props);
  }

  onInfoWindowClose = () => {
    this.props.closeInfoWindowNow();
    this.forceUpdate()
  }

  renderInfoWindow(myMarker) {
    return (this.props.filteredLocationsOnly.map(location => {

      return (<InfoWindow key={location.key} title={location.title} position={location.position} visible={location.infoWindowStatus} onClose={() => {
          location.infoWindowStatus = false;
          this.forceUpdate()
        }
}>
        <div>
          <h1>{location.title}</h1>
          Recent News:<br/> {location.infoWindow.content} &nbsp;
          <br/>
          <br/>
          Source:&nbsp;<br/>
          {location.infoWindow.contentUrl}
        </div>
      </InfoWindow>) // return InfoWindow
    }))
  } //renderInfoWindow

  renderMarkers() {
    return (this.props.filteredLocationsOnly.map(location => {
      return (<Marker key={location.key} animation={this.props.google.maps.Animation.DROP} title={location.title} position={location.position} onClick={this.onMarkerClick} name={location.title}/>)
    }))
  };

  render() {
    return (<div>

      <Map google={this.props.google} zoom={15} style={this.props.style} initialCenter={{
          lat: 41.3076822,
          lng: -72.9259595
        }}>
        {this.renderMarkers()}
        {this.renderInfoWindow()}

      </Map>

    </div>);
  }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyBDsB6fa3n0w6FoZk4_r7zG3cGl7xjZ3dY'})(MapContainer)
