/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import { getUserName } from "../../store/slices/userSlice";
import Button from "../../ui/Button";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const userName = useSelector(getUserName);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  // useEffect(() => {
  //   const timeOut = setTimeout(() => {
  //     if (userName) {
  //       navigate("/menu");
  //     } else {
  //       navigate("/");
  //     }
  //   }, 15000);

  //   return () => {
  //     clearTimeout(timeOut);
  //   };
  // }, [navigate, userName]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-10 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-2 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-2 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-slate-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="scrollbar-thin scrollbar-webkit max-h-72 divide-y divide-stone-200 overflow-y-auto border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      <div className="flex justify-end gap-4">
        <Button size={"primary"} to={"/"}>
          Home
        </Button>
        {!priority && <UpdateOrder order={order} />}
      </div>
    </div>
  );
}

export const loader = async ({ params }) => {
  const order = await getOrder(params.orderId);
  return order;
};

export default Order;
