import * as React from 'react';

import './Popup.css';

interface Props {
  title: string;
  onClick: () => void;
  children: any;
}

class Popup extends React.Component<Props> {
  render() {
    const { children, onClick, title } = this.props;
    return (
      <div className="popup">
        <div className="popup_container">
          <div className="popup_title">{title}</div>
          <div className="popup_content">
            {children}
            <div className="popup_closeBtn" onClick={onClick}>
              ✖️
            </div>
          </div>
        </div>
        <div className="popup_overlay" onClick={onClick} />
      </div>
    );
  }
}

export default Popup;
