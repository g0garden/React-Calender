import React  from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import styled from "styled-components";
//props.history 가져오려면 withRouter
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

import CalBody from './CalBody';
import Todo from "./Todo";


//import CalHeader from './CalHeader';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  componentDidMount() {
    
  }



  render() {
    return (
        <Main className="Container">
          <div className="Calender">
          <Switch>
            <Route 
            path="/"
            exact
            render={(props) => <CalBody history={this.props.history}/>}
            />
            <Route path="/detail" component={Todo} />
          </Switch>
          </div>
        </Main>
    );
  }
}

export default withRouter(App);

const Main = styled.div`
  background: #d9d9d9;
`;