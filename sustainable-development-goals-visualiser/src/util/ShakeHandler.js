import Shake from "shake.js";

const ShakeHandler = onShake => {
  navigator.permissions.query({ name: "gyroscope" }).then(function(result) {
    console.log("accelerometer request result: ", result);
    const ShakeEvent = new Shake({
      threshold: 15, // optional shake strength threshold
      timeout: 1000 // optional, determines the frequency of event generation
    });
    ShakeEvent.start();
    console.log("shake event", ShakeEvent);
    console.log(window);
    window.addEventListener("shake", onShake, false);
  });
};

export default ShakeHandler;
