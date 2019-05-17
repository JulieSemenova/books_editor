import * as React from 'react';
import './Button.css';

interface Props {
  className?: string;
  title?: string;
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  size?: 'small' | 'default';
  type?: 'primary' | 'default';
}

const Button: React.StatelessComponent<Props> = ({
  onClick,
  children,
  title,
  className,
  disabled,
  size,
  type,
}: Props): JSX.Element => {
  const combinedClassName = ['button'];

  if (className) {
    combinedClassName.push(className);
  }
  if (size && size !== 'default') {
    combinedClassName.push(`button--${size}`);
  }

  if (type && type !== 'default') {
    combinedClassName.push(`button--${type}`);
  }

  return (
    <>
      <button
        className={combinedClassName.join(' ')}
        onClick={!disabled ? onClick : () => {}}
        disabled={disabled}
      >
        {children || title || null}
      </button>
    </>
  );
};

export default Button;
