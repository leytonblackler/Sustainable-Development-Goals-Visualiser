import React from "react";
import styled from "styled-components";

const SingleInfoPanel = props => {
    const { country, selectedYear, categories, categoryTitleMap, data } = props;
    let processedData = processData(selectedYear, country, data);
    return (
        <MainContainer>
            {categories.map(category => {
                let categoryTitle = categoryTitleMap[category].title;
                let percentage = getValue(category, processedData) * 100;
                return renderCategoryInfoPanel(categoryTitle, percentage);
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

const renderCategoryInfoPanel = (categoryTitle, percentage) => {
    return (
        <CategoryContainer>
            {categoryTitle} {percentage ? percentage : 0}%
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
