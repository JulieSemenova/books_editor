import * as React from 'react';

import './Input.css';

interface State {
  value: string;
  isValid: boolean;
}

interface Props {
  onChange: React.ChangeEventHandler<any>;
  value: string | undefined;
  dataType: 'number' | 'letters' | 'regexp';
  name: string;
  label?: string;
  validateMax?: number;
  validateMin?: number;
  validateLength?: number;
  validateFormat?: RegExp;
  required?: boolean;
}

class Input extends React.PureComponent<Props, State> {
  state: State = {
    value: this.props.value || '',
    isValid: true,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ value });
    this.props.onChange(event);
  };

  handleFocus = () => {
    this.setState({
      isValid: true,
    });
  };

  handleBlur = () => {
    return this.checkValidation();
  };

  checkValidation = () => {
    const {
      required,
      validateLength,
      validateMax,
      validateMin,
      validateFormat,
      dataType,
    } = this.props;
    const { value } = this.state;
    if (required && !value) {
      this.setState({ isValid: false });
    }
    if (dataType === 'letters') {
      const valueLength = value.length;
      if (validateLength && valueLength > validateLength) {
        this.setState({ isValid: false });
      }
    }

    if (dataType === 'number') {
      const digits = /[0-9]/;
      console.log(value);
      if (value !== '') {
        if (!digits.test(value)) {
          this.setState({ isValid: false });
        }
        if (validateMax && +value > validateMax) {
          this.setState({ isValid: false });
        }
        if (validateMin && +value < validateMin) {
          this.setState({ isValid: false });
        }
      }
    }

    if (dataType === 'regexp') {
      if (validateFormat && value && !validateFormat.test(value)) {
        this.setState({ isValid: false });
      }
    }
  };

  render() {
    const { value, label, name } = this.props;
    return (
      <div className="input_container">
        <label htmlFor={name}>{label}:</label>
        <input
          className={`input  ${!this.state.isValid ? 'input_error' : ''}`}
          id={name}
          value={value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

export default Input;
