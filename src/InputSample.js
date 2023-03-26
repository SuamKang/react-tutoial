import React, { useState, useRef } from "react";



const InputSample = () => {
    // input이 여러개일 경우 값을 하나만 조절할수없기에 초기값을 객체형태로 데이터를 넣어주도록 한다 지금 인풋이 2개이고 각각 name과 nickname이 들어가야 한다
    // 리엑트에서 객체를 업데이트 할때 한번 더 복사하여 불변성을 지켜줘야 리엑트컴포넌트가 상태의 업데이트를 감지하여 렌더링을 시켜주기 때문이다
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
    birth : ''
  });

  const nameInput = useRef(null); // 리엑트에서 DOM을 직접 조작하고 싶을떄 사용한다, 객체가 만들어진다.
  const {name, nickname, birth} = inputs; // 렌더링하기위해 쉽게 추출

  const onChange = (e) => {
    // 항상 어떤 이벤트객체로 값이 변하거나 관리가 필요하다면 미리 이벤트 타겟의 타입들을 비구조화할당으로 꺼내놓고 작업하면 편리하다
    const {name, value} = e.target;
    setInputs({
        ...inputs,
        [name]: value,
    })
  };

  const onReset = () => {
    setInputs({
        name : '',
        nickname : '',
        birth: ''
    })
    nameInput.current.focus(); // 초기화 버튼 눌렀을때 nameInput 요소에 포커스 되게 만듬
  };
  return (
    <div>
      <input
        name="name"
        type="text"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput} 
      />
      <input
        name="nickname"
        type="text"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <input
        name="birth"
        type="email"
        placeholder="생년월일"
        onChange={onChange}
        value={birth}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <p>이름 :{name}</p><p>닉네임 :{nickname}</p><p>생년월일 :{birth}</p>
      </div>
    </div>
  );
};

export default InputSample;
