import React from "react";
import MaterialSlider from "@material-ui/core/Slider";
import styled from "styled-components";
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
    padding: theme.spacing(3),
  },
  margin: {
    height: theme.spacing(3),
  },
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
        onChange={(event, newValue) => props.onChange(newValue)}
        valueLabelDisplay="on"
      />
    </SliderContainer>
  );
};

export default Slider;

const SliderContainer = styled.div`
    width: 80%; 
    color: '#52af77';
    backgroundColor: '#fff';
    border: '2px solid currentColor';
    position: absolute;
    bottom: 5%;
`

const PrettoSlider = withStyles({
  root: {
    color: 'magenta',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#000',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  mark: {
    backgroundColor: 'cyan',
    height: 10,
    width: 1,
  },
  // markActive: {
  //   opacity: 1,
  //   backgroundColor: 'currentColor',
  // },
})(MaterialSlider);