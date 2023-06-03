import Router from "./Router";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

// Outlet이 있어야 children link가 동작한다.
function Root() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
