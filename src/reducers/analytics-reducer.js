let initialState = {
  chartArray: [],
  polling: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "POLL_START":
      return {
        ...state,
        polling: true,
      };
    case "POLL_STOP":
      return {
        ...state,
        polling: false,
      };
    case "GET_DATA_SUCCESS":

      return {
        ...state,
       chartArray: [...state.chartArray, action.payload.chartData ]
      };
    default:
      return state;
  }
};
