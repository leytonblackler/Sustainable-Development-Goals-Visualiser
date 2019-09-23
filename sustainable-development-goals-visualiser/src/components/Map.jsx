import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import { Motion, spring } from "react-motion";

const wrapperStyles = {
  width: "100%",
  height: "calc(100% - 5px)",
  margin: "0 auto",
  backgroundColor: "background-color: #045de9",
  backgroundImage: "linear-gradient(315deg, #045de9 0%, #09c6f9 74%)"
};

export default class Map extends Component {
  getCurrentMapConfiguration() {
    const { focusedCountry } = this.props;
    return this.props.focusedCountry
      ? {
          zoom: 4,
          center: [
            Number(focusedCountry.longitude),
            Number(focusedCountry.latitude)
          ]
        }
      : {
          zoom: 1,
          center: [0, 20]
        };
  }

  render() {
    const configuration = this.getCurrentMapConfiguration();
    return (
      <div style={wrapperStyles}>
        <Motion
          defaultStyle={{
            zoom: 1,
            x: 0,
            y: 20
          }}
          style={{
            zoom: spring(configuration.zoom, { stiffness: 210, damping: 20 }),
            x: spring(configuration.center[0], { stiffness: 210, damping: 20 }),
            y: spring(configuration.center[1], { stiffness: 210, damping: 20 })
          }}
        >
          {({ zoom, x, y }) => (
            <ComposableMap
              projectionConfig={{ scale: 205 }}
              width={980}
              height={551}
              style={{
                width: "100vw",
                height: "100vh"
              }}
            >
              <ZoomableGroup center={[x, y]} zoom={zoom} disablePanning>
                <Geographies geography="/data/world-110m.json">
                  {(geographies, projection) =>
                    geographies.map(
                      (geography, i) =>
                        geography.id !== "010" && (
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
                                fill: "#ECEFF1",
                                stroke: "#607D8B",
                                strokeWidth: 0.75,
                                outline: "none"
                              },
                              pressed: {
                                fill: "#ECEFF1",
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
          )}
        </Motion>
      </div>
    );
  }
}
