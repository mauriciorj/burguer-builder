import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';

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
        totalPrice: 4
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

    render() {

        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        };


        return (
            <Aux>
                <Burguer ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.remIngredienthandler}
                    disabled={disableInfo} />
            </Aux>
        );
    }

}

export default BurguerBuilder;