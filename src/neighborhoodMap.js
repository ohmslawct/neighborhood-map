import React, {Component} from 'react'
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

<MapContainer
     style={style}
     filteredLocationsOnly = {this.props.filteredLocationsOnly}
     locations = {this.props.locations}
     showInfoWindowNow = {this.props.showInfoWindowNow}
     closeInfoWindowNow = {this.props.closeInfoWindowNow}
     updateQuery = {this.props.updateQuery}
     query = {this.props.query}
/>


</div>)}}

export default NeighborhoodMap
