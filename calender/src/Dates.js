//각각날들을 캘린더에서 돌려서 Dates에 넣어줌 
//그랫 ㅓ달력에 날짜가 찍힘 
import React from "react"; 
import styled from 'styled-components';
import ListView from './ListView'
import { useDispatch, useSelector } from 'react-redux';



const Dates = (props) => { 
    // 리스트 받아오기 
    //달과 요일을 받아서 전체리스트 가져와서 listView에 같이 주기
    let day = props.day;
    let notThisMonth = props.notThisMonth;
    let today = props.today;
    let date = props.date.split('.');
    let todoList = useSelector(state => state.todo.todos); // 스토어에서 뽑아옴
    
    let year = date[0];
    let month = date[1];
    let date_ = date[2];
    
    //이 날의 todolist 스토어에서뽑아온 전체list중에서 아래 리턴 조건을 만족하는 일정만 달력에 보여지게 
    const todayTodos = todoList.filter((todo) => {
        return todo.year === year && todo.month === month && todo.day ===date_})
    
    let arrListView;
    if(todayTodos) {
        //개수 오류 안나게 length 체크해서 시간순 sort 인자가 1개인데 정렬하면 오류
        if(todayTodos.length > 1) {
            todayTodos.sort(function (a,b){
                return a.time - b.time || a.minute - b.minute// or 분단위까지 
            });
        }
        //날짜별 해당일정만 해당날짜에 출력되도록
        arrListView = todayTodos.map((todo, index) => {
            return <ListView todayTodos={todo} key={index}/>
        });
    }

    //뷰는 여기서 
    if (notThisMonth) {
        return (<Day>
            <Yoil style={{ color: '#afb0b6' }}>{day}</Yoil>
        </Day>);
    } else if (today === 'yes') {
        return (<Day>
            <Yoil style={{
                color: 'white',
                backgroundColor: '#E3302E',
                borderRadius: '100%',
            }}>{day}</Yoil>
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
    text-align:right;
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