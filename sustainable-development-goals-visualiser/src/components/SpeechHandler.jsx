import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";

class SpeechHandler extends Component {
  constructor(props) {
    super(props);

    // browser.permissions.request(permissionsToRequest)
    // .then(onResponse)
    // .then((currentPermissions) => {
    // console.log(`Current permissions:`, currentPermissions);

    console.log("nav:", navigator);

    navigator.permissions.query({ name: "microphone" }).then(function(result) {
      console.log("mic request result: ", result);
    });
  }

  // setInterval(this.checkTranscript.bind(this), 1000);

  checkTranscript = () => {
    console.log("supported: ", this.props.browserSupportsSpeechRecognition);
    console.log("transcript: ", this.props.transcript);
    console.log("final transcript: ", this.props.finalTranscript);
    console.log("interim transcript: ", this.props.interimTranscript);
    // this.props.resetTranscript();
  };

  render = () => <div>hello</div>;
}

const options = {
  autoStart: true,
  continuous: true
};

export default SpeechRecognition(options)(SpeechHandler);
