import React, { Component } from "react";
import { FlexibleXYPlot, LineSeries, MarkSeries } from "react-vis";
import room_data from "../data/room_data.js";
import styled from "styled-components";

const StyledMap = styled.div`
  margin: auto;
  width: 66%;
  height: 100%;
  flex: 1;
  padding: 3rem 3rem 3rem 3rem;
  position: relative;
`;

class Map extends Component {
  render() {
    // Create arrays to hold point coordinates and links
    const coordinates = [];
    const links = [];

    // Loop through each room in the room_data object
    for (let room in room_data) {
      // Set data equal to the first element (x, y coordinates)
      // in each room of the room_data object
      let data = room_data[room][0];
      coordinates.push(data);
      for (let adjacentRoom in room_data[room][1]) {
        links.push([
          room_data[room][0],
          room_data[room_data[room][1][adjacentRoom]][0]
        ]);
      }
    }

    return (
      <StyledMap>
        <FlexibleXYPlot width={600} height={600}>
          {links.map(link => (
            <LineSeries
              strokeWidth="2"
              color="#FF0"
              data={link}
              key={Math.random() * 100}
            />
          ))}
          <MarkSeries
            current={this.props.currentRoom}
            highlight="#1b00ff"
            strokeWidth={3}
            opacity="1"
            size="3"
            color="FF0"
            data={coordinates}
            style={{ cursor: "pointer" }}
          />
        </FlexibleXYPlot>
      </StyledMap>
    );
  }
}

export default Map;
