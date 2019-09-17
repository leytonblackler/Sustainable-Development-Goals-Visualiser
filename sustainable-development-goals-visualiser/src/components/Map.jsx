import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";

import PinchToZoom from "react-pinch-and-zoom";

const wrapperStyles = {
  width: "100%",
  height: "calc(100% - 5px)",
  margin: "0 auto"
  //   backgroundColor: "orange"
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div style={wrapperStyles}>
        <PinchToZoom style={{ width: "100%" }}>
          <ComposableMap
            projectionConfig={{
              scale: 205
            }}
            width={980}
            height={700}
            style={{
              width: "100vw",
              height: "100vh"
              //   backgroundColor: "lime"
            }}
          >
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
          </ComposableMap>
        </PinchToZoom>
      </div>
    );
  }
}
