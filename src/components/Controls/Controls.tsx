import * as React from 'react';

import Button from '../Button/Button';
import Filters from '../Filters/Filters';
import Popup from '../Popup/Popup';
import EditBookForm from '../EditBookForm/EditBookForm';

import './Controls.css';

interface State {
  isModalOpen: boolean;
}

class Controls extends React.Component<{}, State> {
  readonly state: State = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    return (
      <>
        <div className="controls">
          <Filters />
          <Button title="Добавить книгу" onClick={this.toggleModal} />
        </div>
        <Popup
          title={'Добавить книгу'}
          isVisible={this.state.isModalOpen}
          onClick={this.toggleModal}
        >
          <EditBookForm onClick={this.toggleModal} />
        </Popup>
      </>
    );
  }
}

export default Controls;
