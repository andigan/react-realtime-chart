import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PrimaryNumberDisplay from './primary-number-display';

import C3Chart from 'react-c3js';

import 'c3/c3.css';

import {stopPolling, startPolling} from '../actions';

function getChange(newValue, oldValue) {
  if (newValue === oldValue) {
    return "equal";
  }
  if (newValue > oldValue) {
    return "increase";
  } else {
    return "decrease";
  }
}

const RealTimeChart = (props) => {

  let {
    chartArray,
    polling,
    chartCurrentIndex,
    stopPolling, // action
    startPolling // action
  } = props;

  let mostRecentTotal = chartArray[chartCurrentIndex - 1];
  let secondmostRecentTotal = chartArray[chartCurrentIndex - 2];

  let delta = mostRecentTotal && secondmostRecentTotal ? getChange(mostRecentTotal, secondmostRecentTotal) : "equal";

  console.log(chartArray);

  return (
    <div>
      <div className="current-active-users-container"
        style={{
          width: "280px",
          height: "150px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "6px",
          boxSizing: "border-box",
          border: "1px solid grey"
        }}>
        <div className="primary-number-component-container"
          onClick={polling ? stopPolling : startPolling}
          style={{
            height: "60%",
            width: "100%",
          }}>
          <PrimaryNumberDisplay
            label="Current BitCoin Value"
            value={mostRecentTotal ? "$" + mostRecentTotal : null}
            delta={delta}
            message="(random +/-20 for more dynamic demo)"
          />
        </div>
        <div className="current-users-line-chart-container"
          style={{
            height: "40%",
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}>
          <C3Chart
            axis={{
              x: {show:false},
              y: {show:false}
            }}
            legend={{
              show: false
            }}
            interaction={{
              enabled: false
            }}
            transition={{
              duration: 500
            }}
            size={{
              height: 40,
              width: 100
            }}
            line={{
              step: {
                type: 'step-after'
              }
            }}
            data={{
              columns: [
                ['data1', ...chartArray.slice(0, chartCurrentIndex)]
              ],
              type: "line"
            }}
          />
        </div>
      </div>
      <div>Data Provided By / Powered by <a href="https://www.coindesk.com/price/">CoinDesk</a></div>
      <div
        style={{
          height: "10px",
          display: "flex",
          justifyContent: "center",
          fontStyle: "italic",
        }}> {polling ? null : "(paused)"} </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    chartArray: state.analytics.chartArray,
    polling: state.analytics.polling,
    chartCurrentIndex: state.analytics.chartCurrentIndex
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { stopPolling, startPolling }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeChart);
