import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row,
} from 'reactstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAccount, saveAccount } from '../../actions/account';
import { resetError } from '../../actions/errors';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { getAccount } = this.props;
    getAccount();
  }

  handleChange(e, name) {
    const { value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { saveAccountAction, resetErrorAction } = this.props;
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
    saveAccountAction(body).then(() => this.setState({ saved: true }));
  }

  render() {
    const { profile, errors } = this.props;
    const {
      firstName, lastName, email, saved, submitted,
    } = this.state;
    if (!profile) {
      return (null);
    }
    console.log(errors);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <Form onSubmit={e => this.handleSubmit(e)}>
                <CardHeader>
                  <strong>
                    {'Edit account'}
                  </strong>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="firstname">First name</Label>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="Enter first name"
                      defaultValue={profile.firstName}
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
                      defaultValue={profile.lastName}
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
                      defaultValue={profile.email}
                      invalid={submitted && !email}
                      onChange={e => this.handleChange(e, 'email')}
                    />
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o" />
                    {saved ? ' Saved' : ' Save'}
                  </Button>
                  {' '}
                  <Button href="/#/" size="sm" color="danger">
                    <i className="fa fa-ban" />
                    {' Cancel'}
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

Account.propTypes = {
  errors: PropTypes.string.isRequired,
  getAccount: PropTypes.func.isRequired,
  resetErrorAction: PropTypes.func.isRequired,
  saveAccountAction: PropTypes.func.isRequired,
  profile: PropTypes.shape,
};

Account.defaultProps = {
  profile: {},
};

const mapStateToProps = ({ account }) => ({ profile: account.profile });

const mapDispatchToProps = dispatch => bindActionCreators({
  getAccount: () => fetchAccount(),
  resetErrorAction: () => resetError(),
  saveAccountAction: body => saveAccount(body),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
