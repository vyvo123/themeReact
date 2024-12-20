import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getByUserId } from "../../../api/order";
import Pagination from "../../../components/user/Pagination";
import { selectAuth } from "../../../redux/authSlice";
import { formatCurrency, formatDate, updateTitle } from "../../../utils";

const MyCartPage = () => {
  const [orders, setOrders] = useState();
  const [totalOrder, setTotalOrder] = useState(0);
  const { user } = useSelector(selectAuth);

  const { page } = useParams();

  const limit = 10;
  const totalPage = Math.ceil(totalOrder / limit);
  let currentPage = Number(page) || 1;
  currentPage =
    currentPage < 1 ? 1 : currentPage > totalPage ? totalPage : currentPage;
  const start = (currentPage - 1) * limit > 0 ? (currentPage - 1) * limit : 0;

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await getByUserId(user._id);
      setTotalOrder(data.length);
      const { data: ordersData } = await getByUserId(user._id, start, limit);
      setOrders(ordersData);
    };
    getOrders();
  }, [currentPage]);

  useEffect(() => {
    updateTitle("Đơn hàng của tôi");
  }, []);

  return (
    <>
      <form action="" className="flex" id="cart__form-search">
        <input
          type="text"
          id="cart__form-search-key"
          className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] flex-1 border px-2 h-10 text-sm outline-none"
          placeholder="Nhập mã đơn hàng hoặc tên khách hàng"
        />
        <select
          id="cart__form-search-stt"
          className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] border px-2 h-10 text-sm outline-none"
        >
          <option value="">-- Trạng thái --</option>
          <option value={0}>Chờ xác nhận </option>
          <option value={1}>Đã xác nhận</option>
          <option value={2}>Đang giao hàng</option>
          <option value={3}>Đã giao hoàng</option>
          <option value={4}>Đã hủy</option>
        </select>
      </form>
      <table className="mt-3 text-gray-600 w-full text-left">
        <thead>
          <tr>
            <th className="pb-1 border-b-2 uppercase text-sm">STT</th>
            <th className="pb-1 border-b-2 uppercase text-sm">
              Tên người nhận
            </th>
            <th className="pb-1 border-b-2 uppercase text-sm">Ngày đặt</th>
            <th className="pb-1 border-b-2 uppercase text-sm">Tổng giá trị</th>
            <th className="pb-1 border-b-2 uppercase text-sm">Trạng thái</th>
            <th className="pb-1 border-b-2 uppercase text-sm text-right">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody id="cart__list">
          {orders?.map((item, index) => (
            <tr className="border-b" key={index}>
              <td>{++index + start}</td>
              <td className="py-2">{item.customerName}</td>
              <td className="py-2">{formatDate(item.createdAt || "")}</td>
              <td className="py-2">
                {formatCurrency(
                  item.totalPrice - item.priceDecrease > 0
                    ? item.totalPrice - item.priceDecrease
                    : 0
                )}
              </td>
              <td className="py-2">
                <label
                  className={`${
                    item.status !== 4
                      ? "bg-[#E1F0FF] text-[#3699FF]"
                      : "bg-[#FFE2E5] text-[#F64E60]"
                  } px-1 py-0.5 text-sm rounded-[4px] font-medium`}
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
                </label>
              </td>
              <td className="py-2 text-right">
                <Link to={`/my-account/cart/${item._id}`}>
                  <button className="px-3 py-1.5 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        page={Number(currentPage) || 1}
        totalPage={totalPage}
        url="my-account/cart"
      />
    </>
  );
};

export default MyCartPage;
