import './App.css';
import {useState} from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";


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
                return <TheDay day={days.format('D')} key={index} today={'yes'}/>
                
                
            // 이번달 아니면 날짜만 보여주고
            // day 컴포넌트 두개로 조건문을 분리
            }else if(days.format('MM') !== today.format('MM')){
                return <TheDay day={days.format('D')} key={index} notThisMonth={true}/>
                
            //오늘도 아니고 이번달인 날들
            }else{
                return <TheDay day={days.format('D')} key={index} today={'no'}/>
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
            {/* */}
            <PrevBtn onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }}>
                <i className="fas fa-chevron-left"/>
            </PrevBtn> 
            <NextBtn onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }}>
                <i className="fas fa-chevron-right"/>
            </NextBtn >
        </MonthWrap>
        <DayWrap>
            <Day>SUN</Day>
            <Day>MON</Day>
            <Day>TUE</Day>
            <Day>WED</Day>
            <Day>THU</Day>
            <Day>FRI</Day>
            <Day>SAT</Day>
        </DayWrap>
        <DateWrap>
            {calendarArr()}
        </DateWrap>
        <BtnWrap>
            <Btn className="complete-btn" title="완료">Complete</Btn>
            <Btn onClick={()=>{
                props.history.push("/todo");
            }} title="추가">Add</Btn>
        </BtnWrap>
    </CalWrap>
        
    );
};

const NextBtn = styled.div`
    baground-color: blue;
`;

export default CalBody;

