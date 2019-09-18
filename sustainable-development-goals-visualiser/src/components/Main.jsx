import React, { Component } from "react";
import styled from "styled-components";
import Hammer from "react-hammerjs";
import Map from "./Map";

const hammerjsOptions = {
  touchAction: "compute",
  recognizers: {
    pinch: { enable: true }
  }
};

export default class Main extends Component {
  onTap = event => {
    console.log("onTap");
  };
  onDoubleTap = event => {
    console.log("onDoubleTap");
  };
  onPan = event => {
    console.log("onPan");
  };
  onPanCancel = event => {
    console.log("onPanCancel");
  };
  onPanEnd = event => {
    console.log("onPanEnd");
  };
  onPanStart = event => {
    console.log("onPanStart");
  };
  onPinch = event => {
    console.log("onPinchCancel");
  };
  onPinchEnd = event => {
    console.log("onPinchEnd");
  };
  onPinchIn = event => {
    console.log("onPinchIn");
  };
  onPinchOut = event => {
    console.log("onPinchOut");
  };
  onPinchStart = event => {
    console.log("onPinchStart");
  };
  onPress = event => {
    console.log("onPress");
  };
  onPressUp = event => {
    console.log("onPressUp");
  };
  onRotate = event => {
    console.log("onRotate");
  };
  onRotateCancel = event => {
    console.log("onRotateCancel");
  };
  onRotateEnd = event => {
    console.log("onRotateEnd");
  };
  onRotateMove = event => {
    console.log("onRotateMove");
  };
  onRotateStart = event => {
    console.log("onRotateStart");
  };
  onSwipe = event => {
    console.log("onSwipe");
  };

  render() {
    return (
      <Hammer
        options={hammerjsOptions}
        onTap={this.onTap}
        onDoubleTap={this.onDoubleTap}
        onPan={this.onPan}
        onPanCancel={this.onPanCancel}
        onPanEnd={this.onPanEnd}
        onPanStart={this.onPanStart}
        onPinch={this.onPinch}
        onPinchCancel={this.onPinchCancel}
        onPinchEnd={this.onPinchEnd}
        onPinchIn={this.onPinchIn}
        onPinchOut={this.onPinchOut}
        onPinchStart={this.onPinchStart}
        onPress={this.onPress}
        onPressUp={this.onPressUp}
        onRotate={this.onRotate}
        onRotateCancel={this.onRotateCancel}
        onRotateEnd={this.onRotateEnd}
        onRotateMove={this.onRotateMove}
        onRotateStart={this.onRotateStart}
        onSwipe={this.onSwipe}
      >
        <RootContainer>
          <Map />
        </RootContainer>
      </Hammer>
    );
  }
}

const RootContainer = styled.div`
  height: 100%;
`;
