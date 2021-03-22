
import {useState} from 'react';
import moment, { calendarFormat } from 'moment';
import styled from "styled-components";

    const CalHeader =(props)=>{

        const [getMoment, setMoment]=useState(moment());     
        const today = getMoment;    // today == moment()   입니다.
    
    return(
    <div className="App">
        <Control>
        <div className="control">
            <span>{today.format('MM, YYYY')}</span>  {/*월 영어로 바꿔주기*/}
            <button onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }}>
                <i className="fas fa-chevron-left"/>
            </button> 
            <button onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }}>
                <i className="fas fa-chevron-right"/>
            </button >
        </div>
        </Control>
    </div>
    );
}

const Control = styled.div`
    width: 700px;
    height: 500px;
    background-color: orange;
`;

export default CalHeader;
