import './App.css';
import {useState} from 'react';
import moment from 'moment';
import styled from "styled-components";

const CalBody =()=>{

    const [getMoment, setMoment]=useState(moment());
    const today = getMoment; //today == moment()

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
            <tr key={week}> { Array(7).fill(0).map((data, index) => {
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성
                
            //오늘이 달력 표기일과 같다 같으면 오늘이지
            if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                return(
                <td key={index} style={{color:'#FE1818'}} >
                    <span>{days.format('D')}</span>
                </td>
                );        
            }else if(days.format('MM') !== today.format('MM')){
                return(
                <td key={index} style={{color:'#D7D4D4'}} >
                    <span>{days.format('D')}</span>
                </td>
                );
            }else{
                return(
                <td key={index}  >
                    <span>{days.format('D')}</span>
                </td>
                );
                }
            })
        }
            </tr>
            );
            }   
        return result;
        }

    return (
        <div>
            <table>
            <tbody>
                {calendarArr()}
            </tbody>
            </table>
        </div>
    );
}


export default CalBody;