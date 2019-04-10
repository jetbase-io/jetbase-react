import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../i18n';
import { forgot, logout } from '../../actions/account';
import { resetError } from '../../actions/errors';
import Language from '../../components/language/index';
import Welcome from '../../components/welcome/index';

class Forgot extends Component {
  constructor(props) {
    super(props);

    const { logoutAction } = props;
    logoutAction();

    this.state = {
      confirmation: false,
      email: '',
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

  handleSubmit(e) {
    e.preventDefault();
    const { forgotAction, resetErrorAction } = this.props;
    resetErrorAction();
    this.setState({ submitted: true });
    const { email } = this.state;
    if (!email) {
      return;
    }
    this.setState({ loading: true });
    forgotAction(email).then((response) => {
      this.setState({ loading: false, confirmation: response.success });
    });
  }

  renderForm() {
    const {
      confirmation, email, submitted, loading,
    } = this.state;
    const { lng, errors } = this.props;
    if (confirmation) {
      return null;
    }
    return (
      <Form className="login-form" onSubmit={e => this.handleSubmit(e)}>
        <Row className="justify-content-center">
          <Col md="6">
            <h1 className="form-title">{i18n.t('forgotPassword.formTitle', { lng })}</h1>
            <div className="form-comment">{i18n.t('forgotPassword.formComment', { lng })}</div>
            <div className="form-error">{errors.status}</div>
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
          <Col md="4">
            <Button className="login-submit p-2" color="primary" size="lg" block disabled={!email || loading}>{i18n.t('forgotPassword.restoreBtn', { lng })}</Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
            <div className="line-width-text">
              <hr />
              <p>{i18n.t('forgotPassword.rememberPassword', { lng })}</p>
              <hr />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
            <Link className="login-link" to="/login">{i18n.t('forgotPassword.backToSign', { lng })}</Link>
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
        <h1 className="form-title">Restore Password</h1>
        <i className="icon-send-email" />
        <p className="form-comment">Reset password link was sent to your email</p>
        <p className="login-user-email">{email}</p>
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

Forgot.defaultProps = {
  errors: { status: '' },
};

Forgot.propTypes = {
  errors: PropTypes.shape(PropTypes.object),
  lng: PropTypes.string.isRequired,
  forgotAction: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
  resetErrorAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ account, errors }) => ({ lng: account.language, errors });

const mapDispatchToProps = dispatch => bindActionCreators({
  forgotAction: email => forgot(email),
  logoutAction: () => logout(),
  resetErrorAction: () => resetError(),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Forgot);
