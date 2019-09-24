import React from "react";
import styled from "styled-components";
import DoughnutChart from "./DoughnutChart"

const CompareInfoPanel = props => {
  const { category, firstCountry, secondCountry } = props;
  const countryOneData = [];
  const countryTwoData = [];

  return (
    <MainContainer>
      <TitleContainer>
        <h2>{category}</h2>
      </TitleContainer>
      <CountryContainer>
        <h3>{firstCountry.name}</h3>
        <DoughnutChart data={countryOneData} />
      </CountryContainer>
      <CountryContainer>
        <h3>{secondCountry.name}</h3>
        <DoughnutChart data={countryTwoData} />
      </CountryContainer>
    </MainContainer>
  );
};

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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45%;
  background-color: magenta;
`;

export default CompareInfoPanel;
