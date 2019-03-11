import React, { Component, Fragment } from "react";
import NavBar from "./components/layouts/NavBar";
import Table from "./components/layouts/Table";

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Table />
      </Fragment>
    );
  }
}

export default App;
