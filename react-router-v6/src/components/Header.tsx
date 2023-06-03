import { Link, useNavigate } from "react-router-dom";

/**
 * useNavigate
 * Link의 용도와 마찬가지로 페이지 이동을 하게 하는 함수
 */
function Header() {
  const navigate = useNavigate();
  const onAboutClick = () => {
    navigate("/about");
  };
  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <button onClick={onAboutClick}>About</button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
