import React, { Component } from 'react';
import './css/App.css';
import './css/Custom.css';
import NeighborhoodMap from './neighborhoodMap';
import Map from './mapComponent';
import GoogleMapReact from 'google-map-react';
import 'typeface-roboto'
import escapeRegEx from 'escape-string-regexp'



class App extends Component {

state = {
  screen : "/",
  menuOpen : true,
  filteredLocationsOnly : [],
  query : ' ',
  mapChangedFlag : false,
  locations : [
        {
        position: {lat: 41.3092655, lng: -72.9203195},
        title: 'Alpha 0',
        map: '',
        infoWindowContent: "Content 0",
        key : 0
        },

        {
        position: {lat: 41.3052655, lng: -72.9503195},
        title: 'Alpha 1',
        map: '',
        infoWindowContent: "Content 1",
        key : 1
        },

        {
        position: {lat: 41.3492655, lng: -72.9243195},
        title: 'Beta 1',
        map: '',
        infoWindowContent: "Content 2",
        key : 2
        },

        {
        position: {lat: 41.3392659, lng: -72.9343199},
        title: 'Cappa 1',
        map: '',
        infoWindowContent: "Content 3",
        key : 3
        },

        {
        position: {lat: 41.3292655, lng: -72.9503195},
        title: 'Delta 1',
        map: '',
        infoWindowContent: "Content 4",
        key : 4
        }
    ]
}

componentDidMount(){

this.setState({
    filteredLocationsOnly : this.state.locations
  })

}

filterLocations(query){
  const match = new RegExp(escapeRegEx(query), 'i')
  let showingLocations = this.state.locations.filter((location) => {
    return match.test(location.title);
  });

  this.setState({
    filteredLocationsOnly : showingLocations
  })
}  // end filterLocations

clearQuery = () => {
        this.setState({query : ''})
}

updateQuery = (query) => {
          this.setState({query : query.trim()})
          this.filterLocations(query);
}

updatedFilteredLocations(updatedLocationList){
    // console.log("List Updating", updatedLocationList);
    // this.setState({
    //   filteredLocationsOnly : updatedLocationList
    // })
}

render() {
    return (
      <div className="App">

        <NeighborhoodMap
        menuOpen = {this.state.menuOpen}
        locations = {this.state.locations}
        filteredLocationsOnly = {this.state.filteredLocationsOnly}
        query = {this.state.query}
        updateQuery = { (query) => {
          this.updateQuery(query)
        }}
        clearQuery = { () => {
          this.clearQuery()
        }}
        filterLocations = { (query) => {
          this.filterLocations(query)
        }}
        filteredLocationsOnly = {this.state.filteredLocationsOnly}
        />


      </div>
    );
  }
}

export default App;
