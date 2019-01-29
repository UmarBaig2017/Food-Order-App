// import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    name : "",
    StateOrder: [],
    address: "",
    amount:0,
    status: "",
    DataBaseOrders: []
}

export default (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case 'ADD_ORDER':
        let data = action.payload
        return {...state,StateOrder:data}
        case 'FINAL_ORDERS':
        
        return {...state,DataBaseOrders:action.payload}
        case 'CALCULATE_TOTAL':
        return {...state,amount:action.payload}
        case 'ADD_INFO':
        return{...state,...action.payload}
        default:
        return state
    }
}