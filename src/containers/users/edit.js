import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row,
} from 'reactstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { fetchUser, saveUser } from '../../actions/users';
import { resetError } from '../../actions/errors';

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { getUser } = this.props;
    getUser();
  }

  handleChange(e, name) {
    const { value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { saveUserAction, goToShow, resetErrorAction } = this.props;
    resetErrorAction();
    const {
      firstName, lastName, email,
    } = this.state;
    if (!firstName && !lastName && !email) {
      return;
    }
    const body = {
      firstName, lastName, email,
    };
    Object.keys(body).forEach(key => body[key] === undefined && delete body[key]);
    saveUserAction(body).then(() => goToShow());
  }

  render() {
    const { user } = this.props;
    const {
      firstName, lastName, email, submitted,
    } = this.state;
    if (!user) {
      return (null);
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <Form onSubmit={e => this.handleSubmit(e)}>
                <CardHeader>
                  <strong>
                    {'Edit user: '}
                    {user.email}
                  </strong>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="firstname">First name</Label>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="Enter first name"
                      defaultValue={user.firstName}
                      invalid={submitted && !firstName}
                      onChange={e => this.handleChange(e, 'firstName')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="lastname">Last name</Label>
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Enter last name"
                      defaultValue={user.lastName}
                      invalid={submitted && !lastName}
                      onChange={e => this.handleChange(e, 'lastName')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter e-mail"
                      defaultValue={user.email}
                      invalid={submitted && !email}
                      onChange={e => this.handleChange(e, 'email')}
                    />
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="success">Save</Button>
                  {' '}
                  <Button href={`/#/users/${user.id}`} size="sm" color="danger">Cancel</Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

UserEdit.propTypes = {
  getUser: PropTypes.func.isRequired,
  goToShow: PropTypes.func.isRequired,
  resetErrorAction: PropTypes.func.isRequired,
  saveUserAction: PropTypes.func.isRequired,
  user: PropTypes.shape.isRequired,
};

const mapStateToProps = ({ users }, ownProps) => ({
  user: users.items.find(user => user.id === ownProps.match.params.id),
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  getUser: () => fetchUser(ownProps.match.params.id),
  goToShow: () => push(`/users/${ownProps.match.params.id}`),
  resetErrorAction: () => resetError(),
  saveUserAction: body => saveUser(ownProps.match.params.id, body),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserEdit);
