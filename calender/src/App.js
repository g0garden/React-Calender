import React  from 'react';
import { Component } from 'react';

import styled from "styled-components";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

import CalBody from './CalBody.js';
import Todo from "./Todo.js";

import {firestore} from "./firebase";
import {connect} from 'react-redux';
import { loadTodoFB } from './redux/modules/todo';
import Spinner from './Spinner';
import NotFound from './NotFound';


const mapStateTopProps = (state) => ({
  is_loaded : state.todo.is_loaded
});

//값을 변화시키기 위한 액션생성함수를 props로 받아오기 위한 함수
const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(loadTodoFB());
  },

});




class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
    this.props.load();
  };

  render() {
    return (
      <div className="App">
        {!this.props.is_loaded ? (<Spinner />) : (
          <React.Fragment>
            <Container>
              <Main>
                <Switch>
                  <Route 
                  path="/"
                  exact
                  render={(props) => <CalBody history={this.props.history}/>}
                  />
                  <Route path="/todo" component={Todo} />
                  <Route component={NotFound}/>
                </Switch>
              </Main>
            </Container>
        </React.Fragment>
        )}
      </div>
    );
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(App));



const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #ffffff;
`;

const Main = styled.div`
  color:#280101;
  background: #ffffff;
`;

//#fcfcfc