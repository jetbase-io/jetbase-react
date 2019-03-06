import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row,
} from 'reactstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changePassword, fetchAccount } from '../../actions/account';
import { resetError } from '../../actions/errors';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { changePasswordAction, resetErrorAction } = this.props;
    resetErrorAction();
    this.setState({ submitted: true });
    const {
      oldpassword, newpassword,
    } = this.state;
    if (!oldpassword || !newpassword) {
      return;
    }
    const body = {
      oldpassword, newpassword,
    };
    changePasswordAction(body).then(() => this.setState({ saved: true }));
  }

  render() {
    const { errors } = this.props;
    const {
      oldpassword, newpassword, saved, submitted,
    } = this.state;
    console.log(errors);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <Form onSubmit={e => this.handleSubmit(e)}>
                <CardHeader>
                  <strong>
                    {'Edit password'}
                  </strong>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="old">Old Password</Label>
                    <Input
                      id="old"
                      type="password"
                      placeholder="Old password"
                      invalid={submitted && !oldpassword}
                      onChange={e => this.handleChange(e, 'oldpassword')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="new">New password</Label>
                    <Input
                      id="new"
                      type="password"
                      placeholder="New password"
                      invalid={submitted && !newpassword}
                      onChange={e => this.handleChange(e, 'newpassword')}
                    />
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o" />
                    {saved ? ' Changed' : ' Change'}
                  </Button>
                  {' '}
                  <Button href="/#/account" size="sm" color="danger">
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

ChangePassword.propTypes = {
  changePasswordAction: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
  getAccount: PropTypes.func.isRequired,
  resetErrorAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = dispatch => bindActionCreators({
  changePasswordAction: body => changePassword(body),
  getAccount: () => fetchAccount(),
  resetErrorAction: () => resetError(),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
