import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";

import "bootstrap/dist/css/bootstrap.min.css";

import "../App.css";
import { forder } from "../store/action/action";


class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      Contect: "",
      Address: "",
      isDone: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    console.log(this.props.Order);
    console.log(this.props.amount);
  }
  handleChange(e){
    this.setState({
        [e.target.name]:e.target.value
    })
  
}
handleSubmit(e){
  e.preventDefault()
  let ORD = this.props.Order
  let name =this.state.name
  let Ph =this.state.Contect
  let Address =this.state.Address
  let amt= this.props.amount
 let Oredrs={
   id: uuid(),
     ORD,
    name,
    Ph,
    Address,
    amt
 }

//  let data = this.props.finalOrder
//  data.push(Oredrs);
// this.props.forder(data)
console.log(Oredrs)
}

  render() {
    return (
      <div className="FinalOrder">
        <h1>Your Order</h1>

        {this.props.Order.map((order, index) => {
          return (
            <div key={index} className="orderSlip">
              {order.order.name} * {order.quant} = {order.FinalPrice}
            </div>
          );
        })}
        <h2>total Amount = {this.props.amount} </h2>
        <form onSubmit={this.handleSubmit}>
        <div className="form">
          <div className="form-group">
            <label >Name:</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
              
              autoFocus="true"
              required="required"
              placeholder="Enter Name here..."
              className="form-control"
              id="usr"
            />
          </div>
          <div className="form-group">
            <label>Contect:</label>
            <input
              value={this.state.Contect}
              type="text"
              onChange={this.handleChange}
              name="Contect"
              required="required"
              placeholder="Enter Contect Number here.."
              className="form-control"
              id="usr"
            />
          </div>
          <div className="form-group">
            <label >Address</label>
            <textarea
              className="form-control"
              onChange={this.handleChange}
              name="Address"
              required="required"
              value={this.state.Address}
       
              placeholder="Enter Address here.."
              id="exampleFormControlTextarea1"
              rows="3"
            />
          </div>
          <button type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-success btn-lg">
            Submitt
          </button>
        </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Order: state.rootReducer.StateOrder,
    amount: state.rootReducer.amount,
    finalOrder: state.rootReducer.DataBaseOrders
  };
}
function mapActionToProps(dispatch){

  return({
     forder:(data)=>{
            dispatch(forder(data))
        },
       
  
  })
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(Info);
