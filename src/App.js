import React, { Component } from 'react';
import './css/App.css';
import './css/Custom.css';
import NeighborhoodMap from './neighborhoodMap';
import 'typeface-roboto';
import escapeRegEx from 'escape-string-regexp';

class App extends Component {

state = {
  screen : "/",
  myAnimation : true,
  menuOpen : true,
  filteredLocationsOnly : [],
  query : ' ',
  mapChangedFlag : false,
  locations : [
        {
        position: {lat: 41.3029876, lng: -72.9191306},
        title: "Pepe's Pizza",
        mappy: '',
        key : 0,
        infoWindow :
            {
              content : "Loading...",
              contentUrl : "",
              infoWindowStatus: false,
              animation : "BOUNCE"
            }
        },

        {
        position: {lat: 41.307532, lng: -72.9211548},
        title: "Lucibello's Bakery",
        mappy: '',
        key: 1,
        infoWindow :
            {
              content : "Loading...",
              contentUrl : "",
              infoWindowStatus : false,
              animation : "BOUNCE"
            }
        },

        {
        position: {lat: 41.3083454, lng: -72.9195059},
        title: "Present & Perform",
        mappy: "",
        key : 2,
        infoWindow :
            {
              content : "Loading...",
              contentUrl : "",
              infoWindowStatus : false,
              animation : "BOUNCE"
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
              contentUrl : "",
              infoWindowStatus: false,
              animation : "BOUNCE"
            }
        },

        {
        position: {lat: 41.3069746, lng: -72.9219505},
        title: 'New Haven Fire Station',
        mappy: '',
        key : 4,
        infoWindow :
            {
              content : ["Loading" , "..."],
              contentUrl : "",
              infoWindowStatus: false,
              animation : "BOUNCE"
            }
        }
    ]
}

// TODO: separate data into external data file.

componentDidMount(){

this.setState({
    filteredLocationsOnly : this.state.locations
  })
}

// Launches Info Window on Google Map
showInfoWindowNow(locationSelected){
    let myKey;

    this.state.locations.filter( (location) =>{
       if (locationSelected.name === location.title || locationSelected.title === location.title){
         myKey = location.key;
         return location
       }
    } );
    this.updateInfoWindowContentAgain(myKey);

const updatedLocations = [...this.state.locations];
updatedLocations[myKey].infoWindow = { ...updatedLocations[myKey].infoWindow, infoWindowStatus: true };

 this.setState(
       {
         locations: updatedLocations,
         myAnimation : true
       }
 );

// THIS DODGEY CODE WORKS BUT MUTATES STATE DIRECLTY
// https://stackoverflow.com/questions/51250518
// this.state.locations[myKey].infoWindow.infoWindowStatus = true;
// this.forceUpdate()

} //showInfoWindowNow


// Close Info Window on Google Map
closeInfoWindowNow(locationSelected){
  this.forceUpdate()
}

// Update Content for Info Window
updateInfoWindowContentAgain(myKey){
  return this.getInfoWindowContent(this.state.locations[myKey].title, myKey);
}

// Update Content for Info Window sub-function
getInfoWindowContent(searchTerm, myKey){
var nytAuthKey = "3d6801dab968446787ea71d5042ad8f7";
var myNewYorkTimesUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=${nytAuthKey}&q=${searchTerm}`

var contentForLocation;
var contentUrl;

fetch(myNewYorkTimesUrl)
  .then(response => response.json() )
    .then(data => {
        return addArticles(data);
  }
 ).then( content => {


 const updatedLocations = [...this.state.locations];
 updatedLocations[myKey].infoWindow = { ...updatedLocations[myKey].infoWindow, content: contentForLocation };
 updatedLocations[myKey].infoWindow = { ...updatedLocations[myKey].infoWindow, contentUrl: contentUrl };
  this.setState(
        {
          locations: updatedLocations
        }
  )
 }
 ).catch(error => {
         console.log("Error: ", error);
           const updatedLocations = [...this.state.locations];
           updatedLocations[myKey].infoWindow = { ...updatedLocations[myKey].infoWindow, content: "Content Not Available - Try Again Later" };
           updatedLocations[myKey].infoWindow = { ...updatedLocations[myKey].infoWindow, contentUrl: "No Link For You!" };

            this.setState(
                  {
                    locations: updatedLocations
                  }
            );
            console.log(this.state.locations);
 });


// add text from fetch request
function addArticles(data){
  if (data.response && data.response.docs && data.response.docs.length > 1){
    const articles = data.response.docs;
    // var content, contentUrl;
    let infoWindow  = {};

      articles.map(article => {
          infoWindow.content = `${article.snippet}`;
          infoWindow.contentUrl = `${article.web_url}`;
          contentForLocation = `${article.snippet}`;
          contentUrl = `${article.web_url}`;
          return infoWindow;
    });
  }
}  //addArticles

} // getInfoWindowContent
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
        this.setState({query : ''});

}

updateQuery = (query) => {
          this.setState({query : query.trim()})
          this.filterLocations(query);
}

render() {
 return (
  <div className="App">
        <NeighborhoodMap
        menuOpen = {this.state.menuOpen}
        myAnimation = {this.state.myAnimation}
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
   </div>

    ) // return
  }// render
} // Component

export default App;
