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
import ButtonAppBar from './ButtonAppBar.js';
import MenuAppBar from './MenuAppBar.js';
import LeftDrawer from './LeftDrawer';
import escapeRegEx from 'escape-string-regexp'
import GoogleMapReact from 'google-map-react';
import {GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './mapContainer.js';


const propTypes = {
  locations : PropTypes.array
};

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

return (<div>

<MenuAppBar
      locations = {this.props.locations}
      query = {this.props.query}
      updateQuery = {this.props.updateQuery}
      clearQuery = {this.props.clearQuery}
      updatedFilteredLocations = {this.props.updatedFilteredLocations}
      infoWindowStatus = {this.props.infoWindowStatus}
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
