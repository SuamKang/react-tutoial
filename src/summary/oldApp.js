function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const [users, setUsers] = useState([
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
  ]);

  const { username, email, active } = inputs; // 추출

  // input에 입력값을 받는 이벤트
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  ); // inputs가 바뀔때만 함수가 새로 만들어지고 그렇지 않으면 기존에 사용하던 함수를 재사용하게(바뀌지 않은 상태의 함수)된다.

  // users의 배열에 추가로 들어오는 다음 nextId값이 초기값 4인 값으로 관리해줄것이다.
  const nextId = useRef(4); // 컴포넌트가 계속 리렌더링되도, nextId는 4라는 값을 기억(유지)하고 있다. 또한 이 값을 아래처럼 이벤트로 추가하여 바꿀 순 있지만, 이값이 바뀐다고해서 컴포넌트가 리렌더링 되는것은 아닌점을 명심하자!

  // 새로 추가할 이벤트(CRUD CREATE)
  const onCreate = useCallback(() => {
    const newUser = {
      id: nextId.current,
      username,
      email,
      active,
    }; // 새로운 유저 생성
    setUsers((users) => [...users, newUser]); // 추가
    // setUsers(users.concat(newUser)); // concat을 써도됨
    setInputs({
      username: "",
      email: "",
    }); // inputs창에 입력된 텍스트는 다시 초기화
    nextId.current += 1; // id값은 하나씩 올라가게
  }, [username, email, active]); // users 종속성 요소 하나 제거

  // 삭제할 이벤트 (CRUD DELETE)
  const onRemove = useCallback((id) => {
    setUsers((users) => users.filter((user) => user.id !== id)); //
  }, []); // 기존 종속성 배열에 속한 users를 제거하여 처음 렌더링 될때만 함수가 만들어지고 그 다음부턴 재사용하는것이다

  // 선택 항목 수정
  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    ); // map으로 선택된 user이면 그 user의 active값을 반전시켜준다
  }, []); // 얘도 마찬가지

  const count = useMemo(() => countAtiveUsers(users), [users]);

  return (
    <div className="app">
      <CreateUser
        className="create"
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <div>활성화된 유저수 : {count}</div>
      <UserList
        className="user-list"
        users={users}
        onRemove={onRemove}
        onToggle={onToggle}
      />
    </div>
  );
}
