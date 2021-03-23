import React from 'react';
import './PopUp.css'

const PopUp = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;

    return (
        // 팝업이 열릴때 openPopUp 클래스가 생성된다.
        <div className={open?'openPopUp popup':'popup'}>
            {open? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}>&times;</button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <button className="close" onClick={close}>close</button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}

export default PopUp