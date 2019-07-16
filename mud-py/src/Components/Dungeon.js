import React, { Component } from "react";
import { FlexibleXYPlot, LineSeries, MarkSeries } from "react-vis";
import room_data from "../data/room_data.js";
import styled from "styled-components";

const StyledMap = styled.div`
  margin: auto;
  width: 75%;
  height: 100%;
  flex: 1;
  padding: 3rem 4rem 2rem 3rem;
  position: relative;
`;

class Map extends Component {
  render() {
    const coordinates = [];
    const links = [];
    for (let room in room_data) {
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
            strokeWidth={3}
            opacity="1"
            size="3"
            color="FF0"
            data={coordinates}
            style={{ cursor: "pointer" }}
            // onValueMouseOver={point => {
            //   for (let key in graph) {
            //     if (graph[key][0].x == point.x && graph[key][0].y) {
            //       this.setState({ value: key });
            //     }
            //   }
            // }}
            // onValueMouseOut={() => {
            //   this.setState({ value: null });
            // }}
          />
        </FlexibleXYPlot>
      </StyledMap>
    );
  }
}

export default Map;
