/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

const UpdateOrder = ({ order }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="patch">
      <Button size={"primary"}>Make Priority</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

export const action = async ({ request, params }) => {
  const updatedData = { priority: true };

  await updateOrder(params.orderId, updatedData);
  return null;
};
