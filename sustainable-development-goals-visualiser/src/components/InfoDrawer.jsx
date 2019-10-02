import React, { Component } from "react";
import styled from "styled-components";
import Drawer from "react-drag-drawer";
import { css } from "emotion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const PADDING = 10; //pixels

class InfoDrawer extends Component {
  state = {
    closing: false
  };

  onRequestClose = () => {
    this.setState({ closing: true });
    const { onClose } = this.props;
    setTimeout(() => {
      onClose();
      this.setState({ closing: false });
    }, 150);
  };

  render() {
    const { data } = this.props;
    const { closing } = this.state;
    return (
      <Drawer
        open={data && !closing ? true : false}
        onRequestClose={this.onRequestClose}
        direction="bottom"
        modalElementClass={modalStyle}
        containerElementClass={containerStyle}
      >
        <ExpandMoreIconContainer>
          <ExpandMoreIcon fontSize="large" />
        </ExpandMoreIconContainer>
        <Title>{data ? data.title : null}</Title>
        <ContentContainer>{data ? data.content : null}</ContentContainer>
      </Drawer>
    );
  }
}

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
  height: 90vh;
  width: calc(100vw - ${2 * PADDING}px);
  border-radius: 10px;
  margin-bottom: calc(-${5 * PADDING}px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  opacity: 0.95;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const ContentContainer = styled.div`
  margin-bottom: ${PADDING}px;
  width: calc(100% - ${2 * PADDING}px);
  height: calc(90vh - calc(${7 * PADDING}px + 30px + 50px));
  overflow: hidden;
  color: #37474f;
`;

const ExpandMoreIconContainer = styled.div`
  height: ${3 * PADDING}px;
  color: #37474f;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  min-height: 50px;
  max-height: 50px;
  font-size: 16pt;
  font-weight: bold;
  color: #37474f;
  text-align: center;
  margin-bottom: ${PADDING}px;
`;

export default InfoDrawer;
