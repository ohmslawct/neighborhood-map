import React, { Component } from 'react';
import './css/App.css';
import './css/Custom.css';
import NeighborhoodMap from './neighborhoodMap';
import Map from './mapComponent';
import GoogleMapReact from 'google-map-react';
import 'typeface-roboto';
import escapeRegEx from 'escape-string-regexp';
import { Route } from 'react-router-dom';
//import update from 'react-addons-update';


class App extends Component {

state = {
  screen : "/",
  menuOpen : true,
  filteredLocationsOnly : [],
  query : ' ',
  mapChangedFlag : false,
  locations : [
        {
        position: {lat: 41.3029876, lng: -72.9191306},
        title: "Pepe's Pizza",
        mappy: '',
        infoWindowStatus: false,
        key : 0,
        infoWindow :
            {
              content : "Loading...",
              contentUrl : ""
            }
        },

        {
        position: {lat: 41.307532, lng: -72.9211548},
        title: "Lucibello's Bakery",
        mappy: '',
        infoWindowStatus: false,
        key : 1,
        infoWindow :
            {
              content : "Loading...",
              contentUrl : ""
            }
        },

        {
        position: {lat: 41.3083454, lng: -72.9195059},
        title: 'Present & Perform',
        mappy: '',
        infoWindowStatus: false,
        key : 2,
        infoWindow :
            {
              content : "Loading...",
              contentUrl : ""
            }
        },

        {
        position: {lat: 41.30839, lng: -72.9331467},
        title: 'Yale Art Gallery',
        mappy: '',
        infoWindowStatus: false,
        key : 3,
        infoWindow :
            {
              content : "Loading...",
              contentUrl : ""
            }
        },

        {
        position: {lat: 41.3069746, lng: -72.9219505},
        title: 'New Haven Fire Station',
        mappy: '',
        infoWindowStatus: false,
        key : 4,
        infoWindow :
            {
              content : "Loading...",
              contentUrl : ""
            }
        }
    ]
}

componentDidMount(){

this.setState({
    filteredLocationsOnly : this.state.locations
  })

}

showInfoWindowNow(locationSelected){
    let myKey;

    let matchingLocation = this.state.locations.filter( (location) =>{
       if (locationSelected.name == location.title){
         myKey = location.key;
         return location
       } else return;
    } );
    this.updateInfoWindowContentAgain(myKey);


    this.state.locations[myKey].infoWindowStatus = true;
    this.forceUpdate()
}

closeInfoWindowNow(locationSelected){
  this.forceUpdate()
}

updateInfoWindowContentAgain(myKey){
  return this.getInfoWindowContent(this.state.locations[myKey].title, myKey);
}

getInfoWindowContent(searchTerm, myKey){
var nytAuthKey = "3d6801dab968446787ea71d5042ad8f7";
var myNewYorkTimesUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=${nytAuthKey}&q=${searchTerm}`

var contentForLocation;
var contentUrl;

let content = fetch(myNewYorkTimesUrl)
  .then(response => response.json() )
    .then(data => {
        return addArticles(data);
  }
 )
 .catch(error => requestError(error, 'articles'));


function addArticles(data){
  if (data.response && data.response.docs && data.response.docs.length > 1){
    const articles = data.response.docs;
    var content, contentUrl;
    let infoWindow  = {};

      articles.map(article => {

          infoWindow.content = `${article.snippet}`;
          infoWindow.contentUrl = `${article.web_url}`;

          contentForLocation = `${article.snippet}`;
          contentUrl = `${article.web_url}`;

          return infoWindow;
        //  return contentForLocation = `${article.snippet}`;
         // contentUrl = `${article.web_url}`;
         // console.log("content url", article.web_url)
    });
  }
//  return content;
}  //addArticles



function requestError(error, part) {
  // console.log("Error: ", error);
}


content.then( content => {
  this.state.locations[myKey].infoWindow.content = contentForLocation;
  this.state.locations[myKey].infoWindow.contentUrl = contentUrl;
  this.forceUpdate()
  // update setState
}


)} // getInfoWindowContent
// end Nyt


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

    <Route exact path="/" render={() => (
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
        infoWindowStatus = {this.state.infoWindowStatus}
        showInfoWindowNow = { (location) => {
          this.showInfoWindowNow(location)
        }}
        closeInfoWindowNow = { (location) => {
          this.closeInfoWindowNow(location)
        }}
        updateInfoWindowContentAgain = { (id) => {
          this.updateInfoWindowContentAgain(id)
        }}
        infoWindow = {this.state.infoWindow}
        />

      )}/>

   </div>

    ) // return
  }// render
} // Component

export default App;
