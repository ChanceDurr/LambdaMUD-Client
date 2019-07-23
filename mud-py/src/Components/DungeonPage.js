import React from "react";
import axios from "axios";
import clsx from "clsx";
import ChatBox from "./ChatBox";
import Dungeon from "./Dungeon";
import Commands from "./Commands";
import RoomInfo from "./RoomInfo";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { mudAddress } from "../address";
import Pusher from "pusher-js";

const socket = new Pusher("836565419bb3c5e47b4b", {
  cluster: "us3"
});

const styles = theme => ({
  root: {
    display: "flex",
    fontFamily: "Chakra Petch"
  },
  title: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  dungeonHeight: {
    height: "80vh"
  }
});

class DungeonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      currentRoom: { id: 0 },
      messageFeed: [],
      player: "",
      error_msg: ""
    };
  }

  say = message => {
    const { currentRoom, messageFeed, player } = this.state;

    return axios
      .post(
        mudAddress + "adv/say/",
        { message, room: currentRoom.id.toString() },
        this.props.content
      )
      .then(data => {
        messageFeed.push({ message, player });
        return true;
      })
      .catch(err => {
        throw err;
      });
  };

  // updates room info on load or direction change, and broadcasts players arrival if there are others in the room
  getRoomInfo = () => {
    const { messageFeed } = this.state;

    // call to get the info for the room
    axios
      .get(mudAddress + "adv/init/", this.props.content)
      .then(data => {
        this.setState({
          currentRoom: data.data,
          player: data.data.name,
          messageFeed: []
        });

        // broadcasts arrival if others are around
        if (data.data.players && data.data.players.length) {
          this.setState({ message: `${data.data.name} has arrived!` });
          this.say();
        }

        // binds the player to the current room's chat channel
        const channel = socket.subscribe(data.data.id.toString());
        channel.bind("say", message => {
          if (message.player !== this.state.player) {
            messageFeed.push(message);
            this.setState({ messageFeed });
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // moves the player to a new room when a direction command is given
  directionMove = e => {
    const direction = e.currentTarget.name;

    axios
      .post(
        mudAddress + "adv/move/",
        {
          direction
        },
        this.props.content
      )
      .then(data => {
        // if there is an error message from a direction command, state reflects that
        const error_msg = data.data.error_msg;
        if (error_msg === "") {
          socket.unsubscribe(this.state.currentRoom.id.toString());

          this.getRoomInfo();
        }
        this.setState({ error_msg });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    const { currentRoom, messageFeed } = this.state;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid direction="row" container spacing={3}>
            {/* Dungeon */}
            <Grid item xs={12} md={12} lg={8}>
              <Box
                className={classes.dungeonHeight}
                border={4}
                borderColor="#0136be"
                borderRadius="5px"
                color="white"
              >
                <Dungeon currentRoom={currentRoom.id.toString()} />
              </Box>
            </Grid>
            <Grid container item lg spacing={3}>
              {/* Room Information */}
              <Grid item xs={12} md={4} lg={10}>
                <Box
                  className={fixedHeightPaper}
                  border={4}
                  borderColor="#0136be"
                  borderRadius="5px"
                  color="white"
                >
                  <RoomInfo
                    currentRoom={currentRoom}
                    getRoomInfo={this.getRoomInfo}
                  />
                </Box>
              </Grid>
              {/* Game Commands */}
              <Grid item xs={12} md={4} lg={10}>
                <Box
                  className={fixedHeightPaper}
                  border={4}
                  borderColor="#0136be"
                  borderRadius="5px"
                  color="white"
                >
                  <Commands
                    directionMove={this.directionMove}
                    error_msg={this.state.error_msg}
                  />
                </Box>
              </Grid>
              {/* Chat Box */}
              <Grid item xs={12} md={4} lg={10}>
                <Box
                  className={fixedHeightPaper}
                  border={4}
                  borderColor="#0136be"
                  borderRadius="5px"
                  color="white"
                >
                  <ChatBox
                    handleMessageInput={this.handleMessageInput}
                    messageFeed={messageFeed}
                    onSpeak={this.say}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

export default withStyles(styles)(DungeonPage);
