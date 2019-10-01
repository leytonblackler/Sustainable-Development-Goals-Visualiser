import React from "react";
import styled from "styled-components";

import DoughnutChart from "./DoughnutChart"

const SingleInfoPanel = props => {
  const { country, categories } = props;

  return (
    <MainContainer>
    </MainContainer>
  );
};

const CountryInfoPanel = props => {
  const { country, data } = props;
  return (
    <CountryContainer>
      <ChartContainer>
        <DoughnutChart countryData={data} />
      </ChartContainer>
    </CountryContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: red;
`;

const CountryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45%;
  // background-color: magenta;
`;

const ChartContainer = styled.div`
  align-items: center;
  width: 100%;
  // background-color: orange;
`;

export default SingleInfoPanel;
