import React from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const NotFound = (props) => {


    return (
        <Outter>
        <FontAwesomeIcon icon={faExclamationCircle} size="4x" />
        <Not>Not Found!<br />올바르지 않은 주소 입니다.</Not>
    </Outter>
    );
    };

export default NotFound;


const Outter = styled.div`
    margin-top:80px;
    `
    const Not = styled.h2`
    
    font-weight: 600;
    line-height:1.6;
    `