import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render(){
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact Info</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name"></input>
                    <input type="email" name="email" placeholder="Your email"></input>
                    <input type="text" name="street" placeholder="Your Address"></input>
                    <input type="text" name="postal" placeholder="Your Postal Code"></input>
                    <Button btnType="Success">FINISH ORDER</Button>
                </form>
            </div>
        );
    }

}

export default ContactData;