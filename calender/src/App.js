import React  from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import styled from "styled-components";

import CalBody from './CalBody';
//import CalHeader from './CalHeader';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    return (
        <Main className="Container">
          <div className="Calender">
            <CalBody/>
          </div>
        </Main>
    );
  }
}

export default App;

const Main = styled.div`
  background: #d9d9d9;
`;