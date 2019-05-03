import React, { Component, Fragment } from "react";
import NavBar from "./components/layouts/NavBar";
import Table from "./components/layouts/Table";
import {getUrl} from "./components/ApiUrl";

class App extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.state = {
      rows: null,
      tempPerson: null,
      loggedIn: false
    };
  }


  loggedIn = () => {
    this.setState({
      loggedIn: true
    });
    this.getRowsFromBackEnd();
  }

  getRowsFromBackEnd() {
    if (sessionStorage.getItem("token")!=null){
      const headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
      const options ={
        method: 'GET',
        headers,
      };

      const request = new Request(getUrl()+'/employee/employees',options);
      fetch(request)
        .then(response => response.json()
          .then(data=>{
            if (response.status === 401) {
              sessionStorage.clear();
              this.setState({loggedIn: false, rows: null});
              console.log("Invalid token!");
            } else if (data.length === 0) {
              this.setState({rows: null});
            } else {
              this.setState({rows: data});
            }
          }));
    }else {
      this.setState({loggedIn:false, rows:null});
    }
  }


  onDelete(id){
    if (sessionStorage.getItem("token")!=null){
      const headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
      const options ={
        method: 'DELETE',
        headers,
      };

      const request = new Request(getUrl()+'/employee/delete/' + id,options);
      fetch(request)
        .then(response => response.json()
          .then(data=>{
            if (data.message === "SUCCESS!") {
              this.getRowsFromBackEnd();
            } else {
              this.setState({loggedIn:false, rows:null});
            }
            console.log(data.message);
          }));
    }else {
      this.setState({loggedIn:false, rows:null});
    }
  }

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
        <NavBar handleLoggedIn={this.loggedIn} isLoggedIn={this.state.loggedIn} addToNavBar={this.addToList} />
        <Table rows={rows} onDelete={this.onDelete} handleEdit={this.handleEdit}/>
      </Fragment>
    );
  }
}

export default App;
