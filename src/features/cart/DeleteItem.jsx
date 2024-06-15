/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { deleteItem } from "../../store/slices/cartSlice";
import Button from "../../ui/Button";

const DeleteItem = ({ pizzaId }) => {
  const dispatch = useDispatch();

  return (
    <Button size={"small"} onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
};

export default DeleteItem;
