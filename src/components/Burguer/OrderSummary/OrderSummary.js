import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {

    // componentWillUpdate(){
    //     //console.log('[Order Summary] WillUpdate')
    // }


        const ingredientSummary = Object.keys(props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>{props.ingredients[igKey]}</li>
                )
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burguer with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: $<strong>{props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
                <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            </Aux >

        );
}

export default OrderSummary;