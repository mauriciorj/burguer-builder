import React from 'react';
import classes from './Burguer.module.css';
import BurguerIngredient from './BurguerIngredient/BurguerIngredient';

const burguer = (props) => {

    let transformedIngredientes = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurguerIngredient key={igKey + i} type={igKey} />;
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if(transformedIngredientes.length === 0){
        transformedIngredientes = <p>Please start adding ingredients!</p>
    }
    
    return(
        <div className={classes.Burguer}>
            <BurguerIngredient type="bread-top"/>
            {transformedIngredientes}
            <BurguerIngredient type="bread-bottom"/>
        </div>
    );

};

export default burguer;