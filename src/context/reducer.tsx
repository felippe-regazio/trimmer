const Reducer = (state, action) => {
  switch (action.type) {
    case 'updateStore':
      return {
        ...state,
        ...action.payload
      };
  }
};

export default Reducer;