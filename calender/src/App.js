import React  from 'react';
import { Component } from 'react';

import styled from "styled-components";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

import CalBody from './CalBody.js';
import Todo from "./Todo.js";

import {connect} from 'react-redux';
import {loadTodo, createTodo} from './redux/modules/todo';

//스토어가 가진 상태값을 props로 받아오기 위한 함수
const mapStateTopProps = (state) => ({
  todo_list:state.todo.list,
});

//값을 변화시키기 위한 액션생성함수를 props로 받아오기 위한 함수
const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(loadTodo());
  },
  create: (new_todo) => {
    dispatch(createTodo(new_todo));
  }
});


class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){

  };

  render() {
    return (
      <Container>
        <Main>
          <Switch>
            <Route 
            path="/"
            exact
            render={(props) => <CalBody history={this.props.history}/>}
            />
            <Route path="/todo" component={Todo} />
          </Switch>
        </Main>
      </Container>
    );
  }
}

export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(App));

const Container = styled.div`
  background: #fcfcfc;
`;

const Main = styled.div`
  color:#280101;
  background: #fcfcfc;
`;