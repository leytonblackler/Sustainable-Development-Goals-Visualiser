import React, { Component } from "react";
import styled from "styled-components";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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

const renderInfoCard = (infoItem, index) => {
  const { title, steps } = infoItem;
  return (
    <Card key={infoItem.title}>
      <Card.Header>
        <Accordion.Toggle as={Toggle} eventKey={index}>
          {title}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={index}>
        <List>{steps.map(step => renderStep(step))}</List>
      </Accordion.Collapse>
    </Card>
  );
};

const renderStep = step => {
  return <li key={step}>{step}</li>;
};

export const HelpContent = () => {
  return (
    <MainContainer>
      <StyledAccordion>
        {INFO_ITEMS.map((infoItem, index) => renderInfoCard(infoItem, index))}
      </StyledAccordion>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledAccordion = styled(Accordion)`
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
`;

const Toggle = styled.div``;

const List = styled.ol`
  margin-top: ${PADDING}px;
  margin-bottom: ${PADDING}px;
`;
