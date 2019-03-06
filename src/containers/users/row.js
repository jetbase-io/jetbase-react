import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

class UserRow extends Component {
  getBadge(status) {
    return status === 0 ? 'secondary' : 'success';
  }

  link() {
    const { user } = this.props;
    return `/users/${user.id}`;
  }

  render() {
    const { user } = this.props;
    return (
      <tr key={user.id.toString()}>
        <th scope="row"><Link to={this.link()}>{user.id}</Link></th>
        <td><Link to={this.link()}>{user.firstName}</Link></td>
        <td><Link to={this.link()}>{user.lastName}</Link></td>
        <td>{user.email}</td>
        <td>
          <Link to={this.link()}>
            <Badge color={this.getBadge(user.status)}>success</Badge>
          </Link>
        </td>
      </tr>
    );
  }
}

UserRow.propTypes = {
  user: PropTypes.oneOf(PropTypes.object),
};

UserRow.defaultProps = {
  user: {},
};

export default UserRow;
