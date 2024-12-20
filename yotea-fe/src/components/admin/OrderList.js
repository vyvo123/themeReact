import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../../api/order";
import { formatCurrency, formatDate } from "../../utils";

const OrderList = ({ onSetTotal, start, limit }) => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await getAll();

      onSetTotal(data.length);

      const { data: orderList } = await getAll(start, limit);
      setOrders(orderList);
    };
    getOrders();
  }, [start]);

  return (
    <table
      className="min-w-full divide-y divide-gray-200"
      id="cate__list-table"
    >
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            STT
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {" "}
            ID{" "}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {" "}
            Customer{" "}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {" "}
            Tổng tiền{" "}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {" "}
            Trạng thái{" "}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {" "}
            Thời gian đặt{" "}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {" "}
            Actions{" "}
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200" id="cart__list">
        {orders?.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {++index + start}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item._id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div className="text-sm font-medium text-gray-900">
                {item.customerName}
              </div>
              <div className="text-sm text-gray-500">{item.phone}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {formatCurrency(
                item.totalPrice - item.priceDecrease > 0
                  ? item.totalPrice - item.priceDecrease
                  : 0
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`${
                  item.status !== 4
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                } px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
              >
                {!item.status
                  ? "Đơn hàng mới"
                  : item.status === 1
                  ? "Đã xác nhận"
                  : item.status === 2
                  ? "Đang giao hàng"
                  : item.status === 3
                  ? "Đã giao hàng"
                  : "Đã hủy"}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
              {formatDate(item.createdAt || "")}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Link
                to={`/admin/cart/${item._id}/detail`}
                className="h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Detail
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
