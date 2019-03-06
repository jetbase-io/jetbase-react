import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Table,
} from 'reactstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { deleteUser, fetchUser } from '../../actions/users';
import Can from '../../components/can';

class User extends React.Component {
  componentWillMount() {
    const { getUser } = this.props;
    getUser();
  }

  handleDelete(e) {
    e.preventDefault();
    const { deleteUserAction, goToList } = this.props;
    if (window.confirm('Are you sure?')) {
      deleteUserAction().then(() => goToList());
    }
  }

  render() {
    const { user } = this.props;
    if (!user || user === {}) {
      return (null);
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  {'User id: '}
                  {user.id}
                </strong>
                <div className="card-header-actions">
                  <Can I="update" a="User">
                    <Button href={`/#/users/${user.id}/edit`} color="link" className="card-header-action btn-setting">
                      <i className="icon-note" />
                    </Button>
                  </Can>
                  <Can I="delete" a="User">
                    <Button color="link" className="card-header-action btn-setting" onClick={e => this.handleDelete(e)}>
                      <i className="icon-trash" />
                    </Button>
                  </Can>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    <tr key="firstname">
                      <td>First name</td>
                      <td><strong>{user.firstName}</strong></td>
                    </tr>
                    <tr key="lastname">
                      <td>Last name</td>
                      <td><strong>{user.lastName}</strong></td>
                    </tr>
                    <tr key="email">
                      <td>E-mail</td>
                      <td><strong>{user.email}</strong></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <Button href={`/#/users/${user.id}/edit`} color="secondary" size="sm">Edit</Button>
                {' '}
                <Button color="danger" onClick={e => this.handleDelete(e)} size="sm">Delete</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

User.propTypes = {
  deleteUserAction: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  goToList: PropTypes.func.isRequired,
  user: PropTypes.shape,
};

User.defaultProps = {
  user: {},
};

const mapStateToProps = ({ users }, ownProps) => ({
  user: users.items.find(user => user.id === ownProps.match.params.id, 10),
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  deleteUserAction: () => deleteUser(ownProps.match.params.id),
  getUser: () => fetchUser(ownProps.match.params.id),
  goToList: () => push('/users'),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
