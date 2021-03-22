
import {useState} from 'react';
import moment, { calendarFormat } from 'moment';
import styled from "styled-components";

    const App =(props)=>{

        const [getMoment, setMoment]=useState(moment());     
        const today = getMoment;    // today == moment()   입니다.

    return(
    <div className="App">

        <div className="control">
            <button>이전달</button>
            <span>{today.format('YYYY 년 MM 월')}</span>   //YYYY는 년도 MM 은 달 입니다.
            <button>다음달</button>
        </div>
        <table>
            <tbody>

            </tbody>
        </table>
    </div>
    );
}

const control = styled.div`
    background-color: orange;
`;


export default CalForm;
