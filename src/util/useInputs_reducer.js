import { useState , useCallback, useReducer } from "react";

// useReducer를 사용해서 커스텀훅 구현하기
// reducer엔 onChange와 reset함수가 있어야함



const reducer = (state,action) => {
    switch (action.type) {
        case "ONCHANGE" :
            return {
                ...state,
                inputs : {
                    ...state.inputs,
                    [action.name] : action.value // action값(사용자 입력값)이 input내용으로 설정
                }
            }
        case "RESET" : // 객체 초기화 방식
            return  Object.keys(state).reduce((acc, cur) => {
                acc[cur] = ''; // 누적된 state안 키값들에 빈문자열 할당
                return acc; // state와 동일한 키지만,값들은 초기화된 키 반환
            },{})
        default :
            throw new Error('Unhandled Action')
    }
}


const useInputs = (initialForm) => { //initialForm은 해당 input에서 관리할 초기값
    // const [form, setForm] = useState(initialForm);
    const [form,dispatch] = useReducer(reducer,initialForm)

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
       dispatch({type : "ONCHANGE", name, value}); // form업데이트
    },[]); // 의존하는 상태가따로없으니 deps는 비워준다

   
    const reset = useCallback(() => dispatch({type: "RESET"}), []); // 컴포넌트 파라미터로 가져온 값을 사용하고 있으니 deps에 넣어준다. 추적할 값이 존재

    return [form, onChange, reset]; // 바깥으로 내보내기위한 반환값
};


export default useInputs;
