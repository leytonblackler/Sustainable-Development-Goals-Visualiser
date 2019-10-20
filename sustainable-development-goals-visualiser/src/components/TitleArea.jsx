import React from "react";
import styled, { keyframes } from "styled-components";

const TitleArea = props => {
  const { title, subtitle } = props;
  return (
    <MainContainer>
      <PrimaryText>{title}</PrimaryText>
      <SecondaryText>{subtitle}</SecondaryText>
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
  position: fixed;
  top: 15vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-in;
`;

const PrimaryText = styled.span`
  text-align: center;
  opacity: 0.9;
  color: white;
  font-size: 16pt;
  font-weight: bold;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin-left: 20px;
  margin-right: 20px;
`;

const SecondaryText = styled.span`
  text-align: center;
  opacity: 0.9;
  color: white;
  font-size: 12pt;
  font-weight: medium;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin-left: 20px;
  margin-right: 20px;
`;

export default TitleArea;
