import React from "react"; 
import styled from 'styled-components';
import ListView from './ListView'
import { useDispatch, useSelector } from 'react-redux';


const Dates = (props) => { 
    let day = props.day;
    let notThisMonth = props.notThisMonth;
    let today = props.today;
    let date = props.date.split('.');
    let todoList = useSelector(state => state.todo.todos);

    let year = date[0];
    let month = date[1];
    let date_ = date[2];
    
    //이 날의 todolist
    const todayTodos = todoList.filter((todo) => {
        return todo.year === year && todo.month === month && todo.day ===date_})
    
    let arrListView;
    if(todayTodos) {
        //개수 오류 안나게 length 체크해서 시간순 sort
        if(todayTodos.length > 1) {
            todayTodos.sort(function (a,b){
                return a.time - b.time
            });
        }
        arrListView = todayTodos.map((todo, index) => {
            return <ListView todayTodos={todo} key={index}/>
        });
    }

    if (notThisMonth) {
        return (<Day>
            <Yoil style={{ color: '#CFCFCF' }}>{day}</Yoil>
        </Day>);
    } else if (today === 'yes') {
        return (<Day>
            <Yoil style={{
                color: 'white',
                backgroundColor: '#E3302E',
                borderRadius: '100%',
            }}>{day}</Yoil>
            {/* for문 돌면서 만들어줘 <ListView /> */}
            {arrListView}
        </Day>);
    } else {
        return (<Day>
            <Yoil >{day}</Yoil>
            {arrListView}
        </Day>);
}

    }
        
export default Dates;

const Day = styled.div`
    text-align:left;
    width:30%;
    min-height: 90px;
    
    
`
const Yoil = styled.span`
    margin:5px;
    font-size: 11px;
    padding:3px;
    position: relative;
    top:5px;
    font-family: "YESGothic-Bold";
`