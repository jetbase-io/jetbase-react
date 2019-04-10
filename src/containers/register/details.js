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
import { logout, saveAccount } from '../../actions/account';
import { resetError } from '../../actions/errors';
import Language from '../../components/language/index';
import Welcome from '../../components/welcome/index';
import FormSelect from '../../components/select/index';
import { businessTypeList, countryList, currencyList } from '../../dictionaries/index';

class RegisterDetails extends Component {
  constructor(props) {
    super(props);

    const { logoutAction, resetErrorAction } = props;
    logoutAction();
    resetErrorAction();

    this.state = {
      businessType: [],
      company: '',
      confirmation: false,
      country: '',
      currency: '',
      firstName: '',
      isReceiveMarketingEmail: false,
      lastName: '',
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, name) {
    const { value } = e.target;
    this.setState({ [name]: value });
  }

  handleChangeSelect(selected, name) {
    this.setState({ [name]: selected });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { resetErrorAction, saveAccountAction, token } = this.props;
    resetErrorAction();
    const {
      businessType,
      company,
      country,
      currency,
      firstName,
      isReceiveMarketingEmail,
      lastName,
    } = this.state;
    if (!(firstName && lastName && company && country && currency && businessType)) {
      return;
    }
    this.setState({ loading: true });
    saveAccountAction({
      businessType: businessType ? businessType.value : null,
      firstName,
      lastName,
      company,
      country: country ? country.value : null,
      currency: currency ? currency.value : null,
      isReceiveMarketingEmail,
    }, token).then((response) => {
      this.setState({ loading: false, confirmation: response.success });
    });
  }

  isSubmitDisabled() {
    const {
      businessType,
      firstName,
      lastName,
      company,
      country,
      currency,
      loading,
    } = this.state;
    return !firstName || !lastName || !company || !businessType || !currency || !country || loading;
  }

  renderForm() {
    const {
      businessType,
      confirmation,
      country,
      currency,
    } = this.state;
    const { lng, errors } = this.props;
    if (confirmation) {
      return null;
    }
    return (
      <Form className="login-form" onSubmit={e => this.handleSubmit(e)}>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <h1 className="form-title">{i18n.t('signup.formTitleComplete', { lng })}</h1>
            <p className="form-comment">{i18n.t('signup.formCommentComplete', { lng })}</p>
            <div className="form-error" dangerouslySetInnerHTML={{ __html: errors.status }} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="3" md="4">
            <FormGroup>
              <Label for="firstName">{i18n.t('general.firstName', { lng })}</Label>
              <Input
                id="firstName"
                type="text"
                placeholder={i18n.t('placeholder.firstName', { lng })}
                onChange={e => this.handleChange(e, 'firstName')}
              />
            </FormGroup>
          </Col>
          <Col lg="3" md="4">
            <FormGroup>
              <Label for="lastName">{i18n.t('general.lastName', { lng })}</Label>
              <Input
                id="lastName"
                type="text"
                placeholder={i18n.t('placeholder.lastName', { lng })}
                onChange={e => this.handleChange(e, 'lastName')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <FormGroup>
              <Label for="company">{i18n.t('signup.companyName', { lng })}</Label>
              <Input
                id="company"
                type="text"
                placeholder={i18n.t('placeholder.company', { lng })}
                onChange={e => this.handleChange(e, 'company')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <FormGroup>
              <Label for="company">{i18n.t('signup.whatBusinessDo', { lng })}</Label>
              <FormSelect
                value={businessType}
                onChange={e => this.handleChangeSelect(e, 'businessType')}
                options={businessTypeList}
                placeholder={i18n.t('placeholder.businessType', { lng })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="3" md="4">
            <FormGroup>
              <Label for="country">{i18n.t('signup.businessCountry', { lng })}</Label>
              <FormSelect
                value={country}
                onChange={e => this.handleChangeSelect(e, 'country')}
                options={countryList}
                placeholder={i18n.t('placeholder.country', { lng })}
              />
            </FormGroup>
          </Col>
          <Col lg="3" md="4">
            <FormGroup>
              <Label for="currency">{i18n.t('signup.businessCurrency', { lng })}</Label>
              <FormSelect
                value={currency}
                onChange={e => this.handleChangeSelect(e, 'currency')}
                options={currencyList}
                placeholder={i18n.t('placeholder.currency', { lng })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <FormGroup check>
              <Label for="isReceiveMarketingEmail">
                <Input
                  id="isReceiveMarketingEmail"
                  type="checkbox"
                  onChange={e => this.handleChange(e, 'isReceiveMarketingEmail')}
                />
                {i18n.t('signup.receiveMarketingEmail', { lng })}
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="4">
            <Button
              className="login-submit p-2"
              color="primary"
              size="lg"
              block
              disabled={this.isSubmitDisabled()}
            >
              {i18n.t('signup.signupBtn2', { lng })}
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <div className="line-width-text">
              <hr />
              <p>{i18n.t('signup.alreadyHaveAccount', { lng })}</p>
              <hr />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Link className="login-link" to="/login">{i18n.t('login.signInBtn', { lng })}</Link>
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

RegisterDetails.defaultProps = {
  errors: { status: '' },
};

RegisterDetails.propTypes = {
  errors: PropTypes.shape(PropTypes.object),
  lng: PropTypes.string.isRequired,
  logoutAction: PropTypes.func.isRequired,
  resetErrorAction: PropTypes.func.isRequired,
  saveAccountAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = ({ account, errors }, ownProps) => ({
  errors,
  lng: account.language,
  token: ownProps.match.params.token,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logoutAction: () => logout(),
  resetErrorAction: () => resetError(),
  saveAccountAction: (params, token) => saveAccount(params, token),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterDetails);
