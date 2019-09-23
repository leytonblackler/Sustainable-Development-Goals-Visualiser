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
  background-color: #4884ee;
  background-image: linear-gradient(315deg, #4884ee 0%, #06bcfb 74%);
`;

const Text = styled.span`
  color: white;
  font-size: 16pt;
  margin-bottom: 20px;
  font-weight: bold;
`;

export default Loading;
