import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurguerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
    }

    remIngredienthandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updateCount = oldCount - 1;
            const updateIngredients = {
                ...this.state.ingredients
            };
            updateIngredients[type] = updateCount;

            const priceReduce = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceReduce;

            this.setState({ totalPrice: newPrice, ingredients: updateIngredients })
        } else {
            return
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseCancelledHandler = () =>{
        this.setState({purchasing: false})
    }

    purchaseContinuedHandler = () => {
        //alert('You continued!');
        
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
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
            this.setState({loading: false, purchasing: false});
            //console.log(response);
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});
        });
    }

    render() {

        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        };

        let orderSummary = 
            <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelledHandler}
            purchaseContinued={this.purchaseContinuedHandler}
            totalPrice={this.state.totalPrice} />;

        if (this.state.loading){
            orderSummary = <Spinner />;
        }

        return (
            <Aux>                
                <Burguer ingredients={this.state.ingredients} />
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.remIngredienthandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    totalPrice={this.state.totalPrice} />
            </Aux>
        );
    }

}

export default WithErrorHandler(BurguerBuilder, axios);