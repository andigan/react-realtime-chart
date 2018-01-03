// core react
import React, { Component } from 'react';

// components
import RealTimeChart from './realtime-chart.js';

class PageContainer extends Component {
    render () {
      return <div id="page-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh"
        }}>
        <RealTimeChart />
      </div>
    }
}

export default PageContainer;
