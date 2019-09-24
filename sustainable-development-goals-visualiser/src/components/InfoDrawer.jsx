import React from "react";
import styled from "styled-components";
import Drawer from "react-drag-drawer";
import { css } from "emotion";

const PADDING = 10; //pixels

const InfoDrawer = props => {
  const { content } = props;
  return (
    <Drawer
      open={content ? true : false}
      direction={"bottom"}
      allowClose={true}
      modalElementClass={modalStyle}
      containerElementClass={containerStyle}
    >
      <ContentContainer>{content}</ContentContainer>
    </Drawer>
  );
};

const containerStyle = css`
  height: 100vh;
  width: 100vw;
  border-radius: 0;
  padding: 0px;
  background-color: rgba(0, 0, 0, 0) !important;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const modalStyle = css`
  float: bottom;
  background-color: red;
  height: 70vh;
  width: calc(100vw - ${2 * PADDING}px);
  border-radius: 10px;
  margin-bottom: -${5 * PADDING}px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ContentContainer = styled.div`
  background-color: lime;
  margin-top: ${PADDING}px;
  width: calc(100% - ${2 * PADDING}px);
  height: calc(100% - ${2 * PADDING}px - ${5 * PADDING}px);
`;

// const MainContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   background-color: #4884ee;
//   background-image: linear-gradient(315deg, #4884ee 0%, #06bcfb 74%);
// `;

// const Text = styled.span`
//   color: white;
//   font-size: 16pt;
//   margin-bottom: 20px;
//   font-weight: bold;
// `;

export default InfoDrawer;
