import React, { Component } from 'react';
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker,
} from "react-simple-maps"

const wrapperStyles = {
    width: "100%",
    height: "100%",
    margin: "0 auto",
}

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0, height: 0, center: [0, 20],
            zoom: 2,
            cities: [
                { name: "Zurich", coordinates: [8.5417, 47.3769] },
                { name: "Singapore", coordinates: [103.8198, 1.3521] },
                { name: "San Francisco", coordinates: [-122.4194, 37.7749] },
                { name: "Sydney", coordinates: [151.2093, -33.8688] },
                { name: "Lagos", coordinates: [3.3792, 6.5244] },
                { name: "Buenos Aires", coordinates: [-58.3816, -34.6037] },
                { name: "Shanghai", coordinates: [121.4737, 31.2304] },
            ]
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <div style={wrapperStyles}>
                <ComposableMap
                    projectionConfig={{
                        scale: 205,
                    }}
                    width={980}
                    height={551}
                    style={{
                        width: "100%",
                        height: "calc(100% - 5px)",
                    }}
                >
                    <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
                        <Geographies geography="/data/world-50m.json">
                            {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                                <Geography
                                    key={i}
                                    geography={geography}
                                    projection={projection}
                                    style={{
                                        default: {
                                            fill: "#ECEFF1",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        },
                                        hover: {
                                            fill: "#607D8B",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        },
                                        pressed: {
                                            fill: "#FF5722",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        },
                                    }}
                                />
                            ))}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        )
    }

}