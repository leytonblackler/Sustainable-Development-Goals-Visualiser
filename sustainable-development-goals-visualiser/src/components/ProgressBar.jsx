import React, { Component } from "react";
import styled from "styled-components";

/**
 * Progress bar component showing a inner bar filled to a certain value
 */
class ProgressBar extends Component {
    render() {
        return (
            <Tracker>
                <ProgressInTracker value={this.props.value} progressColor={this.props.progressColor} />
            </Tracker>
        )
    }
}

const Tracker = styled.div`
    width: 100%;
    height: 10px;
    margin: 15px auto;
    background: lightgrey;
    border-radius: 10px;
`;

const ProgressInTracker = styled.div`
    width: ${props => props.value}%;
    height: 100%;
    background: ${props => props.progressColor};
    border-radius: 10px;
`;


export default ProgressBar;
