import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MenuAppBar from './MenuAppBar.js';

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: []
  };

componentDidMount(){




}

  onMarkerClick = (props, marker, e) => {
    this.props.showInfoWindowNow(props, marker, e);
    //console.log(this.props.google.maps.Animation);
//    marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
  }

  onInfoWindowClose = () => {
    this.props.closeInfoWindowNow();
    this.forceUpdate()
  }

  renderInfoWindow(myMarker) {
    return (this.props.filteredLocationsOnly.map(location => {

      return (<InfoWindow
        key={location.key}
        title={location.title}
        position={location.position}
        visible={location.infoWindow.infoWindowStatus}
        onClose={() => {
          location.infoWindow.infoWindowStatus = false;
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
 //   animation={this.props.google.maps.Animation.DROP}


  try{
      return (this.props.filteredLocationsOnly.map(location => {
        return (<Marker
          key={location.key}
          animation= {this.props.google.maps.Animation.DROP}
          title={location.title} position={location.position}
          onClick={this.onMarkerClick}
          name={location.title}/>)
      }))

  }catch(e){
     console.log("Error",e)
  }


};



render() {

    return (<div>

      <MenuAppBar
            google={this.props.google}
            locations = {this.props.locations}
            query = {this.props.query}
            updateQuery = {this.props.updateQuery}
            clearQuery = {this.props.clearQuery}
            updatedFilteredLocations = {this.props.updatedFilteredLocations}
            infoWindowStatus = {this.props.infoWindowStatus}
            showInfoWindowNow = {this.props.showInfoWindowNow}
            renderMarkers = {this.renderMarkers}
            filteredLocationsOnly = {this.props.filteredLocationsOnly}
            activeMarker = {this.state.activeMarker}
      />

      <Map google={this.props.google}
           zoom={15}
           style={this.props.style}
           initialCenter={{
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
