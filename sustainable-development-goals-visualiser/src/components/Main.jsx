import React, { Component } from "react";
import styled from "styled-components";
import Hammer from "react-hammerjs";

import * as CSVParser from "papaparse";
import countriesCSV from "../static-data/countries.csv";

import Map from "./Map";
import SpeechHandler from "./SpeechHandler";

const hammerjsOptions = {
  touchAction: "compute",
  recognizers: {
    pinch: { enable: false },
    rotate: { enable: true }
  }
};

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: null
    };
  }
  //in constructor:
  // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  // componentDidMount() {
  //   this.updateWindowDimensions();
  //   window.addEventListener("resize", this.updateWindowDimensions);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateWindowDimensions);
  // }

  // updateWindowDimensions() {
  //   this.setState({
  //     windowSize: { width: window.innerWidth, height: window.innerHeight }
  //   });
  // }
  componentDidMount() {
    CSVParser.parse(countriesCSV, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: csv => {
        console.log("CSV file loaded!");
        this.setState({ countryData: csv.data });
      }
    });
  }

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
  onPinchStart = event => {
    console.log("onPinchStart");
  };
  onPinchEnd = event => {
    console.log("onPinchEnd");
  };
  onPinchIn = event => {
    console.log("onPinchIn", event);
  };
  onPinchOut = event => {
    console.log("onPinchOut", event);
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

  renderLoadingCSV = () => <div>Loading country data...</div>;

  render() {
    console.log("state: ", this.state);

    return this.state.countryData ? (
      <Hammer {...this}>
        <RootContainer>
          <SpeechHandler countryData={this.state.countryData} />
          <Map countryData={this.state.countryData} />
        </RootContainer>
      </Hammer>
    ) : (
      this.renderLoadingCSV()
    );
  }
}

const RootContainer = styled.div`
  height: 100%;
`;
