import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
];

const buildControls = (props) => (
    
    <div className={classes.BuildControls}>
        {controls.map(ctrl => 
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            remo={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
             />
        )}
    </div>
);

export default buildControls;