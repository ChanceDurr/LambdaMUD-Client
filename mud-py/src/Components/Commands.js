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
      <div>Please choose a direction.</div>
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
      <div style={{display:"flex", flexDirection:"column", alignItems: "center"}} >
        <div style={{margin: "auto"}}>North</div>
      <CommandButton onClick={val => props.directionMove(val)} name="n">
        N
      </CommandButton>
      </div>
      <div style={{display:"flex", flexDirection:"column", alignItems: "center"}} >
        <div style={{margin: "auto"}}>South</div>
      <CommandButton onClick={props.directionMove} name="s">
        S
      </CommandButton>
      </div>
      <div style={{display:"flex", flexDirection:"column", alignItems: "center"}} >
        <div style={{margin: "auto"}}>East</div>
      <CommandButton onClick={props.directionMove} name="e">
        E
      </CommandButton>
      </div>
      <div style={{display:"flex", flexDirection:"column", alignItems: "center"}} >
        <div style={{margin: "auto"}}>West</div>
      <CommandButton onClick={props.directionMove} name="w">
        W
      </CommandButton>
      </div>
    </Box>
      {/* this ternary displays a directional error message  */}
      {props.error_msg === "" ? null : <div> {props.error_msg} </div>}
    </Box>
  );
}

export default Commands;
