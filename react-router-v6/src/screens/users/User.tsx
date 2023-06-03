import { useParams } from "react-router-dom";
import { users } from "../../db";
import { Outlet, Link } from "react-router-dom";

/**
 * useParams
 * 리액트에서 제공하는 Hook으로 동적으로 라우팅을 생성하기 위해 사용한다.
 * URL에 포함되어있는 Key, Value 형식의 객체를 반환해주는 역할을 한다.
 */
function User() {
  const { userId } = useParams();
  console.log("parameters : ", userId);
  return (
    <div>
      <h1>
        User with it {userId} is names: {users[Number(userId) - 1].name}
      </h1>
      <div>
        <Link to="followers">See followers</Link>
        <Outlet context={{ nameOfMyUser: users[Number(userId) - 1].name }} />
      </div>
    </div>
  );
}

export default User;
