import React, { Component } from "react";
import styled from "styled-components";
import Hammer from "react-hammerjs";

import * as CSVParser from "papaparse";
import countriesCSV from "../static-data/countries.csv";

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
      speechStatus: Status.WAITING_FOR_TRIGGER,
      selectedCountries: {
        first: null,
        second: null
      }
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

  countrySelected = country => {
    this.setState({
      selectedCountries: { ...this.state.selectedCountries, ...country }
    });
    const countryType = Object.keys(country)[0];

    if (!countryType || (countryType !== "first" && countryType !== "second")) {
      console.error("Unknown country type selected.");
      return;
    }

    if (countryType === "first") {
      console.log("Selected first country: " + country.first.name);
    } else if (countryType === "second") {
      console.log("Selected second country: " + country.second.name);
    }
  };

  speechStatusChanged = status => {
    this.setState({ speechStatus: status });
    // let newState = { ...this.state, speechStatus: status };
    // if (status === Status.WAITING_FOR_TRIGGER) {
    //   newState = {
    //     ...newState,
    //     message: null,
    //     selectedCountries: { first: null, second: null }
    //   };
    // } else if (status === Status.WAITING_FOR_FIRST_COUNTRY) {
    //   newState = {
    //     ...newState,
    //     message: "What is the first country you would like to select?",
    //     selectedCountries: { first: null, second: null }
    //   };
    // } else if (status === Status.WAITING_FOR_SECOND_COUNTRY) {
    //   newState = {
    //     ...newState,
    //     message: "What is the first country you would like to select?",
    //     selectedCountries: { first: null, second: null }
    //   };
    // }
  };

  incompatibleBrowserDetected = () => {
    window.location = "https://www.google.com/chrome/";
    this.setState({ incompatibleBrowser: true });
  };

  renderLoadingCSV = () => <div>Loading country data...</div>;

  renderMainContent = () => (
    <Hammer {...this}>
      <RootContainer>
        <div>
          {Object.keys(Status).find(
            key => Status[key] === this.state.speechStatus
          )}
        </div>
        <SpeechHandler
          status={this.state.speechStatus}
          countryData={this.state.countryData}
          countrySelected={this.countrySelected}
          speechStatusChanged={this.speechStatusChanged}
          incompatibleBrowserDetected={this.incompatibleBrowserDetected}
        />
        <Map countryData={this.state.countryData} />
      </RootContainer>
    </Hammer>
  );

  render() {
    console.log("state: ", this.state);

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
