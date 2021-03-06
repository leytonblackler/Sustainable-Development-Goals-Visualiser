import React from "react";
import styled from "styled-components";
import BounceLoader from "react-spinners/BounceLoader";

const Loading = props => {
  return (
    <MainContainer>
      <Text>Loading data...</Text>
      <BounceLoader sizeUnit={"px"} size={80} color={"#FFFFFF"} />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  // background-color: #4884ee;
  // background-image: linear-gradient(315deg, #4884ee 0%, #06bcfb 74%);
  background-color: #34516e;
  background-image: linear-gradient(315deg, #34516e 0%, #3498db 74%);
`;

const Text = styled.span`
  opacity: 0.85;
  color: white;
  font-size: 16pt;
  margin-bottom: 20px;
  font-weight: bold;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export default Loading;
