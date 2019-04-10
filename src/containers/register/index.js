import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../i18n';
import { logout, signup } from '../../actions/account';
import { resetError } from '../../actions/errors';
import Language from '../../components/language/index';
import Welcome from '../../components/welcome/index';

class Register extends Component {
  constructor(props) {
    super(props);

    const { logoutAction } = props;
    logoutAction();

    this.state = {
      confirmation: false,
      email: '',
      hidden: true,
      password: '',
      submitted: false,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, name) {
    const { value } = e.target;
    this.setState({ [name]: value });
  }

  handleShowPassword() {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { signupAction, resetErrorAction } = this.props;
    resetErrorAction();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (!(email && password)) {
      return;
    }
    this.setState({ loading: true });
    signupAction(email, password).then((response) => {
      this.setState({ loading: false, confirmation: response.success });
    });
  }

  renderForm() {
    const {
      confirmation, email, password, submitted, loading, hidden,
    } = this.state;
    const { lng, errors } = this.props;
    console.log(errors);
    if (confirmation) {
      return null;
    }
    return (
      <Form className="login-form" onSubmit={e => this.handleSubmit(e)}>
        <h1 className="form-title">{i18n.t('signup.formTitle', { lng })}</h1>
        <p className="form-comment">{i18n.t('signup.formComment', { lng })}</p>
        <Row className="justify-content-center">
          <Col md="6">
            <div className="form-error" dangerouslySetInnerHTML={{ __html: errors.status }} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
            <FormGroup>
              <Label for="email">{i18n.t('general.email', { lng })}</Label>
              <Input
                id="email"
                type="email"
                placeholder={i18n.t('placeholder.email', { lng })}
                autoComplete="email"
                invalid={submitted && (!email || !!errors.status)}
                onChange={e => this.handleChange(e, 'email')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
            <FormGroup>
              <Label for="password">{i18n.t('general.password', { lng })}</Label>
              <Input
                id="password"
                className={password ? '__filled' : ''}
                type={hidden ? 'password' : 'text'}
                placeholder={i18n.t('placeholder.password', { lng })}
                autoComplete="current-password"
                invalid={submitted && (!password || !!errors.status)}
                onChange={e => this.handleChange(e, 'password')}
              />
              <button type="button" className="form-password-eye" onClick={e => this.handleShowPassword(e)}>
                <i className={`icon icon-eye ${hidden ? '' : 'active'}`} />
              </button>
              <FormText>At least 8 characters but longer is better</FormText>
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="4">
            <Button className="login-submit p-2" color="primary" size="lg" block disabled={!email || !password || loading}>{i18n.t('signup.signupBtn', { lng })}</Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
            <div className="line-width-text">
              <hr />
              <p>Already Have an Account?</p>
              <hr />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
            <Link className="login-link" to="/login">Sign In</Link>
          </Col>
        </Row>
      </Form>
    );
  }

  renderConfirmation() {
    const { confirmation, email } = this.state;
    if (!confirmation) {
      return null;
    }
    return (
      <div className="login-form">
        <h1 className="form-title">Email Confirmation</h1>
        <i className="icon-send-email" />
        <p className="form-comment">Account confirmation link was sent to your email</p>
        <p className="login-user-email">{email}</p>
        <p className="form-comment">Please check your email to continue registration</p>
      </div>
    );
  }

  render() {
    return (
      <div className="app login-page">
        <div className="wrap-content">
          <Welcome />
          <div className="login-container">
            <Container>
              <Language />
              {this.renderForm()}
              {this.renderConfirmation()}
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

Register.defaultProps = {
  errors: { status: '' },
};

Register.propTypes = {
  errors: PropTypes.shape(PropTypes.object),
  lng: PropTypes.string.isRequired,
  logoutAction: PropTypes.func.isRequired,
  resetErrorAction: PropTypes.func.isRequired,
  signupAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ account, errors }) => ({ lng: account.language, errors });

const mapDispatchToProps = dispatch => bindActionCreators({
  logoutAction: () => logout(),
  resetErrorAction: () => resetError(),
  signupAction: (email, password) => signup(email, password),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
