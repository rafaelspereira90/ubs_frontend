import React from "react";
import { Marker } from "react-map-gl";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Pin } from "./styles";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import {
    createMuiTheme,
    MuiThemeProvider
  } from "@material-ui/core/styles";

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "1.2em",
          color: "black",
          backgroundColor: "white",
          border: '1px solid #01CDD4'
        },
        Typography: {
            color: '#01CDD4'
        }
      }
    }
  });

const Properties = ({ properties }) =>
  properties.map(property => (
    <Marker
      key={property.id}
      longitude={property.geocode.lon}
      latitude={property.geocode.lat}
    >
        <MuiThemeProvider theme={theme}>
            <Tooltip placement="top" title={
                <React.Fragment>
                    <Typography style={{ color: "#01CDD4" }}>{ property.name }</Typography>
                    <em>{ property.address }</em>
              </React.Fragment>
            }>
            <Pin>
                <Link to="#">
                    {property.id}
                </Link>
            </Pin>
        </Tooltip> 
        </MuiThemeProvider>
       
      
    </Marker>
  ));

  Properties.propTypes = {
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.long,
        name: PropTypes.string,
        address: PropTypes.number,
        geoCode: {
            lat: PropTypes.number,
            lon: PropTypes.number
        }
    })
    ).isRequired,
    match: PropTypes.shape({
        url: PropTypes.string
    })
  };
  
  export default Properties;