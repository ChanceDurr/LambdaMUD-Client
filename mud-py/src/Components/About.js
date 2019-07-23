import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  about: {
    padding: theme.spacing(8, 0),
    height: "100vh"
  },
  text: {
    fontFamily: "Chakra Petch"
  },
  aboutPara: {
    fontFamily: "Chakra Petch",
    paddingBottom: "24px"
  }
}));

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.about}>
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h2"
              align="center"
              color="secondary"
              gutterBottom
              className={classes.text}
            >
              About
            </Typography>
            <Typography
              variant="h5"
              align="left"
              color="secondary"
              paragraph
              gutterBottom
              className={classes.aboutPara}
            >
              Py-man was created during{" "}
              <a href="https://lambdaschool.com/">Lambda School's</a>{" "}
              <a href="https://github.com/LambdaSchool/CS-Build-Week-1">
                Build Week
              </a>{" "}
              with a team of four developers. The frontend was built using React
              and Material UI. The backend was built using Python and Django.{" "}
              <a href="https://pusher.com/">Pusher</a> was used on both to allow
              for realtime communication between players.
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              align="left"
              color="secondary"
              className={classes.text}
            >
              Kyle Baker
            </Typography>
            <Typography
              variant="h5"
              align="left"
              color="secondary"
              className={classes.text}
            >
              <ul>
                <li>
                  <a href="https://github.com/kybak">Github</a>
                </li>
              </ul>
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              align="left"
              color="secondary"
              className={classes.text}
            >
              Michael Littleton
            </Typography>
            <Typography
              variant="h5"
              align="left"
              color="secondary"
              className={classes.text}
            >
              <ul>
                <li>
                  <a href="https://github.com/mglittleton">Github</a>
                </li>
                <li>
                  <a href="https://michaelglittleton.com/">Portfolio</a>
                </li>
              </ul>
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              align="left"
              color="secondary"
              className={classes.text}
            >
              Colin Dismuke
            </Typography>
            <Typography
              variant="h5"
              align="left"
              color="secondary"
              className={classes.text}
            >
              <ul>
                <li>
                  <a href="https://github.com/cpdis">Github</a>
                </li>
                <li>
                  <a href="https://cpd.dev">Portfolio</a>
                </li>
              </ul>
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              align="left"
              color="secondary"
              className={classes.text}
            >
              Jordan Spell
            </Typography>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
