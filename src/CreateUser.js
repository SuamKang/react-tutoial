import React, {useContext, useRef, useCallback} from "react";
import useInputs from "./util/useInputs";
import "./App.css"
import { UserDispatch } from "./App";

const CreateUser = () => {

  const nextId = useRef(4);
  // context API
  const dispatch = useContext(UserDispatch);
  // custom hook
  const [form, onChange, reset] = useInputs({
    username : '',
    email: ''
  });
  const { username, email } = form;

  // 필요한 함수는 필요한 컴포넌트에 두고 쓰는게 최적화에 좋다
  const onCreate = useCallback(() => {
    dispatch({
      // action
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
    reset();
    console.log(reset)
  }, [username, email, reset])

  // 엔터키 적용
  const onKeyDown = (e) => {
    if(e.key === 'Enter'){
      onCreate();
    }
  }

  return (
    <div className="input-inner">
      <div className="input-title"><h2>계정 추가하기 예제</h2></div>
      <div className="input-container">
        <input
          name="username"
          placeholder="계정명"
          onChange={onChange}
          value={username}
        />
        <input
          name="email"
          placeholder="이메일"
          onChange={onChange}
          value={email}
          onKeyDown={onKeyDown}
        />
        <button onClick={onCreate} >등록</button>
      </div>
    </div>
  );
};

export default React.memo(CreateUser); // props값이 바뀌었을때만 리렌더링 해준다.(React.memo로 최적 화시키기)
