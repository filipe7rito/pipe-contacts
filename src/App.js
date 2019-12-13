import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/core/navbar";
import Persons from "./components/core/persons";

class App extends Component {
  render() {
    const Footer = () => <footer className="footer" />;

    return (
      <React.Fragment>
        <div className="wrapper">
          <NavBar />
          <div className="content">
            <main className="container">
              <Persons />
            </main>
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
