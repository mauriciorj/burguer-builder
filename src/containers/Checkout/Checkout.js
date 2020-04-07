import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom'

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let [key, value] of query.entries()) {
            ingredients[key] = + [value];
        }

        this.setState({ingredients: ingredients});

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
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        );
    }

}

export default Checkout;