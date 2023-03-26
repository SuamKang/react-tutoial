import React, { useRef, useReducer, useMemo, useCallback, createContext } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";
// import useInputs from "./util/useInputs";
import "./App.css";
import produce from "immer"; // immer사용하여 불변성 처리

// immer
// produce(변화시키고자하는 배열or객체, (draft)=>{draft.~~})
// 즉, draft가 this처럼 첫번째 인자에 들어온 상태를 대신하여 불변성을 지켜 상태를 변화시켜주는것이다!



// active된 유저들의 수를 세는 함수(특정함수)
function countAtiveUsers(users) {
  return users.filter((user) => user.active === true).length;
}

// useReducer
// App컴포넌트에서 사용할 초기 상태들을 컴포넌트 외부에 선언해준다
const initialState = {
  // inputs: {
  //   username: "",
  //   email: "",
  // }, -> 이 값 또한 custom hook 사용으로인해 필요없다
  users: [
    {
      id: 1,
      username: "denver",
      email: "kkk1234@gmail.com",
      active: false,
    },
    {
      id: 2,
      username: "jayden",
      email: "jjj333@gmail.com",
      active: false,
    },
    {
      id: 3,
      username: "tom",
      email: "ttt888@gmail.com",
      active: false,
    },
  ]
};

// useReducer frame
const reducer = (state, action) => {
  switch (action.type) {
    // case "CHANGE_INPUT":
    //   return {
    //     // 기존 자신의 state상태 복사하고, inputs값을 새로운 값으로 덮어씌운다(불변성쓰)
    //     ...state, // 여기엔 users까지 들어있음
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value, // input(name)에 따른 value값
    //     },
    //   }; -> useInputs custom hook 사용했기때문에 더이상 필요하지 않게됨
    case "CREATE_USER":
      return produce(state, (draft)=> {
        draft.users.push(action.user)
      }) // immer사용
      // return {
      //   inputs: initialState.inputs, // 초기값 적용
      //   users: state.users.concat(action.user), // 새로운 user 추가
      // };
    case "TOGGLE_USER":
      return produce(state, (draft)=>{
        const newUser = draft.users.find(user=> user.id === action.id); // 바꿀 userId찾은 newUser를
        newUser.active = !newUser.active; // 그냥 반전시킴 바로
      })
      // return {
      //   ...state,
      //   users : state.users.map(user => 
      //     user.id === action.id ? {...user, active: !user.active} : user
      //   )
      // }; // 해당 user들중 action이 발생한 그 id와 같다면, user의 active속성 반전시키기
    case "REMOVE_USER":
      return produce(state, (draft)=>{
        const userIndex = draft.users.findIndex(user=> user.id === action.id); //지우려할 id찾고
        draft.users.splice(userIndex,1); // userIndex 1개가 없어짐
      })
      // return {
      //   ...state,
      //   users : state.users.filter(user => user.id !== action.id)
      // }; // 각 user들중 action이 발생한 그 id와 같지 않은것들만 유지하게 
    default:
      throw new Error('Unhandled action');
  }
};


// Context API
// Context API 설정(dispatch가 실제 엑션에 담긴 상태케이스에 따라 상태를 바꿔주는 함수이기 때문에 UserDispatch라고 context를 지정함)
// createContext로 만든 값은 Provider라는 컴포넌트가 내장되어있다
export const UserDispatch = createContext(null); 

 

function App() {
  // const nextId = useRef(4); // 기존 데이터가 3개까지 등록되어있으니 초기값 4
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [form, onChange, reset] = useInputs({
  //   username : '',
  //   email: ''
  // }); // form은 2개의 input에대한 값들이기에 initialForm으로 input들의 name값들이 들어가야함
  // const { username, email } = form; // 추출
  // initialState에 담긴 초기값 추출
  const { users } = state;
  // const { username, email } = state.inputs;

  // const onChange = useCallback((e) => {
  //   const { name, value } = e.target;
  //   dispatch({
  //     // 이게 action임
  //     type: "CHANGE_INPUT",
  //     name,
  //     value,
  //   });
  // }, []); //이 함수는 처음 컴포넌트가 렌더링 될때 한번 만들고 다음부턴 재사용

  // const onCreate = useCallback(() => {
  //   dispatch({
  //     // action
  //     type: "CREATE_USER",
  //     user: {
  //       id: nextId.current,
  //       username,
  //       email,
  //     },
  //   });
  //   nextId.current += 1;
  //   reset();
  //   console.log(reset)
  // }, [username, email, reset]); // username의 input과 email의 input의 값을 추적해서 바뀔때 실행

  // const onToggle = useCallback((id) => {
  //   dispatch({
  //     type: "TOGGLE_USER",
  //     id
  //   })
  // },[]); //이 함수는 처음 컴포넌트가 렌더링 될때 한번 만들고 다음부턴 재사용

  // const onRemove = useCallback((id) => {
  //   dispatch({
  //     type: "REMOVE_USER",
  //     id
  //   })
  // },[]); //이 함수는 처음 컴포넌트가 렌더링 될때 한번 만들고 다음부턴 재사용

  const count = useMemo(() => countAtiveUsers(users),[users]);



  return (
    <UserDispatch.Provider value={dispatch}>
      <div className="app">
        <CreateUser />
        <div>활성화된 유저수 : {count}</div>
        <UserList users={users} />
      </div>
    </UserDispatch.Provider>
  );
}

export default App;
