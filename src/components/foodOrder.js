import React, { Component } from "react";
import { connect } from "react-redux";
// import { signupAction } from "../store/action/action";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-responsive-modal';
import menu from "./menu";
import { addOrder, calculateTotal } from "../store/action/action";


class Foodorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
          quantity: 1,
         index: 1,
         open: false,
         added:[],
         Orders:[]
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
      let added = this.state.added
      let Orders = this.state.Orders
      added.push(index)
      let order = menu[index]
    let finalPrice= 0;
    let quant= this.state.quantity
    finalPrice = order.price*quant
  

    let finalOrder ={
      order,
      quant,
      finalPrice
    }

   Orders.push(finalOrder)

    console.log(Orders)
    this.setState({
      quantity: 1,
      Orders,
      added
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
 
 this.props.placeOrder(this.state.Orders)

 let totalAmout=0
this.state.Orders.map(order=>{
  totalAmout+=order.finalPrice
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
            
            Quantity<input  onChange={(e)=>this.handleQuantity(e)} min={1} ref={'quantity'+index} type="number" defaultValue='1' name=""/>
            </div>
            <div className="col-md-6">
            {(this.state.added.includes(index))?
              <button onClick={(e)=>this.handleOrder(e,index)} className='btn btn-danger' disabled>Added</button>:
              <button onClick={(e)=>this.handleOrder(e,index)} className='btn btn-success'>Add Order</button>}
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
