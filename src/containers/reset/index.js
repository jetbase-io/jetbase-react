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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../i18n';
import { logout, resetPassword } from '../../actions/account';
import { resetError } from '../../actions/errors';
import Language from '../../components/language/index';
import Welcome from '../../components/welcome/index';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    const { logoutAction } = props;
    logoutAction();

    this.state = {
      confirmation: false,
      hidden: true,
      hiddenConfirm: true,
      password: '',
      passwordConfirm: '',
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

  handleShowPasswordConfirm() {
    const { hiddenConfirm } = this.state;
    this.setState({ hiddenConfirm: !hiddenConfirm });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { resetPasswordAction, resetErrorAction, token } = this.props;
    resetErrorAction();
    this.setState({ submitted: true });
    const { password, passwordConfirm } = this.state;
    if (!password || !passwordConfirm) {
      return;
    }
    this.setState({ loading: true });
    resetPasswordAction(password, passwordConfirm, token).then((response) => {
      this.setState({ loading: false, confirmation: response.success });
    });
  }

  renderForm() {
    const {
      confirmation, password, passwordConfirm, hidden, hiddenConfirm, submitted, loading,
    } = this.state;
    const { lng, errors } = this.props;
    if (confirmation) {
      return null;
    }
    return (
      <Form className="login-form" onSubmit={e => this.handleSubmit(e)}>
        <Row className="justify-content-center">
          <Col md="6">
            <h1 className="form-title">{i18n.t('resetPassword.formTitle', { lng })}</h1>
            <div className="form-comment">{i18n.t('resetPassword.formComment', { lng })}</div>
            <div className="form-error">{errors.status}</div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
            <FormGroup>
              <Label for="password">{i18n.t('resetPassword.newPassword', { lng })}</Label>
              <Input
                id="password"
                className={password ? '__filled' : ''}
                type={hidden ? 'password' : 'text'}
                placeholder={i18n.t('resetPassword.newPasswordPlaceholder', { lng })}
                autoComplete="current-password"
                invalid={submitted && (!password || !!errors.status)}
                onChange={e => this.handleChange(e, 'password')}
              />
              <button type="button" className="form-password-eye" onClick={e => this.handleShowPassword(e)}>
                <i className={`icon icon-eye ${hidden ? '' : 'active'}`} />
              </button>
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
            <FormGroup>
              <Label for="passwordConfirm">{i18n.t('resetPassword.confirmPassword', { lng })}</Label>
              <Input
                id="passwordConfirm"
                className={passwordConfirm ? '__filled' : ''}
                type={hiddenConfirm ? 'password' : 'text'}
                placeholder={i18n.t('resetPassword.confirmPasswordPlaceholder', { lng })}
                autoComplete="current-password"
                invalid={submitted && (!passwordConfirm || !!errors.status)}
                onChange={e => this.handleChange(e, 'passwordConfirm')}
              />
              <button type="button" className="form-password-eye" onClick={e => this.handleShowPasswordConfirm(e)}>
                <i className={`icon icon-eye ${hiddenConfirm ? '' : 'active'}`} />
              </button>
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="4">
            <Button className="login-submit p-2" color="primary" size="lg" block disabled={!password || !passwordConfirm || loading}>{i18n.t('resetPassword.confirmBtn', { lng })}</Button>
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

ResetPassword.defaultProps = {
  errors: { status: '' },
};

ResetPassword.propTypes = {
  errors: PropTypes.shape(PropTypes.object),
  lng: PropTypes.string.isRequired,
  logoutAction: PropTypes.func.isRequired,
  resetPasswordAction: PropTypes.func.isRequired,
  resetErrorAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = ({ account, errors }, ownProps) => ({
  errors,
  lng: account.language,
  token: ownProps.match.params.token,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logoutAction: () => logout(),
  resetPasswordAction: (password, confirm, token) => resetPassword(password, confirm, token),
  resetErrorAction: () => resetError(),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);
