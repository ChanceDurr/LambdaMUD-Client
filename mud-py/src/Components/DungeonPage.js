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
    height: 720
  }
});

class DungeonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      currentRoom: 0,
      messageFeed: [],
      player: ""
    };
  }

  handleMessageInput = e => {
    e.persist();
    if (e.target.value) {
      this.setState({ message: e.target.value });
    }
    if (e.key && e.key === "Enter") {
      this.say();
    }
  };

  say = () => {
    const { message, currentRoom, messageFeed, player } = this.state;

    axios
      .post(
        mudAddress + "adv/say/",
        { message, room: currentRoom.id.toString() },
        this.props.content
      )
      .then(data => {
        messageFeed.push({ message, player });
        this.setState({ message: "", messageFeed });
        // And some kind of alert?
      })
      .catch(err => {
        console.log(err);
      });
  };

  getRoomInfo = () => {
    const { messageFeed } = this.state;

    axios
      .get(mudAddress + "adv/init/", this.props.content)
      .then(data => {
        console.log(data.data);
        this.setState({
          currentRoom: data.data,
          player: data.data.name
        });

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
        this.getRoomInfo()
        console.log(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    const { currentRoom, messageFeed, message } = this.state;
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
                  currentRoom={currentRoom}
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
                <ChatBox
                  handleMessageInput={this.handleMessageInput}
                  message={message}
                  messageFeed={messageFeed}
                  onSpeak={this.say}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

export default withStyles(styles)(DungeonPage);
