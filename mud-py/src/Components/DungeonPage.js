import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import ChatBox from './ChatBox';
import Dungeon from './Dungeon';
import Commands from './Commands';
import RoomInfo from './RoomInfo';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { mudAddress } from '../address';

const styles = theme => ({
  root: {
    display: 'flex',
    fontFamily: 'Chakra Petch'
  },
  title: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  dungeonHeight: {
    height: 720
  }
});

class DungeonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true
    };
  }

  getRoomInfo = () => {
    axios
      .get(mudAddress + 'adv/init/', this.props.content)
      .then(data => {
        this.setState({ currentRoom: data.data, refresh: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  directionMove = e => {
    const direction = e.target.name;
    console.log(this.props.content);
    axios
      .post(mudAddress + 'adv/move/', this.props.content, {
        direction: direction
      })
      .then(data => {
        console.log(data.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Dungeon */}
            <Grid item xs={12} md={12} lg={12}>
              <Box
                className={classes.dungeonHeight}
                border={4}
                borderColor="#0136be"
                borderRadius="5px"
                backgroundColor="black"
                color="white"
              >
                <Dungeon />
              </Box>
            </Grid>
            {/* Room Information */}
            <Grid item xs={12} md={4} lg={4}>
              <Box
                className={fixedHeightPaper}
                border={4}
                borderColor="#0136be"
                borderRadius="5px"
                backgroundColor="black"
                color="white"
              >
                <RoomInfo
                  currentRoom={this.state.currentRoom}
                  getRoomInfo={this.getRoomInfo}
                />
              </Box>
            </Grid>
            {/* Game Commands */}
            <Grid item xs={12} md={4} lg={4}>
              <Box
                className={fixedHeightPaper}
                border={4}
                borderColor="#0136be"
                borderRadius="5px"
                backgroundColor="black"
                color="white"
              >
                <Commands directionMove={this.directionMove} />
              </Box>
            </Grid>
            {/* Chat Box */}
            <Grid item xs={12} md={4} lg={4}>
              <Box
                className={fixedHeightPaper}
                border={4}
                borderColor="#0136be"
                borderRadius="5px"
                backgroundColor="black"
                color="white"
              >
                <ChatBox />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

export default withStyles(styles)(DungeonPage);
