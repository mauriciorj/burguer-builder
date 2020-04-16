import * as actionTypes from '../actions/actionType';
import { updateObject } from '../utility';

export const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){

        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false});

        case actionTypes.PURCHASE_BURGUER_START:
            return updateObject(state, { loading: true});

        case actionTypes.PURCHASE_BURGUER_SUCCESS:    
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return{
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGUER_FAILED:
            return{
                ...state,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAILED:
            return{
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;