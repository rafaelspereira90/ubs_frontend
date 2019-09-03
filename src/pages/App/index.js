import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import { Container } from "./styles";
import MapGL, { GeolocateControl } from "react-map-gl";
import PropTypes from "prop-types";

import debounce from "lodash/debounce";
import api from "../../services/api";

import Properties from "./components/Properties";
import TopBar from "./components/TopBar";
import Searches from "./components/Search";
import { CssBaseline } from '@material-ui/core';

const TOKEN = "pk.eyJ1IjoicmFmYWVsc3BlcmVpcmEiLCJhIjoiY2p6dDNpMnFmMDE5OTNjcDlnN3QzOWU3YyJ9.wxPjEaidDkfyzdPn4TmPbQ";

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
};

class Map extends Component {
    
    static propTypes = {
      containerWidth: PropTypes.number.isRequired,
      containerHeight: PropTypes.number.isRequired
    };

    state = {
        viewport: {
          latitude: -27.2108001,
          longitude: -49.6446024,
          zoom: 14.0,
          bearing: 0,
          pitch: 0
        },
        properties: []
      };

      constructor() {
        super();
        this.updatePropertiesLocalization = debounce(
          this.updatePropertiesLocalization,
          500
        );
      }

      componentDidMount() {
        this.loadProperties();
      }

      updatePropertiesLocalization() {
        this.loadProperties();
      }

      loadProperties = async () => {
        const { latitude, longitude } = this.state.viewport;
        try {
          const response = await api.post("/ubs", {
            "latitude": latitude, 
            "longitude": longitude
          });
          this.setState({ properties: response.data });
        } catch (err) {
          console.log(err);
        }
      };

      render() {
        const { containerWidth: width, containerHeight: height } = this.props;
        const { properties } = this.state;
        return (
          <Fragment>
            <CssBaseline />
            <TopBar />
            <MapGL
              width={width}
              height={height}
              {...this.state.viewport}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxApiAccessToken={TOKEN}
              onViewportChange={viewport => this.setState({ viewport })}
              onViewStateChange={this.updatePropertiesLocalization.bind(this)}
            >
              <GeolocateControl
              style={geolocateStyle}
              positionOptions={{enableHighAccuracy: true}}
              fitBoundsOptions={{maxZoom:14}}
              locate={{maxZoom:14}}
              trackUserLocation={true}
            />
            
              <Properties properties={properties} />

              <Searches searches={properties} />
            </MapGL>
          </Fragment>
        );
      }
}

const DimensionedMap = withRouter(Dimensions()(Map));
const App = () => (
  <Container>
    <DimensionedMap />
  </Container>
);

export default App;