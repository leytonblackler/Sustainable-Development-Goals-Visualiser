import React, { Component } from "react";
import styled from "styled-components";
import Hammer from "react-hammerjs";
import * as CSVParser from "papaparse";
import countriesCSV from "../static-data/countries.csv";
import ShakeHandler from "../util/ShakeHandler";
import Map from "./Map";
import SpeechHandler, { SpeechStatus } from "./SpeechHandler";
import NotificationBar from "./NotificationBar";

const GeneralStatus = {
  DEFAULT: 1, // Normal zoomed out view of map with no compare/single country info.
  COMPARING: 2, // Zoomed out, info visible comparing two countries.
  SHOWING_FOCUSED_COUNTRY: 3, // Zoomed in on a single country with no info visible.
  SHOWING_SINGLE_COUNTRY_INFO: 4, // Zoomed in on a single country with info visible.
  SHOWING_SECOND_COUNTRY_COMPARE: 5, // Used to temporarily focus on the second country when comparing, before zooming back out.
  WAITING_FOR_SPEECH_ACTION: 6,
  WAITING_FOR_FIRST_COUNTRY_COMPARE: 7,
  WAITING_FOR_SECOND_COUNTRY_COMPARE: 8,
  WAITING_FOR_SINGLE_COUNTRY_INFO: 9,
  WAITING_FOR_FOCUS_COUNTRY: 10
};

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
      generalStatus: GeneralStatus.DEFAULT,
      speechStatus: SpeechStatus.INACTIVE,
      currentCountries: []
    };
  }

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
    this.setState({
      currentCountries: [],
      generalStatus: GeneralStatus.WAITING_FOR_SPEECH_ACTION,
      speechStatus: SpeechStatus.WAITING_FOR_ACTION
    });
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

  // onResetTriggerSpoken = () => {
  //   console.log("onResetMap");
  //   this.setState({
  //     currentCountries: [],
  //     generalStatus: GeneralStatus.DEFAULT,
  //     speechStatus: SpeechStatus.INACTIVE
  //   });
  // };

  onCompareTriggerSpoken = () => {
    console.log("onCompare");
    this.setState({
      currentCountries: [],
      generalStatus: GeneralStatus.WAITING_FOR_FIRST_COUNTRY_COMPARE,
      speechStatus: SpeechStatus.WAITING_FOR_COUNTRY
    });
  };

  onInfoTriggerSpoken = () => {
    console.log("onInfo");
    this.setState({
      currentCountries: [],
      generalStatus: GeneralStatus.WAITING_FOR_SINGLE_COUNTRY_INFO,
      speechStatus: SpeechStatus.WAITING_FOR_COUNTRY
    });
  };

  onFocusTriggerSpoken = () => {
    console.log("onFocus");
    this.setState({
      currentCountries: [],
      generalStatus: GeneralStatus.WAITING_FOR_FOCUS_COUNTRY,
      speechStatus: SpeechStatus.WAITING_FOR_COUNTRY
    });
  };

  onSpeechTimeout = () => {
    console.log("onSpeechTimeout");
    this.onReset();
  };

  onCancelTriggerSpoken = () => {
    console.log("onSpeechCancel");
    this.onReset();
  };

  onReset = () => {
    console.log("onReset");
    this.setState({
      currentCountries: [],
      generalStatus: GeneralStatus.DEFAULT,
      speechStatus: SpeechStatus.INACTIVE
    });
  };

  onSelectCountry = country => {
    const { generalStatus, currentCountries } = this.state;
    switch (generalStatus) {
      case GeneralStatus.WAITING_FOR_FIRST_COUNTRY_COMPARE:
        this.setState({
          currentCountries: [country],
          generalStatus: GeneralStatus.WAITING_FOR_SECOND_COUNTRY_COMPARE,
          speechStatus: SpeechStatus.WAITING_FOR_COUNTRY
        });
        break;

      case GeneralStatus.WAITING_FOR_SECOND_COUNTRY_COMPARE:
        this.setState({
          currentCountries: [...currentCountries, country],
          generalStatus: GeneralStatus.SHOWING_SECOND_COUNTRY_COMPARE,
          speechStatus: SpeechStatus.INACTIVE
        });
        setTimeout(() => {
          this.setState({
            generalStatus: GeneralStatus.COMPARING
          });
        }, 2000);
        break;

      case GeneralStatus.WAITING_FOR_SINGLE_COUNTRY_INFO:
        this.setState({
          currentCountries: [country],
          generalStatus: GeneralStatus.SHOWING_SINGLE_COUNTRY_INFO,
          speechStatus: SpeechStatus.INACTIVE
        });
        break;

      case GeneralStatus.WAITING_FOR_FOCUS_COUNTRY:
        this.setState({
          currentCountries: [country],
          generalStatus: GeneralStatus.SHOWING_FOCUSED_COUNTRY,
          speechStatus: SpeechStatus.INACTIVE
        });
        break;

      default:
        console.error("Invalid state.");
    }
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

  currentlyFocusedCountry = () => {
    const { generalStatus, currentCountries } = this.state;

    switch (generalStatus) {
      case GeneralStatus.SHOWING_FOCUSED_COUNTRY:
      case GeneralStatus.SHOWING_SINGLE_COUNTRY_INFO:
      case GeneralStatus.WAITING_FOR_SECOND_COUNTRY_COMPARE:
        return currentCountries[0];
      case GeneralStatus.SHOWING_SECOND_COUNTRY_COMPARE:
        return currentCountries[1];
      default:
        return null;
    }
  };

  currentNotificationBarMessage = () => {
    const { generalStatus } = this.state;

    switch (generalStatus) {
      case GeneralStatus.WAITING_FOR_SPEECH_ACTION:
        return "Which action would you like to perform?";
      case GeneralStatus.WAITING_FOR_FIRST_COUNTRY_COMPARE:
        return "What is the first country you would like to compare?";
      case GeneralStatus.WAITING_FOR_SECOND_COUNTRY_COMPARE:
        return "What is the second country you would like to compare?";
      case GeneralStatus.SHOWING_SINGLE_COUNTRY_INFO:
        return "Which country would you like info about?";
      case GeneralStatus.WAITING_FOR_FOCUS_COUNTRY:
        return "Which country would you like to focus on?";
      default:
        return null;
    }
  };

  renderLoadingCSV = () => <div>Loading country data...</div>;

  renderMainContent = () => (
    <SpeechHandler
      status={this.state.speechStatus}
      countryData={this.state.countryData}
      onCancelTriggerSpoken={this.onCancelTriggerSpoken}
      onCompareTriggerSpoken={this.onCompareTriggerSpoken}
      onInfoTriggerSpoken={this.onInfoTriggerSpoken}
      onFocusTriggerSpoken={this.onFocusTriggerSpoken}
      onSelectCountry={this.onSelectCountry}
      onSpeechTimeout={this.onSpeechTimeout}
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
          <NotificationBar message={this.currentNotificationBarMessage()} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly"
            }}
          >
            <button onClick={this.onShake}>Simulate Shake</button>
            <button onClick={this.onReset}>Simulate Reset/Clear</button>
          </div>
          <Map
            countryData={this.state.countryData}
            focusedCountry={this.currentlyFocusedCountry()}
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

// <span>
// {this.state.speechStatus === SpeechStatus.INACTIVE
//   ? "Microphone is not active."
//   : "Microphone is active!"}
// </span>
// <span>
// General Status:
// {" " +
//   Object.keys(GeneralStatus).find(
//     key => GeneralStatus[key] === this.state.generalStatus
//   )}
// </span>
// <span>
// Speech Status:
// {" " +
//   Object.keys(SpeechStatus).find(
//     key => SpeechStatus[key] === this.state.speechStatus
//   )}
// </span>
