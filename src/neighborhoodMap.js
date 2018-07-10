import React, {Component} from 'react'
import MenuAppBar from './MenuAppBar.js';
import MapContainer from './mapContainer.js';

class NeighborhoodMap extends Component {

state = {
    "open" : true,
    "show" : true,
    menuOpen : true,
    query : ""
  }


handleChange = (event, checked) => {
  this.setState({ auth: checked });
};

// renderMarkers() {
//   return (this.props.filteredLocationsOnly.map(location => {
//     return (<Marker key={location.key} animation={this.props.google.maps.Animation.DROP} title={location.title} position={location.position} onClick={this.onMarkerClick} name={location.title}/>)
//   }))
// };



render() {

const style = {
       width:  '100%',
       height: '100%'
}

return (<div key={this.props.locations.key}>

<MenuAppBar
      locations = {this.props.locations}
      query = {this.props.query}
      updateQuery = {this.props.updateQuery}
      clearQuery = {this.props.clearQuery}
      updatedFilteredLocations = {this.props.updatedFilteredLocations}
      infoWindowStatus = {this.props.infoWindowStatus}
      showInfoWindowNow = {this.props.showInfoWindowNow}
      rerenderMarkers = {this.rerenderMarkers}
/>

<MapContainer
     style={style}
     filteredLocationsOnly = {this.props.filteredLocationsOnly}
     locations = {this.props.locations}
     showInfoWindowNow = {this.props.showInfoWindowNow}
     closeInfoWindowNow = {this.props.closeInfoWindowNow}
/>


</div>)}}

export default NeighborhoodMap
