const visitsRecentArrMax = 25,
      cutFromArrayWhenMaxReached = 1;

var fixedArraySize = new Array(visitsRecentArrMax).fill(null);

let initialState = {
  polling: false,

  chartArray: fixedArraySize,
  chartCurrentIndex: 0
};

var counterForDemo = 0;

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

    if (false) {
      action.payload.chartData = counterForDemo;
      counterForDemo += 1;
    }

    return {
      ...state,
      chartArray: state.chartCurrentIndex !== visitsRecentArrMax ? state.chartArray.map((item, index) => index != state.chartCurrentIndex ? item : +action.payload.chartData.toFixed(2)) : state.chartArray.map((item, index, arr) => index >= visitsRecentArrMax - cutFromArrayWhenMaxReached ? null : arr[index + cutFromArrayWhenMaxReached]).map((item, index) => index != visitsRecentArrMax - cutFromArrayWhenMaxReached ? item : +action.payload.chartData.toFixed(2)),
      chartCurrentIndex: state.chartCurrentIndex !== visitsRecentArrMax ? state.chartCurrentIndex + 1 : visitsRecentArrMax - cutFromArrayWhenMaxReached + 1
    };
    default:
      return state;
  }
};
