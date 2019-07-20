import React from 'react';
import { Box, Button, withStyles, Fab } from '@material-ui/core';

const CommandButton = withStyles({
  root: {
    backgroundColor: 'darkorange',
    color: 'black',
    fontSize: '1.5rem',
    border: '6px solid firebrick',
    '&:hover': {
      backgroundColor: '#cc6c00',
      borderColor: 'darkred'
    }
  }
})(Fab);

function Commands(props) {
  return (
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
  );
}

export default Commands;
