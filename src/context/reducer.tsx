type State = typeof initialState;
type Action = ActionType<typeof actions>;

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'updateStore':
      return {
        ...state,
        ...action.payload
      };
  }
};

export default Reducer;