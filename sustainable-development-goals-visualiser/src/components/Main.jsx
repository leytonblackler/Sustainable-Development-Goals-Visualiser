import React, { Component } from "react";
import styled from "styled-components";
import Hammer from "react-hammerjs";
import * as CSVParser from "papaparse";
import countryGeolocationDataCSV from "../static-data/country-geolocations.csv";
import unDataCSV from "../static-data/un-data.csv";
import ShakeHandler from "../util/ShakeHandler";
import Map from "./Map";
import SpeechHandler, { SpeechStatus } from "./SpeechHandler";
import NotificationBar from "./NotificationBar";
import Loading from "./Loading";
import InfoDrawer from "./InfoDrawer";
import CompareInfoPanel from "./CompareInfoPanel";
import SingleInfoPanel from "./SingleInfoPanel";
import TitleArea from "./TitleArea";
import ReactModal from "react-modal";
import SelectorWheel from "./SelectorWheel";
import Slider from "./Slider";
import { HelpButton } from "./HelpButton";
import { HelpContent } from "./HelpContent";

// TODO: this is duplicated in here and SelectorWheel
const categories = [
  "no_poverty",
  "zero_hunger",
  "quality_education",
  "clean_water",
  "internet_access",
  "sustainable_cities",
  "biodiversity"
];

const inDeveloperMode = true;
// !process.env.NODE_ENV || (process.env.NODE_ENV === "development" && false);

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
  WAITING_FOR_FOCUS_COUNTRY: 10,
  SHOWING_HELP: 11
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
      loaderShownForMinimumTime: false,
      countryGeolocationData: null,
      unData: null,
      generalStatus: GeneralStatus.DEFAULT,
      speechStatus: SpeechStatus.INACTIVE,
      currentCountries: [],
      selectedCategory: -1,
      currentYear: "2015",
      metric: "water"
    };
    setTimeout(
      () => this.setState({ loaderShownForMinimumTime: true }),
      inDeveloperMode ? 0 : 2000
    );
    ReactModal.setAppElement("#root");
    console.log(inDeveloperMode);
  }

  componentDidMount() {
    // Parse the CSV containing country name and coordinate data for all countries.
    CSVParser.parse(countryGeolocationDataCSV, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: csv => {
        console.log("Country geolocations CSV file loaded!");
        this.setState({ countryGeolocationData: csv.data });
      }
    });

    CSVParser.parse(unDataCSV, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: csv => {
        console.log("UN SDGV CSV file loaded!");
        this.setState({ unData: csv.data });
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

  // onPress gets mapped to opening selector wheel
  // onPressUp gets mapped to closing selector wheel when no selection has been made
  // onPanEnd generally means a selection has been made
  onPanEnd = event => {
    console.log("onPanEnd");
    this.onPressUp();
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

  onInfoDrawerClose = () => {
    console.log("onInfoDrawerClose");
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

  onHelpButtonPressed = () => {
    console.log("help button pressed");
    this.onReset();
    this.setState({
      generalStatus: GeneralStatus.SHOWING_HELP
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
      case GeneralStatus.WAITING_FOR_SINGLE_COUNTRY_INFO:
        return "Which country would you like info about?";
      case GeneralStatus.WAITING_FOR_FOCUS_COUNTRY:
        return "Which country would you like to focus on?";
      default:
        return null;
    }
  };

  currentTitleText = () => {
    const { generalStatus, currentCountries } = this.state;

    switch (generalStatus) {
      case GeneralStatus.DEFAULT:
        return "Sustainable Development Goals Visualiser";
      case GeneralStatus.COMPARING:
        return (
          "Comparing " +
          currentCountries[0].name +
          " and " +
          currentCountries[1].name
        );
      case GeneralStatus.SHOWING_SINGLE_COUNTRY_INFO:
        return "Showing info for " + currentCountries[0].name;
      case GeneralStatus.SHOWING_FOCUSED_COUNTRY:
        return currentCountries[0].name;
      default:
        return null;
    }
  };

  currentDrawerData = () => {
    const { generalStatus, currentCountries, category } = this.state;

    switch (generalStatus) {
      case GeneralStatus.COMPARING:
        let firstCountry = currentCountries[0];
        let secondCountry = currentCountries[1];
        return {
          title: "Comparing Countries",
          content: (
            <CompareInfoPanel
              category={category}
              firstCountry={firstCountry}
              secondCountry={secondCountry}
            />
          )
        };
      case GeneralStatus.SHOWING_SINGLE_COUNTRY_INFO:
        return {
          title: "Info for " + currentCountries[0].name,
          content: <SingleInfoPanel country={currentCountries[0]} />
        };
      case GeneralStatus.SHOWING_HELP:
        return {
          title: "Interacting with the Visualisation",
          content: <HelpContent />
        };
      default:
        return null;
    }
  };

  setSelectedCategory = index => {
    this.setState({ selectedCategory: categories[index] });
    console.log(this.state.selectedCategory);
  };

  onCurrentYearChanged = value => {
    this.setState({ currentYear: value });
    console.log(this.state.currentYear);
  };

  renderMainContent = () => (
    <SpeechHandler
      status={this.state.speechStatus}
      countryGeolocationData={this.state.countryGeolocationData}
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
          <HelpButton onClick={this.onHelpButtonPressed} />
          <TitleArea title={this.currentTitleText()} />
          <NotificationBar message={this.currentNotificationBarMessage()} />
          <SelectorWheel
            openModalHandler={event => (this.onPress = event)}
            closeModalHandler={event => (this.onPressUp = event)}
            setSelectedSegment={this.setSelectedCategory}
          ></SelectorWheel>
          <InfoDrawer
            data={this.currentDrawerData()}
            onClose={this.onInfoDrawerClose}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly"
            }}
          >
            {inDeveloperMode ? (
              <div>
                <button onClick={this.onShake}>
                  Simulate Shake (Activate voice)
                </button>
                <button onClick={this.onReset}>
                  Simulate Multi-touch Swipe Down (Clear/Reset)
                </button>
                <button
                  onClick={() => {
                    this.setState({
                      generalStatus: GeneralStatus.SHOWING_SINGLE_COUNTRY_INFO,
                      countries: [
                        this.state.countryGeolocationData.find(
                          item => item.name === "New Zealand"
                        )
                      ]
                    });
                  }}
                >
                  Info on New Zealand
                </button>
                <button
                  onClick={() => {
                    this.setState({ metric: "water" });
                  }}
                >
                  Water
                </button>
                <button
                  onClick={() => {
                    this.setState({ metric: "internet" });
                  }}
                >
                  Internet
                </button>
              </div>
            ) : null}
          </div>
          <Map
            countryGeolocationData={this.state.countryGeolocationData}
            focusedCountry={this.currentlyFocusedCountry()}
            metric={this.state.metric}
          />
        </RootContainer>
      </Hammer>
      <SliderContainer>
        <Slider
          label="Year"
          min={2000}
          max={2017}
          value={this.state.currentYear}
          onChange={this.onCurrentYearChanged}
        />
      </SliderContainer>
    </SpeechHandler>
  );

  dataHasLoaded = () => {
    const {
      countryGeolocationData,
      unData,
      loaderShownForMinimumTime
    } = this.state;
    return (!countryGeolocationData && !unData) || !loaderShownForMinimumTime;
  };

  render() {
    const { incompatibleBrowser } = this.state;

    if (incompatibleBrowser) {
      return null;
    } else if (this.dataHasLoaded()) {
      return <Loading />;
    } else {
      return this.renderMainContent();
    }
  }
}

const RootContainer = styled.div`
  height: 100%;
`;

const SliderContainer = styled.div`
  position: absolute;
  left: 60px;
  top: 700px;
`;
