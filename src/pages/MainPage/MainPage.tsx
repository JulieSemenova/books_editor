import React from 'react';
import { connect } from 'react-redux';
import { add, remove } from '../../redux/reducers/testReducer';

import './MainPage.css';

const MainPage: React.FC = (props: any) => {
  return (
    <div>
      <span>{props.testReducer.total}</span>
      <span onClick={() => props.add()} style={{ padding: 10, background: 'papayawhip' }}>
        +
      </span>
      <span onClick={props.remove} style={{ padding: 10, background: 'grey' }}>
        -
      </span>
    </div>
  );
};

export default connect(
  ({ testReducer }: any) => ({ testReducer }),
  { add, remove },
)(MainPage);
