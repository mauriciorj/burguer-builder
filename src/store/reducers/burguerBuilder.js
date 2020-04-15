import * as actionTypes from '../actions/actionType';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updateIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState);

        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: initialState.totalPrice,
                building: false
            }

        case actionTypes.FECTH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }

        default:
            return state;
    }
};

export default reducer;