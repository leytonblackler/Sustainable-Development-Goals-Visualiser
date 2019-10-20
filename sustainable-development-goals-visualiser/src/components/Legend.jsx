import React from "react";
import styled from "styled-components";

const Legend = props => {
  const { minColor, maxColor } = props;
  return (
    <MainContainer>
      <StartEndLabelsContainer>
        <PercentageLabel style={{ marginLeft: 10 }}>Lowest</PercentageLabel>
        <PercentageLabel style={{ marginRight: -4 }}>Highest</PercentageLabel>
      </StartEndLabelsContainer>
      <Bar
        style={{
          backgroundImage: `linear-gradient(to right, ${minColor}, ${maxColor})`
        }}
      />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Bar = styled.div`
  width: calc(80vw + 10px);
  margin-left: calc(-10px);
  height: 10px;
  border-radius: 100px;
`;

const StartEndLabelsContainer = styled.div`
  width: calc(80vw + 10px + 20px);
  margin-bottom: 10px;
  margin-left: -20px;
  height: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PercentageLabel = styled.div`
  color: white;
  opacity: 0.95;
  font-family: CircularStd;
  font-size: 9pt;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  font-weight: 600;
`;

export default Legend;
