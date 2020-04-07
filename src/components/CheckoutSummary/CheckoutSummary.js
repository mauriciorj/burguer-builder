import React from 'react';
import Burguer from '../Burguer/Burguer';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well :)</h1>
            <Burguer ingredients={props.ingredients} />
            <Button btnType="Success" clicked={props.checkoutContinued}>ORDER NOW</Button>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>

        </div>
    );
}

export default checkoutSummary;