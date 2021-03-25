import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
    //firebase 설정관련 개인정보 - sdk
    apiKey: "AIzaSyBJqF4Z_BNLHMvijI3KMSEvJut-fIcpDBU",
    authDomain: "react-calender-69f74.firebaseapp.com",
    projectId: "react-calender-69f74",
    storageBucket: "react-calender-69f74.appspot.com",
    messagingSenderId: "36224687586",
    appId: "1:36224687586:web:a60de882d8dfe1c6e92dbb",
    measurementId: "G-J9H4R1TRRY"
};

//firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

//firebase의 firestore인스턴스를 변수에 저장
const firestore = firebase.firestore();

//필요한 곳에서 사용할 수 있도록 보내기 
export { firestore };