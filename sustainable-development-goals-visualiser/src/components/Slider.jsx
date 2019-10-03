import React from "react";
import MaterialSlider from "@material-ui/core/Slider";
import styled from "styled-components";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
    padding: theme.spacing(3)
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const Slider = props => {
  const classes = useStyles();

  return (
    <SliderContainer>
      <PrettoSlider
        marks
        valueLabelDisplay="auto"
        step={1}
        min={props.min}
        max={props.max}
        value={props.value}
        onChangeCommitted={(event, newValue) =>
          props.onChangeCommitted(newValue)
        }
        valueLabelDisplay="on"
      />
    </SliderContainer>
  );
};

export default Slider;

const SliderContainer = styled.div`
  width: 80%;
  color: "#52af77";
  border: "2px solid currentColor";
  position: absolute;
  bottom: 5%;
`;

const PrettoSlider = withStyles({
  root: {
    opacity: 0.9
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "white",
    marginTop: -7,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    border: "0px solid #3498db",
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    marginLeft: 11,
    marginTop: 15,
    "& *": {
      background: "transparent",
      color: "white",
      opacity: 0.95,
      fontFamily: "CircularStd",
      fontSize: "9pt"
    }
  },
  track: {
    opacity: 0
  },
  rail: {
    backgroundColor: "white",
    opacity: 0.65,
    height: 10,
    borderRadius: 10,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
  },
  mark: {
    backgroundColor: "#3498db",
    height: 0,
    width: 0,
    marginTop: 0
  }
  // markActive: {
  //   opacity: 1,
  //   backgroundColor: 'currentColor',
  // },
})(MaterialSlider);
