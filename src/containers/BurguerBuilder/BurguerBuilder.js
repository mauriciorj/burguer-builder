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
import * as action from '../../store/actions/index';

class BurguerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount(){
        this.props.onInitIngredient();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0 ? false : true;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true });
        }else{
            this.props.onsetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseCancelledHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinuedHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {

        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        };

        let orderSummary = null;

        let burger = this.props.error ? <h3>Ingredients can't be loaded :(</h3> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burguer ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        totalPrice={this.props.price}
                        isAuth={this.props.isAuthenticated} />
                </Aux>
            );
            orderSummary =
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelledHandler}
                    purchaseContinued={this.purchaseContinuedHandler}
                    totalPrice={this.props.price} />
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