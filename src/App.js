import React, { useEffect, Suspense } from "react";
import Layout from './components/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as action from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
});

const App = props => {

  const {onTryAuthSign} = props;

  useEffect(() => {
    onTryAuthSign();
  }, [onTryAuthSign]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props}/>} />
      <Route path="/" exact component={BurguerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
        <Route path="/orders" render={(props) => <Orders {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props}/>} />
        <Route path="/" exact component={BurguerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuthSign: () => dispatch(action.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
