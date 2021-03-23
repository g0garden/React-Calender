import React from "react"; 
import styled from 'styled-components';
import {useSelector, useDispatch} from "react-redux";
import { createTodo } from './redux/modules/todo';


const Todo = (props) => { 

    const dispatch = useDispatch();
    const choiceDate = React.useRef(null);
    const time = React.useRef(0);
    const todo = React.useRef(null);

    //const basicTodoList = useSelector((state) => state.todo.todos);
    
    return (
    
    <Container>
        <h3>Tell me what To-do</h3>
        <p>일정 추가하기</p>
        <Time>
            <span>일시 </span>
            <input type="date" id="todoDate" ref={choiceDate}/>
            <select ref={time}>
                <option value="0">오전 12:00</option>
                <option value="1">오전 01:00</option>
                <option value="2">오전 02:00</option>
                <option value="3">오전 03:00</option>
                <option value="4">오전 04:00</option>
                <option value="5">오전 05:00</option>
                <option value="6">오전 06:00</option>
                <option value="7">오전 07:00</option>
                <option value="8">오전 08:00</option>
                <option value="9">오전 09:00</option>
                <option value="10">오전 10:00</option>
                <option value="11">오전 11:00</option>
                <option value="12">오후 12:00</option>
                <option value="13">오후 01:00</option>
                <option value="14">오후 02:00</option>
                <option value="15">오후 03:00</option>
                <option value="16">오후 04:00</option>
                <option value="17">오후 05:00</option>
                <option value="18">오후 06:00</option>
                <option value="19">오후 07:00</option>
                <option value="20">오후 08:00</option>
                <option value="21">오후 09:00</option>
                <option value="22">오후 10:00</option>
                <option value="23">오후 11:00</option>
            </select>
        </Time>
        <TodoBox>
            <span>할일</span>
            <input type="text" ref={todo} placeholder="일정을 입력하세요"/>
        </TodoBox>
        <BtnBox>
            <button onClick={() => {
              //각 칸을 비교하면 어떨까?
              if(choiceDate.current.value === '' || todo.current.value === ''){
                alert('빈칸을 채워주세요!')
                return false
              }

              const new_date = choiceDate.current.value.split('-')
              let new_todo = {
                id: 0,
                year: new_date[0],
                month: new_date[1],
                day: new_date[2],
                time: Number(time.current.value),
                text: todo.current.value,
                done: false
              };
              dispatch(createTodo(new_todo));
              props.history.push('/');
            }} title="등록하기">Register</button>
            <button className="cancel" title="등록취소" onClick={() => {
              props.history.push('/');
            }}>Cancel</button>
        </BtnBox>
    </Container>
    ); 
} 
export default Todo;

const Container = styled.div`
  
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top:10px;
  & h3{
     font-family: "YESGothic-Bold";
     font-size:24px;
    @media (max-width:767px) {
    
    font-size:20px;
    
    }
  }
  & p{
    margin-top:-10px;
    font-size:16px;
    & span{
      background-color: #FCEB9D80;
      border-radius: 10px;
      padding: 3px;
    }
     @media (max-width:767px) {
    
    font-size:14px;
    
    }
  }
`

const Time = styled.div`
    width:80%;
    padding: 30px 0 25px 0;
  & span {
    font-size:18px;
    margin-right: 20px;
    font-family: "YESGothic-Bold";
    @media (max-width:767px) {
    
    position: relative;
    left:3px;
    
    }
  }
  & input{
    width:30%;
    padding: 1px;
  
  }
  & select{
    width:15%;
    padding: 3px 0;
    margin-left: 10px;
  }
  
  & input,select{
    border:1px solid #A8A8A8;
    outline: none;
    border-radius: 3px;
  }
  @media (max-width:767px) {
    
    & input{
      width:45%;
    }
    & select{
      width:20%;
    }
    
  }
`

const TodoBox = styled.div`
  
  width:80%;
  margin-top:-5px;
  
  & span{
    font-size:18px;
    margin-right: 23px;
    font-family: "YESGothic-Bold";
  }
  & input{
    width:46%;
    position: relative;
    left:1px;
    border:1px solid #A8A8A8;
    outline: none;
    border-radius: 3px;
    padding: 3px;
  }
  @media (max-width:767px) {
    
     & input{
       width:68%;
     }
     & span{
       position: relative;
       left:3px;
     } 
  }
`
const BtnBox = styled.div`
  
  width:80%;
  padding: 50px 0 50px 0 ;
  display: flex;
  justify-content: center;
  gap:8px;
  & button{
    
    outline: none;
    padding:3px 26px;
    background-color: #1e1e1d;
    color:white;
    border:1px solid #1e1e1d;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color .3s;
    &:hover{
      background-color: #48B7DA;
      border:1px solid #48B7DA;
    }
    &.cancel:hover{
      background-color: #B8B8B8;
      border:1px solid #B8B8B8;
    
    }
  }
  @media (max-width:767px) {
     
    flex-direction: column;
    width:84%;
    height: 55px;
    
    & button{
      padding:8px 26px;
      
    }
  }
  
`