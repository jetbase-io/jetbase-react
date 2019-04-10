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
import { push } from 'connected-react-router';
import i18n from '../../i18n';
import { login, logout } from '../../actions/account';
import { resetError } from '../../actions/errors';
import Language from '../../components/language/index';
import Welcome from '../../components/welcome/index';

class Login extends Component {
  constructor(props) {
    super(props);

    const { logoutAction } = props;
    logoutAction();

    this.state = {
      hidden: true,
      email: '',
      password: '',
      keep: false,
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
    const { loginAction, goToHome, resetErrorAction } = this.props;
    resetErrorAction();
    this.setState({ submitted: true });
    const { email, password, keep } = this.state;
    if (!(email && password)) {
      return;
    }
    this.setState({ loading: true });
    loginAction(email, password, keep).then(() => {
      this.setState({ loading: false });
      goToHome();
    });
  }

  render() {
    const {
      email, password, submitted, loading, hidden,
    } = this.state;
    const { lng, errors } = this.props;
    return (
      <div className="app login-page">
        <div className="wrap-content">
          <Welcome />
          <div className="login-container">
            <Container>
              <Language />
              <Form className="login-form" onSubmit={e => this.handleSubmit(e)}>
                <h1 className="form-title">{i18n.t('login.formTitle', { lng })}</h1>
                <div className="form-comment">{i18n.t('login.formComment', { lng })}</div>
                <div className="form-error">{errors.status}</div>
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
                      <Link to="/forgot" className="form-control-link float-right">Forgot Password?</Link>
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
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md="4">
                    <Button className="login-submit p-2" color="primary" size="lg" block disabled={!email || !password || loading}>{i18n.t('login.signInBtn', { lng })}</Button>
                  </Col>
                </Row>
              </Form>
              <Row className="justify-content-center">
                <Col md="6">
                  <div className="line-width-text">
                    <hr />
                    <p>{i18n.t('login.dontHaveAccount', { lng })}</p>
                    <hr />
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md="6">
                  <Link className="login-link" to="/register">{i18n.t('login.signUpLink', { lng })}</Link>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

Login.defaultProps = {
  errors: { status: '' },
};

Login.propTypes = {
  errors: PropTypes.shape(PropTypes.object),
  lng: PropTypes.string.isRequired,
  loginAction: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
  goToHome: PropTypes.func.isRequired,
  resetErrorAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ account, errors }) => ({ lng: account.language, errors });

const mapDispatchToProps = dispatch => bindActionCreators({
  loginAction: (email, password, keep) => login(email, password, keep),
  logoutAction: () => logout(),
  goToHome: () => push('/'),
  resetErrorAction: () => resetError(),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
