import React from "react";
import styled from "styled-components";

const PADDING = 10; //pixels
const TRANSITION_DURATION = 100; //milliseconds

const NotificationBar = props => {
  const { message } = props;
  const style = { top: message ? 0 + PADDING : "-8vh" };
  return (
    <MainContainer style={style}>
      <NotificationContent>{message}</NotificationContent>
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
  justify-content: center;
  align-items: center;
  width: calc(100% - ${2 * PADDING}px);
  height: calc(100% - ${2 * PADDING}px);
  margin: ${PADDING}px;
`;

export default NotificationBar;
