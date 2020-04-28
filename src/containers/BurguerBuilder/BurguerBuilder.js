import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as action from '../../store/actions/index';

const BurguerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const {onInitIngredient} = props;

    useEffect(() => {
        onInitIngredient();
    }, [onInitIngredient]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0 ? false : true;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onsetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseCancelledHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinuedHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    const disableInfo = {
        ...props.ings
    };

    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    };

    let orderSummary = null;

    let burger = props.error ? <h3>Ingredients can't be loaded :(</h3> : <Spinner />

    if (props.ings) {
        burger = (
            <Aux>
                <Burguer ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disableInfo}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    totalPrice={props.price}
                    isAuth={props.isAuthenticated} />
            </Aux>
        );
        orderSummary =
            <OrderSummary
                ingredients={props.ings}
                purchaseCancelled={purchaseCancelledHandler}
                purchaseContinued={purchaseContinuedHandler}
                totalPrice={props.price} />
    }

    // if (loading) {
    //     orderSummary = <Spinner />;
    // }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        price: state.burguerBuilder.totalPrice,
        error: state.burguerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch(action.addIngredients(igName)),
        onIngredientRemoved: (igName) => dispatch(action.removeIngredients(igName)),
        onInitIngredient: () => dispatch(action.initIngredients()),
        onInitPurchase: () => dispatch(action.purchaseInit()),
        onsetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurguerBuilder, axios));