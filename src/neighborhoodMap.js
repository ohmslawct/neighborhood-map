import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Delete from '@material-ui/icons/Delete';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
//import { mailFolderListItems, otherMailFolderListItems } from './tileData';
//import TemporaryDrawer from './temporaryDrawer.js';
import ButtonAppBar from './ButtonAppBar.js';
import MenuAppBar from './MenuAppBar.js';
//import AppBar from './AppBar.js';
import LeftDrawer from './LeftDrawer';
import escapeRegEx from 'escape-string-regexp'

import GoogleMapReact from 'google-map-react';

import {GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './mapContainer.js';




const propTypes = {
  locations : PropTypes.array
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

let myFiteredLocations = "none";
console.log (myFiteredLocations);


class NeighborhoodMap extends Component {

  static defaultProps = {
    center: {
      lat: 41.314941,
      lng: -72.9078257
    },
    zoom: 11
  };


state = {
    "open" : false,
    "show" : null,
    menuOpen : false,
    query : "alpha"
  }








renderMarkers(map, maps) {

var myMap = map;
  var myMaps = maps;


this.props.addMarkers(map);

this.props.locations.map(location => {
    let marker = new maps.Marker(location)
    let infowindow = new maps.InfoWindow({
          content: location.infoWindowContent
        });
   marker.addListener('click', function() {
                 infowindow.open(map, marker);
               });
})

};

renderMarkersAgain(){
console.log("Rendering Markers Again!");


}


render() {
 return (<div>




  <MapContainer

  />

  <div ref="map" />



<MenuAppBar
      locations = {this.props.locations}
      query = {this.props.query}
      updateQuery = {this.props.updateQuery}
      clearQuery = {this.props.clearQuery}
      updatedFilteredLocations = {this.props.updatedFilteredLocations}
      renderMarkersAgain = {this.renderMarkersAgain}
/>

<div style={{ height: '100vh', width: '100%' }}>










      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBDsB6fa3n0w6FoZk4_r7zG3cGl7xjZ3dY' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onGoogleApiLoaded={({map, maps}) => {
          this.renderMarkers(map, maps)
        }
        }
        yesIWantToUseGoogleMapApiInternals={true}
      >
        <AnyReactComponent
          lat={41.314941}
          lng={-72.9078257}
          text={'.'}
        />
      </GoogleMapReact>


</div>




</div>)}}

export default NeighborhoodMap
