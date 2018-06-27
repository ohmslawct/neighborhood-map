


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
