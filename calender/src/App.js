import React  from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import styled from "styled-components";

import CalBody from './CalBody';
import CalHeader from './CalHeader';

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
            <CalBody/>
          </div>
          <div className="Upcoming">
            {/* <Upcoming/> */}
          </div>
        </div>
    );
  }
}




export default App;