import React from "react";
import styled, { keyframes } from "styled-components";
import Icon from "@mdi/react";
import { mdiMicrophone } from "@mdi/js";

const PADDING = 10; //pixels
const TRANSITION_DURATION = 100; //milliseconds

const NotificationBar = props => {
  const { message } = props;
  const style = { top: message ? 0 + PADDING : "-8vh" };
  return (
    <MainContainer style={style}>
      <NotificationContent>
        <MicrophoneIconContainer>
          <PulsingMicrophone path={mdiMicrophone} size={20} color="red" />
        </MicrophoneIconContainer>
        {message}
      </NotificationContent>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  position: fixed;
  background-color: white;
  opacity: 0.95;
  margin-left: ${PADDING}px;
  width: calc(100vw - ${2 * PADDING}px);
  height: 8vh;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  transition: top ${TRANSITION_DURATION}ms ease;
  -moz-transition: top ${TRANSITION_DURATION}ms ease;
  -webkit-transition: top ${TRANSITION_DURATION}ms ease;
  -o-transition: top ${TRANSITION_DURATION}ms ease;
`;

const NotificationContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - ${2 * PADDING}px);
  height: calc(100% - ${2 * PADDING}px);
  margin: ${PADDING}px;
`;

const MicrophoneIconContainer = styled.div`
  width: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${PADDING / 2}px;
  margin-right: ${PADDING}px;
`;

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const PulsingMicrophone = styled(Icon)`
  animation: ${pulse} 2s linear infinite;
`;

export default NotificationBar;
