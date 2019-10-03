import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import { Motion, spring } from "react-motion";
import { scaleLinear } from "d3-scale";
import { SSL_OP_TLS_ROLLBACK_BUG } from "constants";

const colorScale = scaleLinear()
  .domain([0, 1])
  .range(["#004400", "#00FF00"]);

const NO_DATA_FOR_COUNTRY_COLOR = "#888888";
const DATA_NOT_LOADED_COLOR = "#FF0000";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  computeFill(geography, metric) {
    const countryName = geography.properties.admin;

    //console.log(this.props.currentData)

    if (this.props.currentData == null) {
      return DATA_NOT_LOADED_COLOR;
    }
    for (let index = 0; index < this.props.currentData.length; index++) {
      const element = this.props.currentData[index];
      if (element.GeoAreaName == countryName) {
        return colorScale(element.values);
      }
    }
    return NO_DATA_FOR_COUNTRY_COLOR;
  }

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
    const data = "/data/world-50m-with-population.json";
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
                <Geographies disableOptimization geography={data}>
                  {(geographies, projection) =>
                    geographies.map(
                      (geography, i) =>
                        geography.properties.name !== "Antarctica" && (
                          <Geography
                            key={i}
                            geography={geography}
                            projection={projection}
                            style={{
                              default: {
                                fill: this.computeFill(
                                  geography,
                                  this.props.metric
                                ),
                                fillOpacity: 0.85,
                                stroke: "white",
                                strokeWidth: 0.5,
                                outline: "none"
                              },
                              hover: {
                                fill: "white",
                                fillOpacity: 0.85,
                                stroke: "white",
                                strokeWidth: 0.5,
                                outline: "none"
                              },
                              pressed: {
                                fill: "white",
                                fillOpacity: 0.85,
                                stroke: "white",
                                strokeWidth: 0.5,
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
  height: 100%;
  margin: 0 auto;
  // background-color: #4884ee;
  // background-image: linear-gradient(315deg, #4884ee 0%, #06bcfb 74%);
  background-color: #34516e;
  background-image: linear-gradient(315deg, #34516e 0%, #3498db 74%);
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
  animation: ${fadeIn} 0.5s ease-in;
`;
