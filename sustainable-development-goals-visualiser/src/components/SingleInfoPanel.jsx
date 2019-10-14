import React from "react";
import styled from "styled-components";

const SingleInfoPanel = props => {
    const { country, selectedYear, categories, categoryTitleMap, data } = props;
    let processedData = processData(selectedYear, country, data)
    console.log(processedData)
    return (
        <MainContainer>
            {categories.map(category => {
                let categoryTitle = categoryTitleMap[category].title
                return renderCategoryInfoPanel(categoryTitle)
            })
            }
        </MainContainer>
    );
};

const processData = (selectedYear, country, data) => {
    let processedData = []

    processedData = data.filter(
        row => row["TimePeriod"] === selectedYear
    ).filter(
        row => row["GeoAreaName"] === country.name
    );

    return processedData;
}

const renderCategoryInfoPanel = categoryTitle => {
    return (
        <CategoryTitleContainer>
            {categoryTitle}
        </CategoryTitleContainer>
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

const CategoryTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: red;
`;

export default SingleInfoPanel;
