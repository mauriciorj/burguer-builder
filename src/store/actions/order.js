import * as actionType from './actionType';
import axios from '../../axios-order';

export const purchaseBurguerSuccess = (id, orderData) => {
    return{
        type: actionType.PURCHASE_BURGUER_SUCCESS,
        id: id,
        orderData: orderData
    }
};

export const purchaseBurguerFailed = (error) => {
    return{
        type: actionType.PURCHASE_BURGUER_FAILED,
        error: error
    };
};

export const purchaseBurguerStart = () => {
    return{
        type: actionType.PURCHASE_BURGUER_START
    };
};

export const purchaseBurguer = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurguerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurguerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurguerFailed(error));
            });
            //console.log('ContactData -> ' + this.state.ingredients);
    };
};

export const purchaseInit = () => {
    return{
        type: actionType.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) =>{
    return{
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailed = (error) =>{
    return{
        type: actionType.FETCH_ORDERS_FAILED,
        error: error
    };
};

export const fetchOrdersStart = () =>{
    return{
        type: actionType.FETCH_ORDERS_START
    };
};

export const fetchOrders = () =>{
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrdersFailed(error));
        })
    }
}