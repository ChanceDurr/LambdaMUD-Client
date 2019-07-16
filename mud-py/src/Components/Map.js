import React, { Component } from "react";
import { FlexibleXYPlot, LineSeries, MarkSeries } from "react-vis";
import styled from "styled-components";

class Map extends Component {
  state = { value: null };

  render() {
    const { value } = this.state;
    const { coordinates, graph } = this.props;

    return (
      <FlexibleXYPlot>
        <MarkSeries
          strokeWidth={3}
          opacity="1"
          size="5"
          color="FF0"
          data={coordinates}
          style={{ cursor: "pointer" }}
          onValueMouseOver={point => {
            for (let key in graph) {
              if (graph[key][0].x == point.x && graph[key][0].y) {
                this.setState({ value: key });
              }
            }
          }}
          onValueMouseOut={() => {
            this.setState({ value: null });
          }}
        />
      </FlexibleXYPlot>
    );
  }
}

export default Map;
