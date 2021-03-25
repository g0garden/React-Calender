// 데이터(상태)를 전역에서 관리하려고 리덕스를 사용함 리덕스 쓰려면 모듈 필요 -> 리듀서가 있어야 하니까 모듈에 Action,
// ActionCreator , Reducer(리덕스에 저장된 값을 리듀서에서만 업데이트 할 수 있음! ),store(리듀서+미들웨어)
//todo.js 얘가 모듈이지 
import {firestore} from '../../firebase';
const todo_db = firestore.collection('todo');
//Action(객체) 상태에 변화가 필요할때(가지고있는데이터변경할때) 발생
const LOAD = 'todo/LOAD';
const CREATE = 'todo/CREATE';
const COMPLETE = 'todo/COMPLETE';
const DELETE = 'todo/DELETE';
const COMPLETELIST ='todo/COMPLETELIST';

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
        },
    ],
    is_loaded: false,
};

// ActionCreator(함수)
//완료여부를 따지려면 데이터 필요 데이터는 파이어스토어에서 필터하지 말고, 리덕스나 컴포넌트에서 필터 나중에 여기에
// 추가하거나 컴포넌트 바꾸기
export const loadTodo = (todo) => {
    return {type: LOAD, todo};

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

export const completeList = () => {
  return {type: COMPLETELIST}
}


//firebase 통신함수
export const loadTodoFB = () => {
  
  //미들웨어 덕에 함수 반환 
  //getState = 모듈 state 값 
  return function (dispatch,getState) {
    
    todo_db.get().then((docs) => {
      
      let todo_data = [];
      docs.forEach((doc) => {
        if (doc.exists) {
          todo_data = [...todo_data, { id: doc.id, ...doc.data() }];
        }
      });
      console.log(todo_data)
      dispatch(loadTodo(todo_data));
    });
  }
}

export const createTodoFB = (todo) => {
  
  return function (dispatch) {
    let todo_item = {
      year: todo.year,
      month: todo.month,
      day: todo.day,
      hour: todo.hour,
      minute: todo.minute,
      text: todo.text,
      done: todo.done,
    };

    todo_db.add(todo_item).then(docRef => {

      todo_item = { ...todo_item, id: docRef.id };
      dispatch(createTodo(todo_item));

    })
  }
}


export const completeTodoFB = (id) => {
  return function (dispatch) {
    
    //여기서 비동기 처리 후 작업필요
    //돌아가는 것도 여기서(새로고침작업같이)
    //FB에서 완료상태를 업데이트하고, 그 업데이트된 값들을 가지고 
    //.then에서 completeTodo(FB에서 업데이트받은 값들을 완료상태가 true인지 확인하고 반환)실행시켜
    todo_db.doc(id).update({done:true}).then(() => {
      dispatch(completeTodo());
      window.location.replace("/");
    }).catch(err => {
      console.log(err)
    })
  }

}

export const deleteTodoFB = (id) => {
  return function (dispatch, getState) {

    const _todo_item = getState().todo.todos.find((todo) => todo.id === id)
    //없으면 걍 리턴

    if( !_todo_item){
      return;
    }

    todo_db.doc(_todo_item.id).delete().then((docRef) => {
      dispatch(deleteTodo(id))
      window.location.replace("/");
    }).catch(err => {
      console.log(err)
    })
  }
}


// Reducer          
//리덕스에 저장된 상태(데이터)를 변경하는 함수
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
      case LOAD:
        
        if (action.todo.length > 0) {
          
          return { todos: action.todo, is_loaded: true }
        }
        
        return state;
  
      case CREATE:
        
        const newTodos = [...state.todos, action.todo,]
        return {todos:newTodos}
      
        
    
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
    
      //.filter와 map의 차이 map은 연산을 하고 filter는 true값만 return 한다 
      case DELETE:
        const todoList = state.todos.filter((todo, idx) => {
          
          if (todo.id !== action.id) {//삭제할 값이 아니면(todo랑 action이 같지않으면) return(true이라는것)해라 
            return todo;
          }
        });
        
        return { todos: todoList };

    
      case COMPLETELIST:
        const completeList = state.todos.filter((todo) => {

          if(todo.done === true){
            return todo;
          }
        });
      

        return {todos: completeList}


    default:
      return state;
            //기본값으로 보내줘야 한다.
    }

}

  
