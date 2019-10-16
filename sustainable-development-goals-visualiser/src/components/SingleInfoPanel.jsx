import React from "react";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";

const SingleInfoPanel = props => {
    const { country, selectedYear, categories, categoryTitleMap, colorMapping, data } = props;
    let processedData = processData(selectedYear, country, data);
    return (
        <MainContainer>
            {categories.map(category => {
                let progressColor = colorMapping[category][1];
                let categoryTitle = categoryTitleMap[category].title;
                let percentage = (getValue(category, processedData) * 100).toFixed(2);
                return renderCategoryInfoPanel(categoryTitle, percentage, progressColor);
            })
            }
        </MainContainer>
    );
};

const getValue = (category, processedData) => {
    for (let row of processedData) {
        if (row["SeriesCode"] === category) {
            return row["values"];
        }
    }
}

const processData = (selectedYear, country, data) => {
    let processedData = data.filter(
        row => row["TimePeriod"] === selectedYear
    ).filter(
        row => row["GeoAreaName"] === country
    );

    return processedData;
}

const renderCategoryInfoPanel = (categoryTitle, percentage, progressColor) => {
    let percentageFormatted = isNaN(percentage) ? Number(0).toFixed(2) : percentage

    return (
        <CategoryContainer>
            {categoryTitle} {percentageFormatted}%
            <ProgressBar value={percentageFormatted} progressColor={progressColor} />
        </CategoryContainer>
    );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  //background-color: magenta;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  //background-color: orange;
`;

export default SingleInfoPanel;
