import React, { useEffect } from 'react';
import Order from '../../components/Order/Order'; 
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {

    const{onFetchOrders} = props;

    useEffect(() =>{
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders]);

        let order = <Spinner />
        if(!props.loading){
            order = 
                props.orders.map(order => (
                    <Order
                    key={order.key}
                    ingredients={order.ingredients}
                    price={order.price} />
                ))
            } 
            
        return(
            <div>
                {order}        
            </div>
        );
};

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token, userId) => dispatch(action.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));