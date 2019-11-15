import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Table,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';

import UserRow from './row';

class Users extends React.Component {
  componentWillMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  render() {
    const { users, loading } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>Users</CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">first name</th>
                      <th scope="col">last name</th>
                      <th scope="col">email</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading && users.length === 0 && <tr className="row-no-data"><td colSpan="4">No data found</td></tr>}
                    {users.map(user => <UserRow key={user.id} user={user} />)}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <Button href="/#/users/new" color="success" size="sm">New</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
};

Users.defaultProps = {
  users: [],
};

const mapStateToProps = ({ users }) => ({
  loading: users.loading,
  users: Object.values(users.items),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsers: () => fetchUsers(),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
