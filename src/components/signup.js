import React, { Component } from "react";
import { connect } from "react-redux";
import '../App.css'

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      userName: "",
      password: ""
    };

    this.signup = this.signup.bind(this);
    this._onChangeEmail = this._onChangeEmail.bind(this);
    this._onChangeUserName = this._onChangeUserName.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
  }

  signup() {
    let user = {
      email: this.state.email,
      username: this.state.userName,
      password: this.state.password
    };
    this.setState({
      email: "",
      userName: "",
      password: ""
    });
    this.props.signupwithEmailPassword(user);
  }
  _onChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  _onChangeUserName(event) {
    this.setState({
      userName: event.target.value
    });
  }
  _onChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }
  HandleOrder(){
    this.props.history.push("order/")
  }

  render() {
    return (
      <div className="front-Page">

      <div> <h1 className="Heading_main">Foodies Sangat  </h1> </div>
        <Button color="danger" size="lg" block onClick={this.HandleOrder.bind(this)}>
         Book Order
        </Button>
        
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    // userName: state.root.userName
  };
}


export default connect(
  mapStateToProp,
)(Signup);
