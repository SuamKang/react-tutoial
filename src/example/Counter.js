import React, {useReducer, useState} from "react";
// reducer는 action type에 따라 다른 state값을 반환한다.
// state의 타입은 숫자,문자,배열,객체 뭐든 다 들어올 수 있다.

const reducer = (state,action) => {
    switch(action.type) {
        case 'INCREASE':
            return state + 1;
        case 'DECREASE':
            return state - 1;
        default :
            return state;
            // throw new Error('Unhandled action'); //에러를 던져도 됨.
    }
}

const Counter = () => {

    // useReducer에 첫번째 구조분해 할당에는 현재 상태가 올것이고(number) 두번재엔 dispatch라는 함수가 오는데 이건 action을 발생시키는 함수이다.
    // useReducer함수의 첫번째 인자로는 만들었던 reducer함수를 넣어주고, 두번째 인자는 초기값을 넣어준다. 
    const [number, dispatch] = useReducer(reducer, 0)

    const onIncrease = () => {
        dispatch({
            type : 'INCREASE'
        })
    };

    const onDecrease = () => {
        dispatch({
            type :'DECREASE'
        })
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;