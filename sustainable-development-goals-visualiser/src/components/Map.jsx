import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";
import { Motion, spring } from "react-motion";

const wrapperStyles = {
  width: "100%",
  height: "calc(100% - 5px)",
  margin: "0 auto",
  backgroundColor: "orange"
};

export default class Map extends Component {
  constructor(props) {
    super(props);

    console.log("country data: ", props.countryData);

    this.state = { width: 0, height: 0, zoom: 1 };

    // const increaseZoom = () => {
    //   console.log("zooming: " + this.state.zoom);
    //   // this.setState({ zoom: this.state.zoom + 0.01 });
    // };

    // setInterval(increaseZoom, 1000);
  }

  render() {
    // console.log("rendering map, current state: ", this.props.state);
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205, //default: 205
            xOffset: 0,
            yOffset: 0,
            rotation: [0, 0, 0],
            precision: 0.1
          }}
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "cyan"
          }}
        >
          <ZoomableGroup center={[0, 20]} zoom={1} disablePanning>
            <Geographies geography="/data/world-50m.json">
              {(geographies, projection) =>
                geographies.map(
                  (geography, i) =>
                    geography.id !== "ATA" && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          hover: {
                            fill: "#607D8B",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          pressed: {
                            fill: "#FF5722",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          }
                        }}
                      />
                    )
                )
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

// <PinchToZoom
//           minZoomScale={2}
//           maxZoomScale={8}
//           // style={{ width: "100%" }}
//         ></PinchToZoom>

//         </PinchToZoom>
