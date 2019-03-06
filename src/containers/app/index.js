import React, { Component, Suspense } from 'react';
import {
  Redirect, Route, Switch, withRouter,
} from 'react-router-dom';
import {
  Container,
  Row,
} from 'reactstrap';
import PropTypes from 'prop-types';

import routes from '../../routes';
import Header from '../../components/header/index';
import Sidebar from '../../components/sidebar/index';
import Login from '../login';
import { userSession } from '../../helpers/user';
import ability, { defineRulesFor } from '../../ability';

class App extends Component {
  componentWillMount() {
    const session = userSession();
    if (session) {
      const user = JSON.parse(session);
      const { permissions } = user;
      if (permissions) {
        ability.update(defineRulesFor(user.permissions));
      }
    }
  }

  loading() {
    return (<div className="animated fadeIn pt-1 text-center">Loading...</div>);
  }

  signOut(e) {
    const { history } = this.props;
    e.preventDefault();
    history.push('/login');
  }

  render() {
    const { location } = this.props;
    if (userSession()) {
      return (
        <div className="app">
          <Suspense fallback={this.loading()}>
            <Header onLogout={e => this.signOut(e)} />
          </Suspense>
          <Container fluid>
            <Row>
              <Suspense fallback={this.loading()}>
                <Sidebar location={location} />
              </Suspense>
              <main className="col-md-9 ml-sm-auto col-lg-10 px-4" role="main">
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {routes.map(route => (route.component ? (
                      <Route
                        key={route.name}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          userSession()
                            ? <route.component {...props} />
                            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                        )}
                      />
                    ) : (null)))}
                  </Switch>
                </Suspense>
              </main>
            </Row>
          </Container>
        </div>
      );
    }
    return (<Login />);
  }
}

App.defaultProps = {
  location: { pathname: '' },
};

App.propTypes = {
  history: PropTypes.func.isRequired,
  location: PropTypes.shape(PropTypes.object),
};

export default withRouter(props => <App {...props} />);
