import {delay} from 'redux-saga';

import {take, put, call, race, all } from 'redux-saga/effects';

import axios from 'axios';

import Promise from 'bluebird';

var pollFailCount = 0,
    pollFailCountLimit = 10;

const ENDPOINT_BITCOIN = 'https://api.coindesk.com/v1/bpi/currentprice.json';

const API_DELAY = 2000;

var pollFailCount = 0,
    pollFailCountLimit = 10;

export function* sagaInit() {
  yield all([
    watchForPollActions(),
    initialize()
]);
}

function* initialize() {
  yield put({type: "POLL_START"});
}

function* watchForPollActions() {
	while (true) {
    console.log('1: watch for poll actions');
  	yield take("POLL_START");
    console.log('2: POLL_START taken');
    yield race([
      call(startPollLoop),
      take("POLL_STOP")
    ]);
  }
}

function* startPollLoop(action) {
  console.log("3: startPollLoop started");

  var counter = 0,
      payload;

  while (true) {
    try {
      // counter += 1;
      const responsesPromiseObject = yield Promise.props({
        bitcoinResponse: yield call(() => axios({ url: ENDPOINT_BITCOIN }))
      }).then((result) => result);

      payload = {
        chartData: parseFloat(responsesPromiseObject.bitcoinResponse.data.bpi.USD.rate.replace(/,/g, '')) + Math.floor(Math.random() * 10)
      };

      yield put ({type: "GET_DATA_SUCCESS", payload});
      yield call(delay, API_DELAY);
    } catch (err) {
        yield put ({type: "GET_DATA_FAILURE", err});
        pollFailCount += 1;
        if (pollFailCount >= pollFailCountLimit) {
          console.log(`Poll Fail Count: ${pollFailCount}.  Polling stopped.  ${err.config ? err.config.url : null}`);
          yield put ({type: "POLL_STOP"});
        }
    }
  }

  // this optional section is to stress test the component to identify memory problems more quickly
  // var stressTest = true;
  // while (stressTest) {
  //
  //   try {
  //     payload = {Math.floor(Math.random() * 10)};
  //
  //     yield put ({type: "GET_DATA_SUCCESS", payload});
  //     yield call(delay, 10);
  //   } catch (err) {
  //     yield put ({type: "GET_DATA_FAILURE", err});
  //     pollFailCount += 1;
  //     if (pollFailCount >= pollFailCountLimit) {
  //       console.log(`Poll Fail Count: ${pollFailCount}.  Polling stopped.  ${err.config.url}`);
  //       yield put ({type: "POLL_STOP"});
  //     }
  //   }
  // }
}
