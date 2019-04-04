import React, { Component, Fragment } from "react";
import NavBar from "./components/layouts/NavBar";
import Table from "./components/layouts/Table";
import Row from "./components/layouts/Row";

class App extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      rows: new Map()
    };
  }

  onDelete = id => {
    let rows = this.state.rows;
    rows.delete(id);
    console.log(rows);
    this.setState({
      rows: rows
    });
  };

  handleEdit = (id, car) =>
    this.setState({
      rows: this.state.rows.filter(row => row.key !== id)
    });

  addToList = personInfo => {
    const rowsLenght = this.state.rows.size;
    const row = (
      <Row
        id={rowsLenght}
        personInfo={personInfo}
        onDelete={this.onDelete}
        handleEdit={this.handleEdit}
      />
    );

    this.setState({ rows: this.state.rows.set(rowsLenght, row) });
  };

  get() {
    const rowsLenght = this.state.rows.size;
    const { rows } = [];
    console.log(this.state.rows);
    for (const k of this.state.rows) {
      rows.concat(k);
    }
  }

  render() {
    this.get();
    console.log(this.rows);

    // console.log(this.state.rows.get(0));

    return (
      <Fragment>
        <NavBar addToNavBar={this.addToList} />
        <Table rows={this.state.rows.get(0)} />
      </Fragment>
    );
  }
}

export default App;
