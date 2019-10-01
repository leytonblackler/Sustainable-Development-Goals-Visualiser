import React, { Component } from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiHelp } from "@mdi/js";

export const HelpButton = props => (
  <MainContainer>
    <Button onClick={props.onClick}>
      <Icon path={mdiHelp} size={1.1} color="white" />
    </Button>
  </MainContainer>
);

const MainContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border-color: white;
  border-style: solid;
  border-width: 2px;
  cursor: pointer;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0);
  transform: scale(1);
  transition: 0.3s ease-out;

  &:active {
    background-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.4);
    transition: 0.3s ease-out;
  }
`;
