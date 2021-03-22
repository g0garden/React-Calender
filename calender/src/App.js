import React  from 'react';
import ReactDOM from 'react-dom';
import CalHeader from "./CalHeader";
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="Container">
        <div className="Calender">
          <CalHeader/>
        </div> 
        <div className="Upcoming">
          Upcoming projects
        </div>
      </div>
    );
  }
}

export default App;