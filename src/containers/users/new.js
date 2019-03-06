import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row,
} from 'reactstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createUser } from '../../actions/users';
import { resetError } from '../../actions/errors';

class UserNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, name) {
    const { value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createUserAction, goToList, resetErrorAction } = this.props;
    resetErrorAction();
    const {
      firstName, lastName, email, password,
    } = this.state;
    if (!firstName && !lastName && !email && !password) {
      return;
    }
    const body = {
      firstName, lastName, email, password,
    };
    createUserAction(body).then(() => goToList());
  }

  render() {
    const {
      firstName, lastName, email, password, submitted,
    } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <Form onSubmit={e => this.handleSubmit(e)}>
                <CardHeader>
                  <strong>
                    {'New user'}
                  </strong>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="firstname">First name</Label>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="Enter first name"
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
                      invalid={submitted && !email}
                      onChange={e => this.handleChange(e, 'email')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      invalid={submitted && !password}
                      onChange={e => this.handleChange(e, 'password')}
                    />
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">Create</Button>
                  {' '}
                  <Button href="/#/users" size="sm" color="danger">Cancel</Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

UserNew.propTypes = {
  createUserAction: PropTypes.func.isRequired,
  goToList: PropTypes.func.isRequired,
  resetErrorAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  createUserAction: body => createUser(body),
  goToList: () => push('/users'),
  resetErrorAction: () => resetError(),
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(UserNew);
