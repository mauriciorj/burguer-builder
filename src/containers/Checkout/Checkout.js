import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom'

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {

        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0; 

        for (let [key, value] of query.entries()) {
            if((key) === 'price'){
                price = (value);
            }else{
                ingredients[key] = +[value];
            }
        }

        this.setState({ingredients: ingredients, totalPrice: price});
        // console.log(ingredients);
        // console.log(price);
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedhandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedhandler} />
                <Route 
                path={this.props.match.path + '/contact-data'} 
                render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}/>
            </div>
        );
    }

}

export default Checkout;