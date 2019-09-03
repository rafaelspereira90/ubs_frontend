import React from 'react';
import SearchField from 'react-search-field';
import { Container } from './styles';
import PropTypes from 'prop-types';

const Searches = ({ searches }) =>
    searches.map(property => (
       <Container key={property.id}>
            <SearchField 
              placeholder='Search item'
              onChange={console.log("mudou search")}
            />
            {property.id}
            {property.name}
            {property.address}
        </Container>
    ));

Searches.propTypes = {
    searches: PropTypes.arrayOf(
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

export default Searches;