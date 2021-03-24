// 데이터(상태)를 전역에서 관리하려고 리덕스를 사용함 리덕스 쓰려면 모듈 필요 -> 리듀서가 있어야 하니까 모듈에 Action,
// ActionCreator , Reducer(리덕스에 저장된 값을 리듀서에서만 업데이트 할 수 있음! ),store(리듀서+미들웨어)
//todo.js 얘가 모듈이지 

//Action(객체) 상태에 변화가 필요할때(가지고있는데이터변경할때) 발생
const LOAD = 'todo/LOAD';
const CREATE = 'todo/CREATE';
const COMPLETE = 'todo/COMPLETE';
const DELETE = 'todo/DELETE';

//initialState
const initialState = {
    todos: [
        {
            id: 1,
            year: '2021',
            month: '03',
            day: '23',
            hour: '14',
            minute:'20',
            text: 'React 상태관리',
            done: true
        }, {
            id: 2,
            year: '2021',
            month: '03',
            day: '07',
            hour: '19',
            minute:'10',
            text: 'WIL 쓰기',
            done: true
        }, {
            id: 3,
            year: '2021',
            month: '03',
            day: '23',
            hour: '9',
            minute:'20',
            text: '소규모 면담하기',
            done: false
        }, {
            id: 4,
            year: '2021',
            month: '03',
            day: '25',
            hour: '21',
            minute:'00',
            text: '리액트 복습하기',
            done: false
        }, {
            id: 5,
            year: '2021',
            month: '05',
            day: '16',
            hour: '7',
            minute:'20',
            text: '팔굽혀펴기 200회',
            done: false
        }
    ]
};

// ActionCreator(함수)
//완료여부를 따지려면 데이터 필요 데이터는 파이어스토어에서 필터하지 말고, 리덕스나 컴포넌트에서 필터 나중에 여기에
// 추가하거나 컴포넌트 바꾸기
export const loadTodo = () => {
    return {type: LOAD};

}       
export const createTodo = (todo) => {
    return {type: CREATE, todo}
}
export const completeTodo = (id) => {
    return {type: COMPLETE, id}
}
//dispatch가 액션생성함수를 받으면, 액션을 반환하는데 이게 리듀서에서 새 값이 업데이트되니까 그리고 리듀서에서 업데이트된 새 값을 스토어에 저장하고 저장된 값을 연결해논 
export const deleteTodo = (id) => {
    return {type: DELETE, id}
}

// Reducer          
//리덕스에 저장된 상태(데이터)를 변경하는 함수
export default function reducer(state = initialState, action = {}) {

    
    switch (action.type) {
    case LOAD:
      if (action.todo.length > 0) {
        return {todos: action.todo}
      }
      
      return state;
  
    case CREATE:
      
      if(state.todos.length!==0){
        action.todo.id = state.todos[state.todos.length - 1].id + 1;
      }
      const newTodos = [...state.todos, action.todo];
      
      
      return { ...state,todos: newTodos };
    
    case COMPLETE: {
      const updateDone = state.todos.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, done: true }
        } else {
          return todo;  
        }
      });
      
      return { todos: updateDone };
    
    }
    
    case DELETE:
      const todoList = state.todos.filter((todo, idx) => {
        
        if (todo.id !== action.id) {
          return todo;
        }
      });
      
      return { todos: todoList };
    
        default:
            return state;
            //기본값으로 보내줘야 한다.
    }

}
