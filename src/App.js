import React, { Component, Fragment } from "react";
import NavBar from "./components/layouts/NavBar";
import Table from "./components/layouts/Table";

class App extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      rows: null,
      tempPerson: null,
    };
  }

  componentDidMount() {
    const personInfo = {
        name: "Sample Jozsef",
        availability: "",
        car: "",
        address: "Valami street 34.",
        construction: ""
    };
    const rows = [];
    rows.push(personInfo)
    this.setState({
      rows: rows
    })
  }


  onDelete(id){
    console.log("[START] On delete.");
    let rows = this.state.rows;
    console.log("This will be deleted: " + id + "and this is the name of it: " + rows[id].name);
    let leftOverRows = [];
      for (let index = 0; index < rows.length; index++) {
          if (index === id) {
              continue;
          } else {
              leftOverRows.push(rows[index]);
          }
      }
    console.log("[INFO] Rows are in the onDelete: " + leftOverRows.map(row => row.name));
    this.setState({
      rows: leftOverRows
    });
    console.log("[END] On delete.");
  };

  handleEdit = (index, personInfo) => {
      console.log("[START] Handel Edit");
      let rows = this.state.rows;
      let modifiedRows = [];
      console.log("[INFO] Modified personInfo's name: " + personInfo.name);
      console.log("[INFO] index is: " + index);
      for(let i = 0; i < rows.length; i++) {
          if (i !== index) {
              modifiedRows.push(rows[i]);
          } else {
              modifiedRows.push(personInfo);
          }
      }
      this.setState({rows: modifiedRows});

      console.log("[INFO] Name of saved row: " + this.state.rows[index].name);
      console.log("[END] Handle Edit");
  }


  addToList = personInfo => {
    console.log("[START] Add to list.");
    const rows = this.state.rows;
    const row = personInfo;
    rows.push(row);
    this.setState({ rows: rows});
    console.log("[END] Add to list.");
  };


  render() {
    console.log("[START] Render");
    let rows = this.state.rows;
    if (rows !== null) console.log("[INFO] Rows are: " + this.state.rows.map(row => row.name));
    console.log("[END] Render");
      return (
      <Fragment>
        <NavBar addToNavBar={this.addToList} />
        <Table rows={rows} onDelete={this.onDelete} handleEdit={this.handleEdit}/>
      </Fragment>
    );
  }
}

export default App;
