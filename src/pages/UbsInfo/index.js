import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Modal } from "./styles";

class Info extends Component {

    render() {
        return (
            <Modal>
              <Link to="/App">Close</Link>
              <div>
                <img src="https://source.unsplash.com/random" alt="1" />
              </div>
            </Modal>
          );
    }
}

export default withRouter(Info);