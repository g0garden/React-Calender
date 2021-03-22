import React, { Component } from 'react';
import CalForm from "./CalForm";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="Container">
        <div className="Calender">
          <CalForm/>
        </div> 
        <div className="Upcoming">
          Upcoming projects
        </div>
      </div>
    );
  }
}

export default App;