import React, { useContext } from "react";
import { UserDispatch } from "./App";

const User = React.memo(({ user }) => {
  const { username, email, id, active } = user; // 추출

  // createContext한 녀석 써야할 컴포넌트로 불러와서 적용(상단에 import 필수!!)
  const dispatch = useContext(UserDispatch);


  return ( 
    <div>
      <input type="checkbox" onClick={()=>dispatch({type: "TOGGLE_USER", id})}/>
      <div style={{ display:"inline-block", cursor: "pointer", color: active ? "lightGrey" : "black" }} >
        <b>{username}</b>
        &nbsp;<span>({email})</span>&nbsp;&nbsp;
      </div >
      <button onClick={() => dispatch({type:"REMOVE_USER", id})}>삭제</button>
    </div>
  );
});

const UserList = ({ users }) => {
  return (
    <div className="user-inner">
      <ul className="user-list">
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(UserList ,
    (prevProps, nextProps) => prevProps.users === nextProps.users
  ); // props값이 바뀌었을때만 리렌더링 해주기(React.memo로 최적화 시키기)

