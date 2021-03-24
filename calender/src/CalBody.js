import './App.css';
import {useState} from 'react';
import moment from 'moment';
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector} from "react-redux";
//리덕스 훅을 사용해서 액션생성함수를 불러와서 스토어에 저장된 값을 사용

import Dates from "./Dates.js";


const CalBody =(props)=>{

    const [getMoment, setMoment]=useState(moment());//함수형 컴포넌트에서 state사용하기
    const today = getMoment; //today == moment()

    //1년 중 이번주
    const firstWeek = today.clone().startOf('month').week(); //그 달의 시작하는 주
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week(); //끝주
    
    //1년은 52주가 존재하고 며칠이 더 있다, 이 부분을 달력은 53주로써 표현해야 하지만 moment()는 내년의 첫 주인 1로 표시하기 때문에 
    // 마지막 주가 1이라면 53으로 표시

    //반복문을 사용하여 해당 달의 총주의 수만큼 반복문을 실행하고 테이블의 내용을 배열에 추가합니다. 
    const calendarArr=()=>{
        let result = [];
        let week = firstWeek;
        for ( week; week <= lastWeek; week++){
            
        result = result.concat(
        <TheDays key={week}> 
            { 
            Array(7).fill(0).map((data, index) => {
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성
                
            //오늘이 달력 표기일과 같으면 오늘이지
            if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                return <Dates day={days.format('D')} key={index} today={'yes'} month={days.format('MM')} date={days.format('YYYY.MM.DD')}/>
                //Dates의 속성값들로 day,key(반복되는요소들은 고유값을 넣어준데 ),today..를 넘겨준다는 거??
                
            // 이번달 아니면 날짜만 보여주고
            // day 컴포넌트 두개로 조건문을 분리
            }else if(days.format('MM') !== today.format('MM')){
                return <Dates day={days.format('D')} key={index} notThisMonth={true} date={days.format('YYYY.MM.DD')}/>
                
            //오늘도 아니고 이번달인 날들
            }else{
                return <Dates day={days.format('D')} key={index} today={'no'} month={days.format('MM')} date={days.format('YYYY.MM.DD')}/>
            }
        })
    }
    </TheDays>

    )
}
    return result;
}

return (
    <CalWrap>
        <CalHead>
        <MonthWrap>
            <MonthBtn className="month_btn" onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }}>
                <FontAwesomeIcon icon={faChevronLeft} size="1x" className="month-btn" onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }}/>
            </MonthBtn> 
            <Month>{today.format('MMMM, YYYY')}</Month>  {/*월 영어로 바꿔주기*/}
            <MonthBtn className="month_btn"  onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }}>
                <FontAwesomeIcon icon={faChevronRight} size='1x' className="month-btn" onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }}/>
            </MonthBtn>
        </MonthWrap>
        <BtnWrap>
            <Btn className="complete-btn" title="완료">Complete</Btn>
            <Btn onClick={() => {
            props.history.push("/todo");}} title="추가">+</Btn>
        </BtnWrap>
        </CalHead>
        <DayWrap>
            <DayofWeek>
                <Day className="sun">SUN</Day>
                <Day>MON</Day>
                <Day>TUE</Day>
                <Day>WED</Day>
                <Day>THU</Day>
                <Day>FRI</Day>
                <Day className="sat">SAT</Day>
            </DayofWeek>
        </DayWrap>
        <DateWrap>
            {calendarArr()}
        </DateWrap>
    </CalWrap>
        
    );
};

export default CalBody;

const CalWrap = styled.div`
    margin: 50px auto;
    width: 60%;
    padding: 70px;
    border-radius: 62px;
    background: #fcfcfc;
        
`

const CalHead = styled.div`
    display: flex;
    justify-content: space-between;
`;

const MonthWrap = styled.div`
    & .month_btn{
        cursor: pointer;
        transition: color .3s;
    }
    & .month_btn:hover{
        color:#f5ef32;
    }
`
const Month = styled.span`
    font-family: 'Do Hyeon', sans-serif;
    margin: 10px 15px;
    font-size: 30px;
    color: #202b83;
`

const MonthBtn = styled.span`
    size: 1px;
    color: #202b83 ;
`

const DayWrap = styled.div`
    border-bottom: 1px solid #D5D5D5;
    margin-top:15px;
    padding: 5px 0px 5px 0px;

`

const DayofWeek = styled.div`
    display: grid;
    grid-template-columns: repeat(7,1fr);
    text-align: center;
    padding: 15px;
    
    & .sun{
        color:#ec0e0e;
    }
    & .sat{
        color:#0e33ec;
    }
    @media (max-width:767px) {
        font-size: 13px;
    }
`

const Day = styled.div`
    font-family: 'Do Hyeon', sans-serif;
    color:#280101;

`
const DateWrap = styled.div`
    display: grid;
    padding:3px;

`
const TheDays = styled.div`
    display: flex;
`

const BtnWrap = styled.div`

    display: flex;

    text-align: center;
    gap : 0px 10px;

    @media (max-width:767px) {
    gap: 8px 0px;
    position: absolute;
    z-index:1500;
    right: 7px;
    bottom: 15px;
    }
    
    `


    const Btn = styled.button`
    width:60px;
    height: 60px;
    cursor: pointer;
    outline: none;
    color: #202b83;
    font-size: 22px;
    transition: background-color .3s;
    border-radius: 100%;
    border: #202b83;
    

    &.complete-btn{
        width: 100px;
        height:50px;
        border-radius: 0;

    }
    
    
    @media (max-width:767px) {
    box-shadow: 0px 2px 5px #A5A5A5;
    }
    &:hover{
        color: #fcfcfc;
        background-color: #202b83;
        border-radius: 62px;
        box-shadow: inset 28px 28px 56px #182062,
                    inset -28px -28px 56px #2836a4;
    }
    
    &.complete-btn{
        font-size: 17px;
        font-family: 'Do Hyeon', sans-serif;
        
    &:hover{
        color: #fcfcfc;
        background-color: #202b83;
    }
    
    }
    `



