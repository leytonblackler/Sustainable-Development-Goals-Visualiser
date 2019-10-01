import React, { Component } from "react";
import styled from "styled-components";

const PADDING = 10; //pixels

const INFO_ITEMS = [
  {
    title: "Zoom in to view a single country",
    steps: [
      "Shake to activate voice.",
      'Say "focus" when prompted for a command.',
      "Say the name of the country when prompted."
    ]
  },
  {
    title: "Get info about a single country",
    steps: [
      "Shake to activate voice.",
      'Say "info" when prompted for a command.',
      "Say the name of the country when prompted."
    ]
  },
  {
    title: "Compare info for two countries",
    steps: [
      "Shake to activate voice.",
      'Say "compare" when prompted for a command.',
      "Say the name of the first country when prompted.",
      "Say the name of the second country when prompted."
    ]
  },
  {
    title: "Cancel a voice command",
    steps: ['When voice is active, say "cancel" at any time.']
  },
  {
    title: "Change information category",
    steps: [
      "Long press in the middle of the screen.",
      "When the wheel appears, drag and release on a category to select it."
    ]
  }
];

export const HelpContent = () => {
  return (
    <MainContainer>
      <MainTitle>How to Interact</MainTitle>
      <InfoItems>
        {INFO_ITEMS.map(item => (
          <SubContainer key={item.title}>
            <SubTitle>{item.title}</SubTitle>
            <InfoContent>
              <ul>
                {item.steps.map(step => (
                  <ListItem key={item.title + step}>{step}</ListItem>
                ))}
              </ul>
            </InfoContent>
          </SubContainer>
        ))}
      </InfoItems>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: calc(100% - ${PADDING * 4}px);
  background-color: magenta;
  overflow: hidden;
`;

const InfoItems = styled.div`
  width: calc(100% - ${PADDING * 4}px);
  overflow: hidden;
  background-color: lime;
`;

const MainTitle = styled.div`
  margin-top: ${PADDING * 2}px;
  margin-bottom: ${PADDING * 2}px;
  font-size: 18pt;
  font-weight: bold;
  color: #37474f;
`;

const SubTitle = styled.div`
  font-size: 14pt;
  font-weight: bold;
  color: #37474f;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
  color: #455a64;
`;

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InfoContent = styled.div`
  width: 100%;
`;
