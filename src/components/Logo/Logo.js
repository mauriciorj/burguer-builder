import React from 'react';
import classes from './Logo.module.css';
import burguerLogo from '../../assets/images/burguer-logo.png';

const logo = (props) => (

    <div className={classes.Logo}>
        <img src={burguerLogo} alt="My Burguer" />
    </div>

);

export default logo;