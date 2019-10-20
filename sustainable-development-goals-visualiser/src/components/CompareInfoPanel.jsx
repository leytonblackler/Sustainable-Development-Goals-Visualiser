import React from "react";
import styled from "styled-components";
import DoughnutChart from "./DoughnutChart"
import { Bar } from 'react-chartjs-2';
import { scaleLinear } from "d3-scale";


const CompareInfoPanel = props => {
  const { category, firstCountry, secondCountry, data } = props;
  // temporary data
  var firstCountryData = null;
  var secondCountryData = null;

  const countryName = firstCountry.name;
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.GeoAreaName == firstCountry.name) {
      firstCountryData = element.values
    }
    if (element.GeoAreaName == secondCountry.name) {
      secondCountryData = element.values
    }
    if (firstCountryData != null && secondCountryData != null) {
      break
    }
  }

  return (
    <MainContainer>
      <ComparisonInfoPanel  
                            countries={[firstCountry, secondCountry]}
                            data1={firstCountryData}
                            data2={secondCountryData} 
                            selectedCategoryColors={props.colour}/>
    </MainContainer>
  );
};

const ComparisonInfoPanel = props => {
  const {countries, data1, data2, selectedCategoryColors} = props;

  const colorScale = scaleLinear()
          .domain([0, 1])
          .range([selectedCategoryColors[0], selectedCategoryColors[1]])

  const dataSet = {
    labels: [countries[0].name, countries[1].name],
    datasets: [
      {
        // label: 'My First dataset',
        // fill: false,
        // lineTension: 0.1,
        backgroundColor: [colorScale(data1), colorScale(data2)],
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        // borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [data1, data2]
      }
    ]
  };

  const options =  {
    legend: {
      display: false
    },
    scales: {
      scales: {
        xAxes: [{
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            gridLines: {
                offsetGridLines: true
            }
        }]
    },
   tooltips: {
      enabled: false
   },
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
  return (
    <div style={{height: '100%', 'text-align': 'center'}}>
      <Bar data={dataSet} options={options}/>
      <h4>{countries[0].name} vs {countries[1].name}</h4>
    </div>
  );
}

const CountryInfoPanel = props => {
  const { country, data } = props;
  return (
    <CountryContainer>
      <div>
        <h3>{country.name}</h3>
      </div>
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
  // background-color: red;
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

export default CompareInfoPanel;
