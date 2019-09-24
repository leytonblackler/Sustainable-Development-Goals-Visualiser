import React from "react";
import styled from "styled-components";
import Drawer from "react-drag-drawer";
import { css } from "emotion";

const PADDING = 10; //pixels

const InfoDrawer = props => {
  const { content, onClose } = props;
  return (
    <Drawer
      open={content ? true : false}
      onRequestClose={onClose}
      direction="bottom"
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
  background-color: rgba(0, 0, 0, 0) !important;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const modalStyle = css`
  float: bottom;
  height: 100%;
  width: calc(100vw - ${2 * PADDING}px);
  border-radius: 10px;
  margin-bottom: calc(-${PADDING}px - 20vh);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const ContentContainer = styled.div`
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
