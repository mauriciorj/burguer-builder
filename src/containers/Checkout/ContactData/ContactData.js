import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderhandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

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
        
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
            console.log('ContactData -> ' + this.props.ingredients);
    }

    render(){
        let form = (                
        <form>
            <input type="text" name="name" placeholder="Your Name"></input>
            <input type="email" name="email" placeholder="Your email"></input>
            <input type="text" name="street" placeholder="Your Address"></input>
            <input type="text" name="postal" placeholder="Your Postal Code"></input>
            <Button btnType="Success" clicked={this.orderhandler}>FINISH ORDER</Button>
        </form>);

        if(this.state.loading){
            form = <Spinner />;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact Info</h4>
                {form}
            </div>
        );
    }

}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);