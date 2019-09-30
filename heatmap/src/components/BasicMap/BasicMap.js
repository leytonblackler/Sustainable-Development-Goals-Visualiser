import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

const popScale = scaleLinear()
  .domain([0,100000000,1400000000])
  .range(["#FF0000","#00FF00","#0000FF"])

const gdpScale = scaleLinear()
  .domain([0, 20000, 400000])
  .range(["#FF0000","#00FF00","#0000FF"])



class BasicMap extends Component {

  computeFill(geography, metric){
    // return gdpScale(geography.properties.gdp_md_est)
    console.log(metric)
    if (metric ===  "gdp") {
      return gdpScale(geography.properties.gdp_md_est)
    } else {
      return popScale(geography.properties.pop_est)
    }
  }

  renderMap = () => {
      return (
      <ComposableMap
        projectionConfig={{
          scale: 205,
          rotation: [-11,0,0],
        }}
        width={980}
        height={551}
        style={{
          width: "100%",
          height: "auto",
        }}
        >
        <ZoomableGroup center={[0,20]}>
          <Geographies geography={ "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/examples/choropleth-map/static/world-50m-with-population.json" }>
            {(geographies, projection) => geographies.map((geography, i) => (
              <Geography
                key={ i }
                geography={ geography }
                projection={ projection }
                onClick={ this.handleClick }
                style={{
                  default: {
                    fill: this.computeFill(geography, this.props.metric),
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                  hover: {
                    fill: "#263238",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                  pressed: {
                    fill: "#263238",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                  }
                }}
              />
            ))}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      )
  }


  render() {
    // console.log(this.props.metric)
    return (
      <div style={wrapperStyles}>
        {this.renderMap()}
      </div>
    )
  }
}

export default BasicMap