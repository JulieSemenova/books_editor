export const INCREMENT: string = 'test/INCREMENT';
export const DECREMENT: string = 'test/DECREMENT';

export const initialState = {
  total: 0,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case INCREMENT: {
      return {
        ...state,
        total: state.total + 1,
      };
    }
    case DECREMENT: {
      return {
        ...state,
        total: state.total - 1,
      };
    }
    default:
      return state;
  }
}

export const add = () => {
  return {
    type: INCREMENT,
  };
};

export const remove = () => {
  return {
    type: DECREMENT,
  };
};
