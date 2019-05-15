import * as React from 'react';
import './Button.css';

interface Props {
  className?: string;
  title?: string;
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button: React.StatelessComponent<Props> = ({
  onClick,
  children,
  title,
  className,
  disabled,
}: Props): JSX.Element => {
  const combinedClassName = ['button'];

  if (className) {
    combinedClassName.push(className);
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
