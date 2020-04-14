import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderhandler = (event) => {
        event.preventDefault();

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: {
                firstName: 'Primeiro Nome',
                lasteName: 'Ultimo Nome',
                address: {
                    street: 'Toronto',
                    zipCode: '1111',
                    country: 'Canada'
                },
                email: 'teste@teste.com'
            }
        }
        this.props.onOrderBurguer(order);
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name"></input>
                <input type="email" name="email" placeholder="Your email"></input>
                <input type="text" name="street" placeholder="Your Address"></input>
                <input type="text" name="postal" placeholder="Your Postal Code"></input>
                <Button btnType="Success" clicked={this.orderhandler}>FINISH ORDER</Button>
            </form>);

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Info</h4>
                {form}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        price: state.burguerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurguer: (orderData) => dispatch(actions.purchaseBurguer(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));