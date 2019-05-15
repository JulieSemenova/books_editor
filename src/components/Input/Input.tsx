import * as React from 'react';

import './Input.css';

interface State {
  value: string;
  isValid: boolean;
}

interface Props {
  onChange: React.ChangeEventHandler<any>;
  value: string;
  label?: string;
  name: string;
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
    const { required, validateLength, validateMax, validateMin, validateFormat } = this.props;
    const { value } = this.state;
    const valueLength = value.length;
    const valueAmount = Number(value);
    if (required && valueLength === 0) {
      this.setState({ isValid: false });
    }
    if (validateLength && valueLength <= valueLength) {
      this.setState({ isValid: false });
    }
    if (validateMax && valueAmount > validateMax) {
      this.setState({ isValid: false });
    }
    if (validateMin && valueAmount < validateMin) {
      this.setState({ isValid: false });
    }

    if (validateFormat && !validateFormat.test(value)) {
      this.setState({ isValid: false });
    }
  };

  render() {
    const { value, label, name } = this.props;
    return (
      <div className={`input_container? `}>
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
