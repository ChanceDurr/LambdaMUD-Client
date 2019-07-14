import React, { Component } from "react";
import { FlexibleXYPlot, LineSeries, MarkSeries } from "react-vis";
import styled from "styled-components";

export default class Map extends Component {
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
          onValueClick={point => {}}
          onValueMouseOver={point => {}}
          onValueMouseOut={() => {}}
        />
      </FlexibleXYPlot>
    );
  }
}
