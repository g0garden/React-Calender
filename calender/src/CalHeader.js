import React, { Component } from 'react';
import './App.css';
import {useState} from 'react';
import moment from 'moment';
import styled from "styled-components";

const CalHeader =()=>{

    const [getMoment, setMoment]=useState(moment());
    const today = getMoment; //today == moment()

    return (
        <div className="App">
            <div className="control">
                <span>{today.format('MM, YYYY')}</span>  {/*월 영어로 바꿔주기*/}
                {/* */}
                <button onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }}>
                    <i className="fas fa-chevron-left"/>
                </button> 
                <button onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }}>
                    <i className="fas fa-chevron-right"/>
                </button >
            </div>
            <div>
                <div className="days">
                    <div>SUN</div>
                    <div>MON</div>
                    <div>TUE</div>
                    <div>WED</div>
                    <div>THU</div>
                    <div>FRI</div>
                    <div>SAT</div>
                </div>
            </div>
        </div>
        );
    }

export default CalHeader;