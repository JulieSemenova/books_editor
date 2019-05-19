import * as React from 'react';

import './Input.css';

interface State {
  value: string;
}

interface Props {
  onChange: React.ChangeEventHandler<any>;
  onBlur: () => void;
  onFocus: () => void;
  value?: string | undefined;
  name: string;
  label?: string;
  required?: boolean;
  clue?: string;
  isValid?: boolean | null;
  type?: string;
}

class Input extends React.PureComponent<Props, State> {
  state: State = {
    value: this.props.value || '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ value });
    this.props.onChange(event);
  };

  handleFocus = () => {
    this.props.onFocus();
  };

  handleBlur = () => {
    this.props.onBlur();
  };

  render() {
    const { value, label, name, clue, required, isValid, type } = this.props;

    let className = 'input';
    if (isValid !== undefined && isValid !== null) {
      className += `${isValid ? '' : ' input_error'}`;
    }

    return (
      <div className="input_container">
        <label htmlFor={name}>
          {label}:{required && <span className="input_requiredSign">*</span>}
        </label>
        <input
          className={className}
          id={name}
          value={value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          type={type}
        />
        {clue && <span className="input_comment">{clue}</span>}
      </div>
    );
  }
}

export default Input;
