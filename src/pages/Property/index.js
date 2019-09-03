import React, { Component, Fragment } from "react";
import { Container, Infos } from "./styles";
import PropTypes from "prop-types";

import api from "../../services/api";

export default class Property extends Component {
    static propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string
        })
      }).isRequired
    }
    state = {
      property: null,
      loading: false
    };
  
    async componentDidMount() {
      try {
        const { id } = this.props.match.params;
        this.setState({ loading: true });
  
        const { data } = await api.get(`/ubs/${id}`);
        this.setState({ property: data });
      } catch (err) {
        console.log(err);
      } finally {
        this.setState({ loading: false });
      }
    }

    renderProperty() {
        const { property } = this.state;
    
        if (!property) {
          return "Ubs não encontrada!";
        }
        return (
            <Fragment>
              <h1>{property.name}</h1>
              <hr />
              <p>{property.address}</p>
              <Infos>
                <p>{property.city}</p>
              </Infos>
            </Fragment>
          );
        }

        render() {
            const { loading } = this.state;
            return (
              <Container>
                {loading ? <p>Carregando</p> : this.renderProperty()}
              </Container>
            );
          }
        }