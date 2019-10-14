import React from "react";
import styled from "styled-components";

const Legend = props => {
  //   const { minColor, maxColor } = props;
  const minColor = "#FF0000";
  const maxColor = "#00FF00";
  return (
    <MainContainer>
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
  justify-content: center;
  align-items: center;
`;

const Bar = styled.div`
  width: calc(80vw + 10px);
  margin-left: calc(-10px);
  height: 10px;
  border-radius: 100px;
`;

export default Legend;
