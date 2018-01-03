
import {delay} from 'redux-saga';

import {take, put, call, race, all } from 'redux-saga/effects';

import axios from 'axios';

const BITCOIN_ENDPOINT = 'https://api.coindesk.com/v1/bpi/currentprice.json';

const API_DELAY = 2000;

const POLL_START = 'POLL_START';
const POLL_STOP = 'POLL_STOP';
const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
const GET_DATA_FAILURE = 'GET_DATA_FAILURE';

const getDataSuccessAction = payload => ({ type: GET_DATA_SUCCESS, payload });
const getDataFailureAction = payload => ({ type: GET_DATA_FAILURE, payload });

export function* initialSaga() {
  yield all([
    watchPollSaga(),
    initialize()
]);
}

function* initialize() {
  yield put({type: "POLL_START"});
}

function* watchPollSaga() {
	while (true) {
    console.log('1: watch start');
  	yield take(POLL_START);
    console.log('2: POLL_START taken');
    yield race([
      call(pollSaga),
      take(POLL_STOP)
    ]);
  }
}

function* pollSaga(action) {
  console.log("3: pollSaga started");
  while (true) {
    try {
      const { data } = yield call(() => axios({ url: BITCOIN_ENDPOINT }));

      let constructedPayload = {
        chartData: parseFloat(data.bpi.USD.rate.replace(/,/g, '')) + Math.floor(Math.random() * 10),
      };

      yield put(getDataSuccessAction(constructedPayload));
      yield call(delay, API_DELAY);
    } catch (err) {
      yield put(getDataFailureAction(err));
    }
  }
}
