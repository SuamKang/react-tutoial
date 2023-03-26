import React, {createContext, useContext,useState} from "react";


// context에서 사용할 기본값 설정
const MyContext = createContext('defaultValue');

const Child = () => {
    const text = useContext(MyContext); // useContext훅은 context의 값을 불러와서 사용하게 해줌
    return <div>안녕하세요 {text}</div>
}


const Parent = () => {
    return <Child />
}


const GrandParent = () => {
    return <Parent />
}

export const ContextSample = () => {

    const [value,setValue] = useState(true)
    // context값을 지정한 값으로 사용하고 싶다면, 최상위 컴포넌트에서 <Provider></Provider>라는 컴포넌트를 사용해서 최상위컴포넌트를 감싸고 속성으로 value값을 통해 전달할 props를 지정해주면된다./

    // 또한 지정해준 value값(상태)을 useState로 유동적으로 바꿔줄수있음
    return (
        <MyContext.Provider value={value ? "Good" : "Bad"}>
         <GrandParent />
         <button onClick={() => setValue(!value)}>click me</button>
        </MyContext.Provider>
    )
}

