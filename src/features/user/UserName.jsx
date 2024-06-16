import { useSelector } from "react-redux";
import { getUserName } from "../../store/slices/userSlice";

const UserName = () => {
  const userName = useSelector(getUserName);

  if (!userName) return null;

  return (
    <div className="hidden text-sm font-normal md:block md:text-lg">
      {userName}
    </div>
  );
};

export default UserName;
