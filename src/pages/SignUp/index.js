import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import Logo from "../../assets/logo.png";

import { Form, Container } from "./styles";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    
    if (!name || !email || !password) {
        this.setState({ error: "Preencha todos os dados para se cadastrar" });
      } else {
          try {
            await api.post("/user", { name, email, password });
            this.props.history.push("/");
          } catch(err) {
            console.log(err);
            this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
          }
      }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="UserName"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Register</button>
          <hr />
          <Link to="/">Login</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);