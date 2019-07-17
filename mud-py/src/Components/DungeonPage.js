import React from 'react';
import axios from 'axios';
import ChatBox from './ChatBox';
import Dungeon from './Dungeon';
import Commands from './Commands';
import RoomInfo from './RoomInfo';
import { Container } from '@material-ui/core';

class DungeonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true
    };
  }

  componentDidUpdate() {
    if (this.state.refresh) {
      axios
        .get(
          'https://lambda-mud-test.herokuapp.com/api/adv/init/',
          this.props.content
        )
        .then(data => {
          this.setState({ currentRoom: data.data, refresh: false });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  directionMove = e => {
    const direction = e.target.name;
    console.log(this.props.content);
    axios
      .post(
        'https://lambda-mud-test.herokuapp.com/api/adv/move/',
        { direction: direction },
        this.props.content
      )
      .then(data => {
        console.log(data.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    return (
      <Container style={{ color: 'white' }}>
        <Dungeon />
        <Commands directionMove={this.directionMove} />
        <ChatBox />
        <RoomInfo currentRoom={this.state.currentRoom} />
      </Container>
    );
  }
}

export default DungeonPage;
