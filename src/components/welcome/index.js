import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import i18n from '../../i18n';

class Welcome extends PureComponent {
  render() {
    const { lng } = this.props;
    return (
      <div className="welcome">
        <div className="welcome-content">
          <Link to="/" className="logo" />
          <h2 className="welcome-title">{i18n.t('webTitle', { lng })}</h2>
          <h4 className="welcome-subtitle">{i18n.t('webComment', { lng })}</h4>
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  lng: PropTypes.string.isRequired,
};

const mapStateToProps = ({ account }) => ({ lng: account.language });

export default connect(
  mapStateToProps,
  null,
)(Welcome);
