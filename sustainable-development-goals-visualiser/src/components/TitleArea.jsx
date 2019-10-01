import React from "react";
import styled, { keyframes } from "styled-components";

const TitleArea = props => {
  const { title } = props;
  return (
    <MainContainer>
      <Text>{title}</Text>
    </MainContainer>
  );
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const MainContainer = styled.div`
  // background-color: #ff9800;
  position: fixed;
  top: 15vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-in;
`;

const Text = styled.span`
  text-align: center;
  opacity: 0.85;
  color: white;
  font-size: 16pt;
  font-weight: bold;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export default TitleArea;
