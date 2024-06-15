import { useDispatch, useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { getUserName, logout } from "../store/slices/userSlice";
import Button from "./Button";

function Home() {
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName === "" ? (
        <CreateUser />
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button to={"/menu"} size={"primary"}>
            Continue ordering, {userName}
          </Button>
          <Button size={"secondary"} onClick={() => dispatch(logout())}>
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
}

export default Home;
