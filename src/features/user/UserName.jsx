import { useSelector } from "react-redux";
import { getUserName } from "../../store/slices/userSlice";

const UserName = () => {
  const userName = useSelector(getUserName);

  if (!userName) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{userName}</div>
  );
};

export default UserName;
