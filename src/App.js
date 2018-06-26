import React, { Component } from 'react';
//import logo from './logo.svg';
import './css/App.css';
import './css/Custom.css';
//import { Route } from 'react-router-dom';
//import { instanceOf } from 'prop-types';
import NeighborhoodMap from './neighborhoodMap';
import Map from './mapComponent';
//import Container from './container';
import GoogleMapReact from 'google-map-react';
import 'typeface-roboto'
import escapeRegEx from 'escape-string-regexp'





class App extends Component {


state = {
  screen : "/",
  menuOpen : false,
  filteredLocationsOnly : [],
  query : ' ',
  mapChangedFlag : false,
  locations : [
        {
        position: {lat: 41.3092655, lng: -72.9203195},
        title: 'Alpha 0',
        map: '',
        infoWindowContent: "Content 0"
        },

        {
        position: {lat: 41.3052655, lng: -72.9503195},
        title: 'Alpha 1',
        map: '',
        infoWindowContent: "Content 1"
        },

        {
        position: {lat: 41.3492655, lng: -72.9243195},
        title: 'Beta 1',
        map: '',
        infoWindowContent: "Content 2"
        },

        {
        position: {lat: 41.1092655, lng: -72.8203195},
        title: 'Cappa 1',
        map: '',
        infoWindowContent: "Content 3"
        },

        {
        position: {lat: 41.3292655, lng: -72.9503195},
        title: 'Delta 1',
        map: '',
        infoWindowContent: "Content 4"
        }
    ]




}

componentDidMount(){
}

handleMenuToggle(){
  console.log("Menu Toggled from handleMenuToggle");
  console.log("Menu State:", this.state.menuOpen);

//  this.setState({menuOpen: !this.state.menuOpen});
}

addMarkers(myMap){
console.log("Adding Markers");

// Add the Google Map property to the locatoions
this.state.locations.map( (location) => {
  location.map = (myMap);
});

this.state.filteredLocationsOnly.map( (filteredLocationsOnly) => {
  filteredLocationsOnly.map = (myMap);
});






if(this.state.filteredLocationsOnly>=1){
  console.log("Here Now");
  this.setState(
    {locations : this.state.filteredLocationsOnly }
  )
} else{
  this.setState(
    {locations : this.state.locations}
)}



      // this.setState(state => (
      //      {
      //      locations : [
      //            {
      //            position: {lat: 41.3092655, lng: -72.9203195},
      //            title: 'Alpha 0',
      //            map: myMap,
      //            infoWindowContent: "Content 0"
      //            },
      //
      //            {
      //            position: {lat: 41.3052655, lng: -72.9503195},
      //            title: 'Alpha 1',
      //            map: myMap,
      //            infoWindowContent: "Content 1"
      //            },
      //
      //            {
      //            position: {lat: 41.3492655, lng: -72.9243195},
      //            title: 'Beta 1',
      //            map: myMap,
      //            infoWindowContent: "Content 2"
      //            },
      //
      //            {
      //            position: {lat: 41.1092655, lng: -72.8203195},
      //            title: 'Cappa 1',
      //            map: myMap,
      //            infoWindowContent: "Content 3"
      //            },
      //
      //            {
      //            position: {lat: 41.3292655, lng: -72.9503195},
      //            title: 'Delta 1',
      //            map: myMap,
      //            infoWindowContent: "Content 4"
      //            }
      //        ]
      //    }
      //   ));






}






clearQuery = () => {
        this.setState({query : ''})
    }



filterLocations(query){
  const match = new RegExp(escapeRegEx(query), 'i')
  let showingLocations = this.state.locations.filter((location) => {
    return match.test(location.title);
  });

  this.setState({
    filteredLocationsOnly : showingLocations
  })

  console.log(showingLocations, "DOES THIS RUN?");





}  // end filterLocations





updateQuery = (query) => {
      this.setState({query : query.trim()})
      this.filterLocations(query);
    }


checkFilter(){
  console.log("Checking Filter", this.state.filteredLocationsOnly);
  //this.forceUpdate()


if(this.state.mapChangedFlag != false){

  if(this.state.filteredLocationsOnly>=1){
    console.log("Here Now");
    this.setState(
      {locations : this.state.filteredLocationsOnly }
    )
  } else{
    this.setState(
      {locations : this.state.locations}
  )}

}






}


updateMapChangedFlag(myStatus){



}



updatedFilteredLocations(updatedLocationList){

    console.log("Listage Updating", updatedLocationList);

    this.setState({
      filteredLocationsOnly : updatedLocationList
    })


  console.log(this.state.filteredLocationsOnly);





}








render() {

  console.log(this.state.locations);

    return (
      <div className="App">

        <Map

        />

        <NeighborhoodMap
        menuOpen = {this.state.menuOpen}
        locations = {this.state.locations}
        filteredLocationsOnly = {this.state.filteredLocationsOnly}
        query = {this.state.query}
        addMarkers = { (myMap) => {
          this.addMarkers(myMap)
        }}
        handleMenuToggle = { (e) => {
          this.handleMenuToggle(e)
        }}
        updateQuery = { (query) => {
          this.updateQuery(query)
        }}
        clearQuery = { () => {
          this.clearQuery()
        }}
        filterLocations = { (query) => {
          this.filterLocations(query)
        }}
        checkFilter = {
          this.checkFilter()
        }
        updatedFilteredLocations = { (locationList) => {
            this.updatedFilteredLocations(locationList)
          }
        }
        filteredLocationsOnly = {this.state.filteredLocationsOnly}
        mapChangedFlag = {this.state.mapChangedFlag}

        />



      </div>
    );
  }
}

export default App;
