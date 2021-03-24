//모달창의 부모
import React, { useState } from 'react';
import styled from "styled-components";
import PopUp from './PopUp';

function ListView(props) {
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [ popupOpen, setPopUpOpen ] = useState(false);
    
    const openPopUp = () => {
        setPopUpOpen(true);
    }

    const closePopUp = () => {
        setPopUpOpen(false);
    }

    const todo = props.todayTodos;
    const date = todo.year + '.' + todo.month + '.' + todo.day + '일정';
    const id = todo.id;
    
    return (
      //DOM 구조에 반영되지 않는 React Fragment를 이용하여
      //부모 태그의 render를 생략할 수 있다. 
      //테이블의 tr이나 td의 경우 다중개를 보낼 수 없으니 
      //div로 묶어야하는데 그러면 불필요한 태그가 생기니 
      //이를 방지하기 위해 react Fragment 사용.
        <React.Fragment>
            <Todo onClick={openPopUp}>{todo.text}
                {todo.done && <span style={{fontWeight:'600',color:'#D82D2D',marginLeft:'4px'}}>✓</span>}
            </Todo>
            <PopUp open={popupOpen} close={closePopUp} header={date} do={todo.done} id={id}>
                {todo.hour < 12 && <span>오전 </span>}
                {todo.hour>=12 && <span>오후 </span>}
                {todo.hour}:{todo.minute}  {todo.text}
                {todo.done && <span style={{ fontWeight: '600', color: '#D82D2D', marginLeft: '4px' }}>✓</span>}
            </PopUp>  
        </React.Fragment>
    )
}

export default ListView

const Todo = styled.p`
    font-size:12px;
    padding-left: 2px;
    cursor: pointer;
    margin-bottom: -6px;
    @media (min-width: 768px) and (max-width:1023px) {
    
        font-size:11px;
    
    }
    @media (max-width:767px) {
    
        font-size:9px;
    }
`