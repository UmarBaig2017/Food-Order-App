import React, { Component } from "react";
import { connect } from "react-redux";
// import { signupAction } from "../store/action/action";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-responsive-modal';
import menu from "./menu";
import { addOrder, calculateTotal } from "../store/action/action";

let Orders = []
class Foodorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
          quantity: 1,
         index: 1,
         open: false,
         cart:[]
        };
        this.handleOrder= this.handleOrder.bind(this)
    }
    onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false });
    };


    handleOrder(e,index){
      let order = menu[index]
    let FinalPrice= 0;
    let quant= this.state.quantity
    FinalPrice = order.price*quant
  

    let finalOrder ={
      order,
      quant,
      FinalPrice
    }

   Orders.push(finalOrder)

    console.log(Orders)
    this.setState({
      quantity: 1

    })

  }
  handleQuantity(e){
    if(e.target.value<0){
   this.setState({
        quantity: 1
      })
    }
    this.setState({
        quantity:parseInt(e.target.value)
    })
}
handleSubmitt(){
 
 this.props.placeOrder(Orders)

 let totalAmout=0
Orders.map(order=>{
  totalAmout+=order.FinalPrice
 })
 this.props.calculateTotal(totalAmout)

 this.props.history.push("/Info")
 

}
  render() {
    const { open } = this.state;
    return (
        <div>
      <div className="container">
       <h1> Choose Your Meal </h1>
        <div className="row" />
        {menu.map((item, index) => {
          return (
            <div key={index} style={{border:'2px dotted black',borderRadius:'8px'}} className="col-md-12">
            <h2>
                {item.name}
            </h2>
            <h3>Price:{item.price}</h3>
            <div className="row">
            <div className="col-md-3">
            
            Quantity<input  onChange={(e)=>this.handleQuantity(e)} ref={'quantity'+index} type="number" defaultValue='1' name=""/>
            </div>
            <div className="col-md-6">
            <button onClick={(e)=>this.handleOrder(e,index)} className='btn btn-success'>Add Order</button>
            </div>
            </div>

            </div>

          );
        })}
      </div>
      <div>
      <button style={{"float": "right", "marginTop": "-100px" ,"marginLeft": "100px"}} onClick={this.handleSubmitt.bind(this)} className="btn btn-success"> Submitt Order
      </button>
      </div>
      <div>
      <button onClick={this.onOpenModal}>See order</button>
      <Modal open={open} onClose={this.onCloseModal} center>
          {this.props.order.map((item,index)=>{
            return(
            <div key={index}>
            
            <h1> {item.Order}</h1>
            
            </div>

          )})}
          <h1>Total price</h1>
      </Modal>
    </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return({
    order:state.rootReducer.StateOrder,
    
  })
}
function mapActionToProps(dispatch){

  return({
     placeOrder:(Order)=>{
            dispatch(addOrder(Order))
        },
        calculateTotal:(totalAmout)=>{
          dispatch(calculateTotal(totalAmout))
      }
  
  })
}

export default connect(mapStateToProps,mapActionToProps)(Foodorder)
