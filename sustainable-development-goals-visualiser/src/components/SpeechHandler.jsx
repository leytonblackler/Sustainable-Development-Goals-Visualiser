import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";

class SpeechHandler extends Component {
  constructor(props) {
    super(props);

    // browser.permissions.request(permissionsToRequest)
    // .then(onResponse)
    // .then((currentPermissions) => {
    // console.log(`Current permissions:`, currentPermissions);

    // console.log("nav:", navigator);

    navigator.permissions.query({ name: "microphone" }).then(function(result) {
      console.log("mic request result: ", result);
    });

    // console.log(countries);

    setInterval(this.checkTranscript.bind(this), 1000);
  }

  checkTranscript = () => {
    const transcript = this.props.finalTranscript.toLowerCase();
    // console.log("current transcript:", transcript);
    const found = this.props.countryData.find(country => {
      return transcript.includes(country.name.toLowerCase());
    });
    if (found) {
      console.log("Detected country: ", found);
      this.props.resetTranscript();
    }

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
