import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeLanguage } from '../../actions/account';

class Language extends PureComponent {
  handleChangeLanguage(e, language) {
    e.preventDefault();
    const { changeLanguageAction } = this.props;
    changeLanguageAction(language);
  }

  render() {
    const { language } = this.props;
    return (
      <div className="language-selector">
        <div className="toggle-container">
          <button
            type="button"
            className="language-item"
            onClick={e => this.handleChangeLanguage(e, 'fr')}
            onKeyDown={e => this.handleChangeLanguage(e, 'fr')}
          >
            <i className="icon icon-lang-fr" />
            <span className="language-text">FR</span>
          </button>
          <button
            type="button"
            className="language-item"
            onClick={e => this.handleChangeLanguage(e, 'en')}
            onKeyDown={e => this.handleChangeLanguage(e, 'en')}
          >
            <i className="icon icon-lang-en" />
            <span className="language-text">EN</span>
          </button>
          <span className={`language-item selector ${language}`}>
            <i className={`icon icon-lang-${language}`} />
            <span className="language-text">{language.toUpperCase()}</span>
          </span>
        </div>
      </div>
    );
  }
}

Language.propTypes = {
  language: PropTypes.string.isRequired,
  changeLanguageAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ account }) => ({ language: account.language });

const mapDispatchToProps = dispatch => bindActionCreators({
  changeLanguageAction: lang => changeLanguage(lang),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Language);
