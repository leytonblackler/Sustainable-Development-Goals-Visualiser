import React, { Component } from "react";
import styled from "styled-components";
import Hammer from "react-hammerjs";
import * as CSVParser from "papaparse";
import countriesCSV from "../static-data/countries.csv";
import ShakeHandler from "../util/ShakeHandler";
import Map from "./Map";
import SpeechHandler, { Status } from "./SpeechHandler";

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
      countryData: null,
      speechStatus: Status.INACTIVE,
      selectedCountries: {
        first: null,
        second: null
      },
      focusedCountry: null
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
    // Parse the CSV containing country name and coordinate data for all countries.
    CSVParser.parse(countriesCSV, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: csv => {
        console.log("CSV file loaded!");
        this.setState({ countryData: csv.data });
      }
    });
    // Initialise handling for shake events.
    ShakeHandler(this.onShake.bind(this));
  }

  onShake = event => {
    console.log("onShake");
  };

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

  countrySelected = (newState, country) => {
    newState = {
      ...newState,
      selectedCountries: { ...this.state.selectedCountries, ...country }
    };
    const countryType = Object.keys(country)[0];

    if (!countryType || (countryType !== "first" && countryType !== "second")) {
      console.error("Unknown country type selected.");
      return;
    }

    if (countryType === "first") {
      newState = { ...newState, focusedCountry: country.first };
    } else if (countryType === "second") {
      const resetFocus = () => {
        this.setState({
          focusedCountry: null
        });
      };
      setTimeout(resetFocus.bind(this), 2000);
      newState = { ...newState, focusedCountry: country.second };
    }

    this.setState(newState);
  };

  speechStatusChanged = (status, countrySelection) => {
    const newState = { speechStatus: status };
    if (countrySelection) {
      this.countrySelected(newState, countrySelection);
    } else {
      this.setState(newState);
    }
  };

  incompatibleBrowserDetected = () => {
    window.location = "https://www.google.com/chrome/";
    this.setState({ incompatibleBrowser: true });
  };

  renderLoadingCSV = () => <div>Loading country data...</div>;

  renderMainContent = () => (
    <SpeechHandler
      status={this.state.speechStatus}
      countryData={this.state.countryData}
      speechStatusChanged={this.speechStatusChanged}
      incompatibleBrowserDetected={this.incompatibleBrowserDetected}
    >
      <Hammer
        {...hammerjsOptions}
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button onClick={this.onShake}>Simulate Shake</button>
            {Object.keys(Status).find(
              key => Status[key] === this.state.speechStatus
            )}
          </div>
          <Map
            countryData={this.state.countryData}
            focusedCountry={this.state.focusedCountry}
          />
        </RootContainer>
      </Hammer>
    </SpeechHandler>
  );

  render() {
    const { countryData, incompatibleBrowser } = this.state;

    if (incompatibleBrowser) {
      return null;
    } else if (!countryData) {
      return this.renderLoadingCSV();
    } else {
      return this.renderMainContent();
    }
  }
}

const RootContainer = styled.div`
  height: 100%;
`;
