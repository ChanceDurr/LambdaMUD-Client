import React, { Component } from "react";
import data from "../data/data.json";
import Map from "./Map";

class Main extends Component {
  state = {
    coordinates: { x: 50, y: 60 },
    graph: {},
    mapCoordinates: [],
    room_id: null
  };

  componentDidMount() {
    if (!localStorage.hasOwnProperty("graph")) {
      localStorage.setItem("graph", JSON.stringify(data));
    }

    let value = JSON.parse(localStorage.getItem("graph"));

    this.setState({ graph: value });

    this.init();
  }

  mapCoords = () => {
    const { graph, room_id } = this.state;
    const setCoordinates = [];
  };

  render() {
    const { graph } = this.state;
    return (
      <div>
        <Map graph={graph} />
      </div>
    );
  }
}

export default Main;
