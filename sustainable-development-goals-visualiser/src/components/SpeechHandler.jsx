import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";

const TRIGGER_WORD = "compare";

class SpeechHandler extends Component {
  constructor(props) {
    super(props);

    // browser.permissions.request(permissionsToRequest)
    // .then(onResponse)
    // .then((currentPermissions) => {
    // console.log(`Current permissions:`, currentPermissions);

    // console.log("nav:", navigator);
    if (!props.browserSupportsSpeechRecognition) {
      props.incompatibleBrowserDetected();
      return;
    }

    navigator.permissions.query({ name: "microphone" }).then(function(result) {
      console.log("mic request result: ", result);
    });

    // console.log(countries);

    setInterval(this.checkTranscript.bind(this), 1000);
  }

  checkTranscript = () => {
    const transcript = this.props.interimTranscript.toLowerCase();

    //First check to see if the trigger word has been spoken.
    if (transcript.includes(TRIGGER_WORD.toLowerCase())) {
      console.log("Activating compare...");
      this.props.resetTranscript();
    }

    // console.log("current transcript:", transcript);
    // const found = this.props.countryData.find(country => {
    //   return transcript.includes(country.name.toLowerCase());
    // });
    // if (found) {
    //   console.log("Detected country: ", found);
    //   this.props.resetTranscript();
    // }

    // else {
    //   console.log("Did not detect country.");
    // }
    //

    // console.log("supported: ", this.props.browserSupportsSpeechRecognition);
  };

  render = () => null;
}

const options = {
  autoStart: true,
  continuous: true
};

export default SpeechRecognition(options)(SpeechHandler);
