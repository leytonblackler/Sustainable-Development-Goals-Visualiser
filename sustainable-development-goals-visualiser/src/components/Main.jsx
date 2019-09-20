import React, { Component } from "react";
import styled from "styled-components";
import Hammer from "react-hammerjs";
import Map from "./Map";
import SpeechHandler from "./SpeechHandler";

const MAX_SCALE = 5;

const hammerjsOptions = {
  touchAction: "compute",
  recognizers: {
    pinch: { enable: true },
    rotate: { enable: true }
  }
};

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      map: {
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        panOffsetX: 0,
        panOffsetY: 0,
        pinchCentreX: 0,
        pinchCentreY: 0
      }
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      windowSize: { width: window.innerWidth, height: window.innerHeight }
    });
  }

  onTap = event => {
    // console.log("onTap");
  };
  onDoubleTap = event => {
    // console.log("onDoubleTap");
  };
  onPan = event => {
    // console.log("onPan");
  };
  onPanCancel = event => {
    // console.log("onPanCancel");
  };
  onPanEnd = event => {
    // console.log("onPanEnd");
  };
  onPanStart = event => {
    // console.log("onPanStart");
  };
  onPinchStart = event => {
    console.log("onPinchStart");
    const { offsetX, offsetY, panOffsetX, panOffsetY, scale } = this.state.map;
    this.setState({
      map: {
        ...this.state.map,
        panOffsetX: offsetX,
        panOffsetY: offsetY,
        pinchCentreX: Math.round(
          (event.center.x - panOffsetX - this.state.windowSize.width / 2) /
            scale
        ),
        pinchCentreY: Math.round(
          (event.center.y - panOffsetY - this.state.windowSize.height / 2) /
            scale
        )
      }
    });
  };
  onPinch = event => {
    console.log("onPinch");
    const {
      offsetX,
      offsetY,
      panOffsetX,
      panOffsetY,
      pinchCentreX,
      pinchCentreY,
      scale
    } = this.state.map;

    // don't allow scales less than 1, or greater than maxScale
    // event.scale is relative to the start of the current pinch operation, not the last event
    let newScale = Math.min(MAX_SCALE, Math.max(1, scale * event.scale));

    let newOffsetX = panOffsetX + Math.round(pinchCentreX * (1 - event.scale));
    let newOffsetY = panOffsetY + Math.round(pinchCentreY * (1 - event.scale));

    // allow for dragging (i.e. panning) while pinching
    newOffsetX += event.deltaX;
    newOffsetY += event.deltaY;

    const elementWidth = this.state.windowSize.width;
    const elementHeight = this.state.windowSize.height;

    const containerWidth = this.state.windowSize.width;
    const containerHeight = this.state.windowSize.height;

    // constrain edges
    let overlapX = Math.max(
      0,
      Math.round((elementWidth * scale - containerWidth) / 2)
    );
    let overlapY = Math.max(
      0,
      Math.round((elementHeight * scale - containerHeight) / 2)
    );
    newOffsetX = Math.max(-overlapX, Math.min(overlapX, offsetX));
    newOffsetY = Math.max(-overlapY, Math.min(overlapY, offsetY));

    this.setState({
      map: {
        ...this.state.map,
        scale: newScale,
        offsetX: newOffsetX,
        offsetY: newOffsetY
      }
    });

    // Must translate THEN scale (important)
  };
  onPinchEnd = event => {
    console.log("onPinchEnd");

    // update current scale ready for next pinch or pan operation
    const { scale } = this.state.map;
    const newScale = Math.min(MAX_SCALE, Math.max(1, scale * event.scale));
    this.setState({
      map: {
        ...this.state.map,
        scale: newScale
      }
    });
  };
  onPinchIn = event => {
    // console.log("onPinchIn", event);
  };
  onPinchOut = event => {
    // console.log("onPinchOut", event);
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
    // console.log("state: ", this.state);
    return (
      <Hammer
        options={hammerjsOptions}
        onTap={this.onTap}
        onDoubleTap={this.onDoubleTap}
        onPan={this.onPan}
        onPanCancel={this.onPanCancel}
        onPanEnd={this.onPanEnd}
        onPanStart={this.onPanStart}
        onPinchStart={this.onPinchStart}
        onPinch={this.onPinch}
        onPinchCancel={this.onPinchCancel}
        onPinchEnd={this.onPinchEnd}
        onPinchIn={this.onPinchIn}
        onPinchOut={this.onPinchOut}
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
          <SpeechHandler />
        </RootContainer>
      </Hammer>
    );
  }
}

// <Map state={this.state.map} />

const RootContainer = styled.div`
  height: 100%;
`;
