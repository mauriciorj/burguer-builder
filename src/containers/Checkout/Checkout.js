import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

const Checkout = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedhandler = () => {
        props.history.replace('/checkout/contact-data');
    }

        let summary = <Redirect to="/" />
        if (props.ings) {
            const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={props.ings}
                        checkoutCancelled={checkoutCancelledHandler}
                        checkoutContinued={checkoutContinuedhandler} />
                    <Route
                        path={props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);