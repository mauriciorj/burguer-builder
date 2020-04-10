import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurguerBuilder extends Component {

    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://burguer-builder-10146.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
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
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseCancelledHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinuedHandler = () => {
        //alert('You continued!');

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        let tprice = this.state.totalPrice;

        queryParams.push('price=' + tprice);

        const queryString = queryParams.join('&');
        

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

        //console.log(this.props.totalPrice);
        //console.log('Burguer Buider -> '+ queryString);
    }

    render() {

        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        };

        let orderSummary = null;

        let burger = this.state.error ? <h3>Ingredients can't be loaded :(</h3> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burguer ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        totalPrice={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = 
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelledHandler}
                    purchaseContinued={this.purchaseContinuedHandler}
                    totalPrice={this.state.totalPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (igName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: igName}),
        onIngredientRemoved: (igName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurguerBuilder, axios));