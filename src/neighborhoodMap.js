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
