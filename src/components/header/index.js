import React, { PureComponent } from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  UncontrolledDropdown,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { fetchAccount, logout } from '../../actions/account';

class Header extends PureComponent {
  componentWillMount() {
    const { getAccount } = this.props;
    getAccount();
  }

  handleLogout(e) {
    e.preventDefault();
    const { logoutAction, goToLogin } = this.props;
    logoutAction();
    goToLogin();
  }

  render() {
    const { profile } = this.props;
    return (
      <Nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">JetBase</Link>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown direction="down">
            <DropdownToggle nav className="p-3">
              {profile ? profile.email : ''}
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem href="/#/account">
                <i className="fa fa-user" />
                {' Profile'}
              </DropdownItem>
              <DropdownItem href="/#/password">
                <i className="fa fa-wrench" />
                {' Change password'}
              </DropdownItem>
              <DropdownItem onClick={e => this.handleLogout(e)}>
                <i className="fa fa-lock" />
                {' Logout'}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Nav>
    );
  }
}

Header.propTypes = {
  getAccount: PropTypes.func.isRequired,
  goToLogin: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
  profile: PropTypes.oneOf(PropTypes.object),
};

Header.defaultProps = {
  profile: {},
};

const mapStateToProps = ({ account }) => ({ profile: account.profile });

const mapDispatchToProps = dispatch => bindActionCreators({
  getAccount: () => fetchAccount(),
  logoutAction: () => logout(),
  goToLogin: () => push('/login'),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
