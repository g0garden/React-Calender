import React, { useState } from 'react';
import PopUp from './PopUp';

function ListView() {
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [ PopUpOpen, setPopUpOpen ] = useState(false);

    const openPopUp = () => {
        setPopUpOpen(true);
    }
    const closePopUp = () => {
        setPopUpOpen(false);
    }

    return (
      //DOM 구조에 반영되지 않는 React Fragment를 이용하여
      //부모 태그의 render를 생략할 수 있다. 
      //테이블의 tr이나 td의 경우 다중개를 보낼 수 없으니 
      //div로 묶어야하는데 그러면 불필요한 태그가 생기니 
      //이를 방지하기 위해 react Fragment 사용.
        <React.Fragment>
            <button onClick={ openPopUp }>일정보기</button>

            {/*일정내용 - open되면서 보여짐*/}
            <PopUp open={ PopUpOpen } close={ closePopUp } header="3월 23일 2시">
            캘린더과제-데이터 연동하기
            </PopUp>
        </React.Fragment>
    )
}

export default ListView