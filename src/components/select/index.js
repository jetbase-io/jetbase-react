import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import Select from 'react-select';

class FormSelect extends PureComponent {
  render() {
    const styles = {
      indicatorSeparator: provided => ({
        ...provided,
        display: 'none',
      }),
      control: base => ({
        ...base,
        '&:hover': { borderColor: '#CCD3D9' },
        boxShadow: 'none',
        borderColor: '#CCD3D9',
        paddingBottom: '3px',
        paddingTop: '3px',
        paddingLeft: '2px',
        paddingRight: '2px',
      }),
      container: () => ({
        borderColor: '#CCD3D9',
        borderRadius: '5px',
      }),
      menu: base => ({
        ...base,
        borderRadius: '0 0 5px 5px',
        border: '1px solid #CCD3D9',
        borderTop: '1px solid #fff',
        boxShadow: 'none',
        marginTop: '-3px',
      }),
      placeholder: () => ({
        color: '#979797',
      }),
    };
    const arrowRenderer = <i className="icon-caret" />;

    return (
      <Select
        {...this.props}
        arrowRenderer={arrowRenderer}
        className="form-select"
        classNamePrefix="form-select"
        styles={styles}
      />
    );
  }
}

export default FormSelect;
