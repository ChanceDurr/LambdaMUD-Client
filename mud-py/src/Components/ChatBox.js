import React from 'react';
import styled from 'styled-components';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

function ChatBox({ incomingMessage, onSpeak }) {
  return <FlexColumn>
    <FlexRow></FlexRow>
  </FlexColumn>;
}

export default ChatBox;

