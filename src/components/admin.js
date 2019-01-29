import React, { Component } from "react";

export default class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: [
        {
          id: "292729792",
          ORD: [
            { order: "zinger", quant: 2, price: 120 },
            { order: "chicken", quant: 1, price: 1200 },
            { order: "classic chicken", quant: 20, price: 78 },
            { order: "burger", quant: 2, price: 89 }
          ],
          price: 1200,
          name: "umar",
          address: "flat #A4...",
          contact: "10928391317"
        },
        {
          id: "92963429",
          ORD: [
            { order: "zinger", quant: 2, price: 120 },
            { order: "chicken", quant: 1, price: 1200 },
            { order: "classic chicken", quant: 20, price: 78 },
            { order: "burger", quant: 2, price: 89 }
          ],
          price: 1200,
          name: "umar",
          address: "flat #A4...",
          contact: "10928391317"
        },
        {
          id: "7929723972",
          ORD: [
            { order: "zinger", quant: 2, price: 120 },
            { order: "chicken", quant: 1, price: 1200 },
            { order: "classic chicken", quant: 20, price: 78 },
            { order: "burger", quant: 2, price: 89 }
          ],
          price: 1200,
          name: "umar",
          address: "flat #A4...",
          contact: "10928391317"
          
        }
      ]
    };
  }
  render() {
    return (
      <div>
       {this.state.user.map((el,ind)=>{
           return(
               <div>
               =========================
               <ul>
               <li> Ooder Id : {el.id}</li>
               <li> Cutomer Name : {el.name}</li>
               {el.ORD.map((e,i)=>{
                   return(
                      
                       <ul> 
                       <li> {e.order} * 
                      {e.quant} =
                      {e.price}</li>
                       </ul>
                   )
               })}
               <li> contact : {el.contact}</li>
               <li> Customer address: {el.address}</li>
               <li> Total : {el.price}</li>
               </ul>
               ===========================
               </div>
               )
       })}
      </div>
    );
  }
}
