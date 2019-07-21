import React from "react";
import { Box, withStyles, Fab } from "@material-ui/core";

// This provides the buttons with some terrible 80's colors
const CommandButton = withStyles({
  root: {
    backgroundColor: "darkorange",
    color: "black",
    fontSize: "1.5rem",
    border: "6px solid firebrick",
    "&:hover": {
      backgroundColor: "#cc6c00",
      borderColor: "darkred"
    }
  }
})(Fab);

function Commands(props) {
  return (
    <Box>
    <Box
      width="100%"
      height="10vh"
      border={2}
      borderColor="#7b68ee"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      p="10px"
    >
      <CommandButton onClick={val => props.directionMove(val)} name="n">
        N
      </CommandButton>
      <CommandButton onClick={props.directionMove} name="s">
        S
      </CommandButton>
      <CommandButton onClick={props.directionMove} name="e">
        E
      </CommandButton>
      <CommandButton onClick={props.directionMove} name="w">
        W
      </CommandButton>
    </Box>
      {/* this ternary displays a directional error message  */}
      {props.error_msg === "" ? null : <div> {props.error_msg} </div>}
    </Box>
  );
}

export default Commands;
