import React, { Component } from "react";
import styled from "styled-components";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => props.height || "auto"};
  flex-grow: ${props => props.grow || "0"};
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => props.width || "auto"};
  justify-content: ${props =>
    props.justifyEnd
      ? `flex-end`
      : props.justifyBetween
      ? `space-between`
      : props.justifyAround
      ? `space-around`
      : props.justifyCenter
      ? `center`
      : `flex-start`};
  align-items: ${props =>
    props.alignEnd ? `flex-end` : props.alignCenter ? `center` : `flex-start`};

  margin-top: 5px;
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  margin-right: 5px;
`;

const Feed = styled(FlexColumn)`
  background: white;
  color: black;
  padding: 5px;
  overflow: auto;
  max-height: 163px;
`;

const Send = styled.button`
  min-height: 36px;
  height: 100%;
  background: lawngreen;
  color: #2e5d01;
  font-weight: bold;
`;

class ChatBox extends Component {
  state = {
    message: ""
  };

  handleMessageInput = e => {
    e.persist();
    const feed = document.getElementById("feed");

    if (e.target.value) {
      this.setState({ message: e.target.value }, () => {
        feed.scrollTop = feed.scrollHeight;
      });
    }
    if (e.key && e.key === "Enter") {
      this.props
        .onSpeak(this.state.message)
        .then(() => {
          this.setState({ message: "" });
          feed.scrollTop = feed.scrollHeight;
        })
        .catch(() => this.setState({ message: "" }));
    }
  };

  render() {
    const { messageFeed, onSpeak } = this.props;
    const { message } = this.state;

    return (
      <FlexColumn height="100%">
        <Feed id="feed" grow="1">
          <span style={{ marginBottom: "10px" }}>
            Welcome to MudPy! This is the beginning of your chat. As you move
            through the rooms you can speak to other players in the same room as
            you. Good muck and glob speed!
          </span>
          {messageFeed.map((feed, index) => (
            <span key={index}>
              {feed.player}: {feed.message}
            </span>
          ))}
        </Feed>

        <FlexRow width="100%" alignCenter>
          <TextArea
            value={message}
            onChange={this.handleMessageInput}
            onKeyUp={this.handleMessageInput}
          />

          <Send type="submit" onClick={onSpeak}>
            SEND
          </Send>
        </FlexRow>
      </FlexColumn>
    );
  }
}

export default ChatBox;
