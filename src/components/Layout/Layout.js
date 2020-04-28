import React, { useState } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const SideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false)
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }


        return (
            <Aux>
                <Toolbar 
                drawerToggleClicked={sideDrawerToggleHandler} 
                isAuth={props.isAuthenticated} />
                <SideDrawer
                isAuth={props.isAuthenticated} 
                open={sideDrawerIsVisible} 
                closed={SideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);