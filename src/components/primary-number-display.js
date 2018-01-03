import React from 'react';

const PrimaryNumberDisplay = (props) => <div className="primary-number-component"
        style={{
          height: "100%",
          width: "100%"
        }}>
        <div className="primary-number-label"
          style={{
            height: "20%",
            fontSize: "18px",
            fontWeight: "900",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
          {props.label}
        </div>
        <div className="primary-number-number"
          style={{
            fontSize: "200%",
            height: "60%",
            display: "flex",
            alignItems: "center",
            fontFamily: "monospace",
            justifyContent: "center",
            backgroundColor: "transparent"
          }}>
        <div className={`number-with-delta-effect-${props.delta}`}>
          <div className={`primary-number-box-effect-${props.delta}`} />
          <span style={{
            zIndex: "1"
          }}>
          {props.value}
        </span>

        </div>
      </div>
      <div className="primary-number-message"
        style={{
          height: "20%",
          color: "#808080",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {props.message}
      </div>

      </div>;

export default PrimaryNumberDisplay;
