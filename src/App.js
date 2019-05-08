import React, { Component, Fragment } from "react";
import NavBar from "./components/layouts/NavBar";
import Table from "./components/layouts/Table";
import { getUrl } from "./components/ApiUrl";

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
  };

  getRowsFromBackEnd() {
    if (sessionStorage.getItem("token") != null) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer " + sessionStorage.getItem("token")
      );
      const options = {
        method: "GET",
        headers
      };

      const request = new Request(getUrl() + "/employee/employees", options);
      fetch(request).then(response =>
        response.json().then(data => {
          if (response.status === 401) {
            sessionStorage.clear();
            this.setState({ loggedIn: false, rows: null });
            console.log("Invalid token!");
          } else if (data.length === 0) {
            this.setState({ rows: null });
          } else {
            this.setState({ rows: data });
          }
        })
      );
    } else {
      this.setState({ loggedIn: false, rows: null });
    }
  }

  onDelete(id) {
    if (sessionStorage.getItem("token") != null) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer " + sessionStorage.getItem("token")
      );
      const options = {
        method: "DELETE",
        headers
      };

      const request = new Request(getUrl() + "/employee/" + id, options);
      fetch(request).then(response =>
        response.json().then(data => {
          if (data.message === "SUCCESS!") {
            this.getRowsFromBackEnd();
          } else {
            this.setState({ loggedIn: false, rows: null });
          }
          console.log(data.message);
        })
      );
    } else {
      this.setState({ loggedIn: false, rows: null });
    }
  }

  handleEdit = personInfo => {
    if (sessionStorage.getItem("token") != null) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer " + sessionStorage.getItem("token")
      );
      const options = {
        method: "PUT",
        headers,
        body: JSON.stringify(personInfo)
      };

      const request = new Request(
        getUrl() + "/employee/updateEmp/" + personInfo.id,
        options
      );
      fetch(request).then(response =>
        response.json().then(data => {
          if (data.message === "SUCCESS!") {
            this.getRowsFromBackEnd();
          } else {
            this.setState({ loggedIn: false, rows: null });
          }
          console.log(data.message);
        })
      );
    } else {
      this.setState({ loggedIn: false, rows: null });
    }
  };

  addToList = personInfo => {
    if (sessionStorage.getItem("token") != null) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer " + sessionStorage.getItem("token")
      );
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(personInfo)
      };

      const request = new Request(
        getUrl() + "/employee/createEmployee/",
        options
      );
      fetch(request).then(response =>
        response.json().then(data => {
          if (data.message === "SUCCESS!") {
            this.getRowsFromBackEnd();
          } else {
            this.setState({ loggedIn: false, rows: null });
          }
          console.log(data.message);
        })
      );
    } else {
      this.setState({ loggedIn: false, rows: null });
    }
    console.log("[END] Add to list.");
  };

  render() {
    console.log("[START] Render");
    let rows = this.state.rows;
    if (rows !== null)
      console.log("[INFO] Rows are: " + this.state.rows.map(row => row.name));
    console.log("[END] Render");
    return (
      <Fragment>
        <NavBar
          handleLoggedIn={this.loggedIn}
          isLoggedIn={this.state.loggedIn}
          addToNavBar={this.addToList}
        />
        <Table
          rows={rows}
          onDelete={this.onDelete}
          handleEdit={this.handleEdit}
        />
      </Fragment>
    );
  }
}

export default App;
