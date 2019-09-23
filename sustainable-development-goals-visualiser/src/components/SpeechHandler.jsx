import { Component } from "react";
import SpeechRecognition from "react-speech-recognition";

export const SpeechStatus = {
  INACTIVE: 1,
  WAITING_FOR_ACTION: 2,
  WAITING_FOR_COUNTRY: 3
};

let transcriptChecker;
let activated = false;

class SpeechHandler extends Component {
  constructor(props) {
    super(props);

    this.ACTIONS = [
      { trigger: "info", handler: props.onInfoTriggerSpoken },
      { trigger: "focus", handler: props.onFocusTriggerSpoken },
      { trigger: "compare", handler: props.onCompareTriggerSpoken }
    ];

    if (!props.browserSupportsSpeechRecognition) {
      props.incompatibleBrowserDetected();
      return;
    }

    // Request microphone permissions.
    navigator.permissions.query({ name: "microphone" }).then(function(result) {
      if (result.state === "granted") {
        console.log("Microphone access granted.");
      } else {
        console.error("Microphone access was not granted.");
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { status, listening, onSpeechTimeout } = this.props;

    if (status !== SpeechStatus.INACTIVE) {
      if (!listening) {
        if (!activated) {
          this.startSpeech();
        } else {
          onSpeechTimeout();
        }
      }
    } else {
      this.endSpeech();
    }
  }

  startSpeech = () => {
    this.endSpeech();
    this.props.startListening();
    transcriptChecker = setInterval(this.checkTranscript.bind(this), 1000);
    activated = true;
  };

  endSpeech = () => {
    if (transcriptChecker) {
      clearInterval(transcriptChecker);
    }
    activated = false;
  };

  checkTranscript = () => {
    const { status, interimTranscript, finalTranscript } = this.props;
    const transcript = (interimTranscript + finalTranscript).toLowerCase();
    this.checkForCancel(transcript);
    if (status === SpeechStatus.WAITING_FOR_ACTION) {
      this.checkForAction(transcript);
    } else if (status === SpeechStatus.WAITING_FOR_COUNTRY) {
      this.checkForCountry(transcript);
    }
  };

  checkForCancel = transcript => {
    const { onCancelTriggerSpoken } = this.props;
    if (transcript.includes("cancel")) {
      onCancelTriggerSpoken();
    }
  };

  checkForAction = transcript => {
    const foundAction = this.ACTIONS.find(action =>
      transcript.includes(action.trigger.toLowerCase())
    );
    if (foundAction) {
      foundAction.handler();
      this.endSpeech();
    }
  };

  checkForCountry = transcript => {
    const { countryGeolocationData, onSelectCountry } = this.props;
    const foundCountry = countryGeolocationData.find(country => {
      return transcript.includes(country.name.toLowerCase());
    });
    if (foundCountry) {
      this.endSpeech();
      onSelectCountry(foundCountry);
    }
  };

  render = () => this.props.children;
}

const options = {
  autoStart: false,
  continuous: false
};

export default SpeechRecognition(options)(SpeechHandler);
