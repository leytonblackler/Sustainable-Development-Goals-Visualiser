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
      { trigger: "compare", handler: props.onCompareTriggerSpoken },
      { trigger: "cancel", handler: props.onCancelTriggerSpoken }
    ];

    if (!props.browserSupportsSpeechRecognition) {
      props.incompatibleBrowserDetected();
      return;
    }

    // Request microphone permissions.
    navigator.permissions.query({ name: "microphone" }).then(function(result) {
      console.log("mic request result: ", result);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { status, listening, onSpeechTimeout } = this.props;

    if (status !== SpeechStatus.INACTIVE) {
      if (!listening) {
        if (!activated) {
          this.startSpeech();
        } else {
          // console.log("Speech timed out!");
          onSpeechTimeout();
        }
      }
    } else {
      this.endSpeech();
      // console.log("Speech is now inactive.");
    }
  }

  startSpeech = () => {
    this.endSpeech();
    // console.log("Starting speech...");
    this.props.startListening();
    transcriptChecker = setInterval(this.checkTranscript.bind(this), 1000);
    activated = true;
    // console.log("Speech is active!");
  };

  endSpeech = () => {
    // console.log("Ending speech...");
    if (transcriptChecker) {
      clearInterval(transcriptChecker);
    }
    activated = false;
  };

  checkTranscript = () => {
    const { status, interimTranscript, finalTranscript } = this.props;
    const transcript = (interimTranscript + finalTranscript).toLowerCase();

    // console.log("Checking transcript...", transcript);

    if (status === SpeechStatus.WAITING_FOR_ACTION) {
      this.checkForAction(transcript);
    } else if (status === SpeechStatus.WAITING_FOR_COUNTRY) {
      this.checkForCountry(transcript);
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
    const { onSelectCountry } = this.props;
    const foundCountry = this.props.countryData.find(country => {
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
