import { Component } from "react";
import SpeechRecognition from "react-speech-recognition";

const TRIGGER_WORD = "compare";

export const Status = {
  WAITING_FOR_TRIGGER: 1,
  WAITING_FOR_FIRST_COUNTRY: 2,
  WAITING_FOR_SECOND_COUNTRY: 3,
  IDLE: 4
};

class SpeechHandler extends Component {
  constructor(props) {
    super(props);

    if (!props.browserSupportsSpeechRecognition) {
      props.incompatibleBrowserDetected();
      return;
    }

    // Request microphone permissions.
    // navigator.permissions.query({ name: "microphone" }).then(function(result) {
    //   console.log("mic request result: ", result);
    // });

    setInterval(this.checkTranscript.bind(this), 1000);
  }

  checkTranscript = () => {
    const {
      status,
      interimTranscript,
      finalTranscript,
      speechStatusChanged
    } = this.props;
    const transcript = (interimTranscript + finalTranscript).toLowerCase();

    if (status === Status.WAITING_FOR_TRIGGER) {
      this.checkForTrigger(transcript, speechStatusChanged);
    } else if (
      status === Status.WAITING_FOR_FIRST_COUNTRY ||
      status === Status.WAITING_FOR_SECOND_COUNTRY
    ) {
      this.checkForCountry(transcript, status, speechStatusChanged);
    }
  };

  checkForTrigger = (transcript, speechStatusChanged) => {
    if (transcript.includes(TRIGGER_WORD.toLowerCase())) {
      this.props.resetTranscript();
      speechStatusChanged(Status.WAITING_FOR_FIRST_COUNTRY);
    }
  };

  checkForCountry = (transcript, status, speechStatusChanged) => {
    const foundCountry = this.props.countryData.find(country => {
      return transcript.includes(country.name.toLowerCase());
    });
    if (foundCountry) {
      this.props.resetTranscript();
      if (status === Status.WAITING_FOR_FIRST_COUNTRY) {
        speechStatusChanged(Status.WAITING_FOR_SECOND_COUNTRY, {
          first: foundCountry
        });
      } else if (status === Status.WAITING_FOR_SECOND_COUNTRY) {
        speechStatusChanged(Status.IDLE, {
          second: foundCountry
        });
      }
      this.props.resetTranscript();
    }
  };

  render = () => null;
}

const options = {
  autoStart: true,
  continuous: true
};

export default SpeechRecognition(options)(SpeechHandler);
