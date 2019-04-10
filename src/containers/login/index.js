import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { login, logout } from '../../actions/account';
import { resetError } from '../../actions/errors';

class Login extends Component {
  constructor(props) {
    super(props);

    const { logoutAction } = props;
    logoutAction();

    this.state = {
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
      email, password, submitted, loading,
    } = this.state;
    const { errors } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={e => this.handleSubmit(e)}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <Input
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                          invalid={submitted && (!email || errors)}
                          onChange={e => this.handleChange(e, 'email')}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          invalid={submitted && (!password || errors)}
                          onChange={e => this.handleChange(e, 'password')}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="12">
                          <p className="text-muted">{errors ? errors.status : ''}</p>
                        </Col>
                        <Col xs="12">
                          <Button color="primary" className="px-4" disabled={loading}>{loading ? 'Loading' : 'Login'}</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.string.isRequired,
  loginAction: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
  goToHome: PropTypes.func.isRequired,
  resetErrorAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ errors }) => ({ errors });

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
