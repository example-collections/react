import { useRecoilState, useRecoilValue } from "recoil";
import { doubledCountState } from "./Selector";
import { countState } from "./Atom";

function Counter() {
  const [count, setCount] = useRecoilState(countState);
  const doubledCount = useRecoilValue(doubledCountState);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled Count: {doubledCount}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
