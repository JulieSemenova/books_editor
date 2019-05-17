import * as React from 'react';
import { connect } from 'react-redux';

import { toggle, clear } from '../../redux/reducers/filters';

interface Props {
  clear: any;
  filters: any;
}

class Filters extends React.Component<Props, {}> {
  render() {
    return (
      <>
        <div>sortDirection:{this.props.filters.sortDirection}</div>
        <div>sortParams:{this.props.filters.sortParams}</div>
      </>
    );
  }
}

export default connect(
  ({ filters }: any) => ({ filters }),
  { toggle, clear },
)(Filters);
