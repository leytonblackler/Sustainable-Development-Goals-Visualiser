import Shake from "shake.js";

const ShakeHandler = onShake => {
  // Request accelerometer permissions.
  navigator.permissions.query({ name: "accelerometer" }).then(function(result) {
    if (result.state === "granted") {
      console.log("Accelerometer access granted.");
    } else {
      console.error("Accelerometer access was not granted.");
    }
    new Shake({
      threshold: 15, // optional shake strength threshold
      timeout: 1000 // optional, determines the frequency of event generation
    }).start();
    window.addEventListener("shake", onShake, false);
  });
};

export default ShakeHandler;
