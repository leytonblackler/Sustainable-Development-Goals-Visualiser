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
      <StartEndLabelsContainer>
        <YearLabel>{props.min}</YearLabel>
        <YearLabel>{props.max}</YearLabel>
      </StartEndLabelsContainer>
    </SliderContainer>
  );
};

export default Slider;

const SliderContainer = styled.div`
  width: 80vw;
  color: "#52af77";
  border: "2px solid currentColor";
  position: absolute;
  bottom: 5%;
`;

const StartEndLabelsContainer = styled.div`
  width: calc(80vw + 10px + 20px - 3px);
  margin-left: -20px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const YearLabel = styled.div`
  color: white;
  opacity: 0.95;
  font-family: CircularStd;
  font-size: 9pt;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  font-weight: 600;
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
    marginLeft: -17,
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
      opacity: 1,
      fontFamily: "CircularStd",
      fontSize: "9pt",
      textShadow:
        "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
      fontWeight: 600
    }
  },
  track: {
    opacity: 0
  },
  rail: {
    width: "calc(80vw + 10px)",
    marginLeft: "calc(-10px)",
    backgroundColor: "white",
    opacity: 0.65,
    height: 10,
    borderRadius: 10,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
  },
  mark: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 10,
    width: 10,
    marginTop: 0,
    marginLeft: -10
  }
})(MaterialSlider);
