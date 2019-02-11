import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import "./admin.css";
import Foodorder from "./foodOrder";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      user: [],
      isEdit: true,
      isOrders: false
    };
  }

  // <div className="card-content white-text">

  async componentDidMount() {
    // fetch('http://localhost:8800/api/orders')
    // .then(res => res.json(res))
    //   .then(data => console.log(data))
    await fetch("http://localhost:8800/api/orders")
      .then(response => response.json())
      .then(json => {
        this.setState({
          user: json
        });
        console.log(json);
      });
  }
  async handleDelete(id, ind) {
    console.log(id, ind);
    let arr = this.state.user;
    console.log(arr);
    arr.splice(ind, 1);
    console.log(arr);
    this.setState({
      user: arr
    });
    await fetch("http://localhost:8800/api/orders/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify()
    })
      .then(res => res.json())
      .then(data => {
        console.log("success");
        this.setState({
          user: arr
        });
      })
      .catch(err => console.error(err));
  }
  handleEdit(id, ind) {
    console.log(id, ind);
    let a = this.state.user[ind];
    console.log(a);
    this.setState({
      isOrders: false,
      isEdit: true
    });
  }
  updateOrder(){
    
  }
  render() {
    return (
      <div>
        {this.state.isOrders &&
          this.state.user.map((el, ind) => {
            return (
              <div key={ind} className="ordersList">
                <Card>
                  <CardBody style={{ width: "100%" }}>
                    <CardTitle>
                      <b> Order # </b> {el._id}
                    </CardTitle>
                    <CardSubtitle>Customer Name : {el.name}</CardSubtitle>
                    <CardText>
                      <ul>
                        {el.ORD.map((e, i) => {
                          return (
                            <li key={i}>
                              {e.order.name} * {e.quant} = {e.finalPrice}
                            </li>
                          );
                        })}
                      </ul>
                    </CardText>
                    <CardSubtitle> Conttact # {el.Ph}</CardSubtitle>
                    <CardSubtitle> Customer address: {el.Address}</CardSubtitle>
                    <CardSubtitle> Total : {el.amt}</CardSubtitle>
                    <Button
                      onClick={() => {
                        this.handleEdit(el._id, ind);
                      }}
                    >
                      Edit Order
                    </Button>
                  </CardBody>
                </Card>
                <Button
                  onClick={() => {
                    this.handleDelete(el._id, ind);
                  }}
                >
                  Delete Order
                </Button>
              </div>
            );
          })}
        }
        <div>
          {this.state.isEdit && (
            <div className="EditOrder">
              
              <Foodorder />
              
              <button onClcik={this.updateOrder}className=" btn btn-success"> Update Order</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
