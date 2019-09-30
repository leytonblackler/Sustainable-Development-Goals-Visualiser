import React from "react";
import styled from "styled-components";
import Drawer from "react-drag-drawer";
import { css } from "emotion";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      <ExpandMoreIconContainer>
        <ExpandMoreIcon fontSize="large" />
      </ExpandMoreIconContainer>
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
  overflow: hidden;
`;

const modalStyle = css`
  float: bottom;
  height: 90%;
  width: calc(100vw - ${2 * PADDING}px);
  border-radius: 10px;
  margin-bottom: calc(-${PADDING}px - 10%);
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
  overflow: hidden;
`;

const ExpandMoreIconContainer = styled.div`
  color: grey
`;


export default InfoDrawer;
