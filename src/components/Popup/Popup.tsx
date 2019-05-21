import * as React from 'react';

import './Popup.css';

interface Props {
  title: string;
  onClick: () => void;
  children: any;
  isVisible: boolean;
}

class Popup extends React.Component<Props> {
  render() {
    const { children, onClick, title, isVisible } = this.props;
    return (
      <div className={`popup ${!isVisible ? 'popup--closed' : ''}`}>
        <div className="popup_container">
          <div className="popup_title">{title}</div>
          <div className="popup_content">
            {children}
            <div className="popup_closeBtn" onClick={onClick}>
              <span>✖</span>
            </div>
          </div>
        </div>
        <div
          className={`popup_overlay ${!isVisible ? 'popup_overlay--hidden' : ''}`}
          onClick={onClick}
        />
      </div>
    );
  }
}

export default Popup;
