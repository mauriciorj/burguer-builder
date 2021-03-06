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

export const purchaseBurguer = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurguerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurguerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurguerFailed(error));
            });
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

export const fetchOrders = (token, userId) =>{
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
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
        console.log('/orders.json' + queryParams);
    }
}