import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import { Motion, spring } from "react-motion";

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
    const mapStyle = {
      width: "100vw",
      height: "100vh"
    };
    return (
      <MainContainer>
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
            <FadingMap
              projectionConfig={{ scale: 205 }}
              width={980}
              height={551}
              style={mapStyle}
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
            </FadingMap>
          )}
        </Motion>
      </MainContainer>
    );
  }
}

const MainContainer = styled.div`
  width: 100%;
  height: calc(100% - 5px);
  margin: 0 auto;
  background-color: #4884ee;
  background-image: linear-gradient(315deg, #4884ee 0%, #06bcfb 74%);
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FadingMap = styled(ComposableMap)`
  animation: ${fadeIn} 0.3s ease-in;
`;
