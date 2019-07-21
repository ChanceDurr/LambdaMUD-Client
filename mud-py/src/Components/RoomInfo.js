import React from 'react';
import { Box, Divider } from '@material-ui/core';

function RoomInfo(props) {
  // ensures current room data is displayed
  if (!props.currentRoom.name) {
    props.getRoomInfo();
  }
  const { title, description, items, players } = props.currentRoom
    ? props.currentRoom
    : '';

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <div>{title} </div>
      <div>{description}</div>

      {/* If there are items, displays them, else displays "empty" message */}
      <Box height="50%" display="flex" justifyContent="space-between">
        {items ? (
          <Box width="45%" textAlign="center">
            Items in the room:{' '}
            <Divider style={{ backgroundColor: '#fff' }} variant="middle" />
            {items.map((item, index) => {
              return <div key={index}>{item}</div>;
            })}
          </Box>
        ) : (
          <Box width="45%">You see no items here</Box>
        )}
        {/* If there are players, displays them, else displays "empty" message */}
        {players && players.length !== 0 ? (
          <Box width="45%" textAlign="center">
            Players who are in the room with you:{' '}
            <Divider style={{ backgroundColor: '#fff' }} variant="middle" />
            {players.map((player, index) => {
              return <div key={index}>{player}</div>;
            })}
          </Box>
        ) : (
          <Box width="45%">There are no players in sight</Box>
        )}
      </Box>
    </Box>
  );
}

export default RoomInfo;
