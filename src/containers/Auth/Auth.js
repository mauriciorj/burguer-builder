import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

const Auth = props => {

    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'Mail Address'
            },
            value: '',
            validation: {
              required: true,
              isEmail: true
            },
            valid: false,
            touched: false
          },
          password: {
            elementType: 'input',
            elementConfig: {
              type: 'password',
              placeholder: 'Password'
            },
            value: '',
            validation: {
              required: true,
              minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isSignup, setIsSignup] = useState(true);

    const{buildingBurguer, authRedirectPath, onSetAuthRedirectPath} = props;

    useEffect(() => {
        if (!buildingBurguer && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurguer, authRedirectPath, onSetAuthRedirectPath]);

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    const inputChangeHandler = (event, controlName) => {
        const updateControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            }
        };
        setAuthForm(updateControls);
    }

    const submithandler = event => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }


        const formElemenstArray = [];
        for (let key in authForm) {
            formElemenstArray.push({
                id: key,
                config: authForm[key]
            });
        }

        let form = formElemenstArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangeHandler(event, formElement.id)} />

        ));

        if (props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (props.error) {
            errorMessage = (
                <p>{props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (props.isAuthenticated) {
            authRedirect = <Redirect to={props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submithandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger" clicked={switchAuthModeHandler}>Switch to {isSignup ? 'Sign In' : 'Sign Up'}</Button>
            </div>
        );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurguer: state.burguerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (name, password, isSignUp) => dispatch(actions.auth(name, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);