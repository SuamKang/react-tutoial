import { useState , useCallback} from "react";


// 해당 컴포넌트는 여러 input에 의한 상태를 변경할때 쓸수있는 custom hooks 이다.
const useInputs = (initialForm) => { //initialForm은 해당 input에서 관리할 초기값
    const [form, setForm] = useState(initialForm);

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        setForm(form => ({...form , [name]: value})); // form업데이트
    },[]); // 의존하는 상태가따로없으니 deps는 비워준다

    // form을 초기화 시킴
    const reset = useCallback(() => setForm(initialForm), [initialForm]); // 컴포넌트 파라미터로 가져온 값을 사용하고 있으니 deps에 넣어준다. 추적할 값이 존재

    return [form, onChange, reset]; // 바깥으로 내보내기위한 반환값
};


export default useInputs;




// Fetch하는 custom hook
// const useFetch = ( initialUrl:string ) => {
// 	const [url, setUrl] = useState(initialUrl);
// 	const [value, setValue] = useState('');

// 	const fetchData = () => axios.get(url).then(({data}) => setValue(data));	

// 	useEffect(() => {
// 		fetchData();
// 	},[url]);

// 	return [value];
// };

// export default useFetch;