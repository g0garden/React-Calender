import './App.css';
import {useState} from 'react';
import moment from 'moment';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import Dates from "./Dates";


const CalBody =(props)=>{

    const [getMoment, setMoment]=useState(moment());
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
                return <Dates day={days.format('D')} key={index} today={'yes'}/>
                
                
            // 이번달 아니면 날짜만 보여주고
            // day 컴포넌트 두개로 조건문을 분리
            }else if(days.format('MM') !== today.format('MM')){
                return <Dates day={days.format('D')} key={index} notThisMonth={true}/>
                
            //오늘도 아니고 이번달인 날들
            }else{
                return <Dates day={days.format('D')} key={index} today={'no'}/>
            }
        })
    }
    </TheDays>

    )
}//for
    return result;
}

//요일들
return (
    <CalWrap>
        <MonthWrap>
            <Month>{today.format('MM, YYYY')}</Month>  {/*월 영어로 바꿔주기*/}
            <MonthBtn className="month_btn" icon={faChevronCircleLeft} onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }}>
            </MonthBtn> 
            <MonthBtn className="month_btn" icon={faChevronCircleRight} onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }}>
                {/*<i className="fas fa-chevron-right"/>*/}
            </MonthBtn >
        </MonthWrap>
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
        <BtnWrap>
            <Btn className="complete-btn" title="완료">Complete</Btn>
            <Btn onClick={() => {
            props.history.push("/todo");}} title="추가">Add</Btn>
        </BtnWrap>
    </CalWrap>
        
    );
};

export default CalBody;

const CalWrap = styled.div`
    margin: 15px auto 0 auto;
    width:83%;
    padding: 10px;
    border-radius: 62px;
    background: #d9d9d9;
    box-shadow:  7px 7px 14px #8b8b8b,
                -7px -7px 14px #ffffff;
        
`

const MonthWrap = styled.div`
    & .month_btn{
        cursor: pointer;
        transition: color .3s;
    }
    & .month_btn:hover{
        color:#E3302E;
    }
`
const Month = styled.span`
    font-family: "YESGothic-Bold";
    margin: 10px 15px;
    font-size: 20px;
`

const MonthBtn = styled.span`
    size: 1px;
    color: red;
`

const DayWrap = styled.div`
    border-bottom: 1px solid #D5D5D5;
    margin-top:15px;
    padding: 5px 0px 5px 0px;

`

const DayofWeek = styled.div`
    display: grid;
    grid-template-columns: repeat(7,1fr);
    align-items:center;
    padding: 15px;
    
    & .sun{
        color:#DFBEBE;
    }
    & .sat{
        color:#BEDEDF;
    }
    @media (max-width:767px) {
    
        font-size: 13px;
    }
`

const Day = styled.div`
    font-family: "YESGothic-Bold";

`
const DateWrap = styled.div`
    display: grid;
    padding:3px;

`
const TheDays = styled.div`
    display: flex;
`

const BtnWrap = styled.div`
    
    padding: 12px 5px 12px 0px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    gap : 0px 10px;
    @media (max-width:767px) {
    
    flex-direction: column;
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
    border-radius: 100%;
    cursor: pointer;
    outline: none;
    background-color: #1e1e1d;
    border:none;
    color:white;
    font-size: 22px;
    transition: background-color .3s;
    
    @media (max-width:767px) {
    box-shadow: 0px 2px 5px #A5A5A5;
    }
    &:hover{
    background-color: #3BB3D8;
    }
    
    &.complete-btn{
        font-size: 17px;
        font-family: "YESGothic-Bold";
        
    &:hover{
        background-color: #DA2727;
    }
    
    }
    `



