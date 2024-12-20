import { faLongArrowAltLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency, updateTitle } from "../../../utils";
import Swal from "sweetalert2";
import CartNav from "../../../components/user/CartNav";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemCart,
  selectCart,
  updateQuantity,
} from "../../../redux/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [cartQnt, setCartQnt] = useState([]);
  const [disableBtnUpdate, setDisableBtnUpdate] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // get id + quantity
    const getCartQuantity = () => {
      const listIdQnt = cart.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
        };
      });

      setCartQnt(listIdQnt);
    };
    getCartQuantity();

    const getTotalPrice = () => {
      setTotalPrice(() => {
        return cart.reduce((total, cart) => {
          return total + cart.productPrice * cart.quantity;
        }, 0);
      });
    };
    getTotalPrice();
  }, [cart, totalPrice]);

  useEffect(() => {
    updateTitle("Giỏ hàng");
  }, []);

  const handleUpdateQuantity = (cartId, e) => {
    setDisableBtnUpdate(false);

    const qnt = +e.target.value;
    if (isNaN(qnt)) {
      toast.info("Vui lòng nhập số");
    } else {
      setCartQnt((prev) => {
        return prev?.map((item) =>
          item.id === cartId
            ? {
                id: item.id,
                quantity: qnt,
              }
            : item
        );
      });
    }
  };

  const increaseQnt = (cartId) => {
    setDisableBtnUpdate(false);

    setCartQnt((prev) => {
      return prev?.map((item) =>
        item.id === cartId
          ? {
              id: item.id,
              quantity: item.quantity + 1,
            }
          : item
      );
    });
  };

  const decreaseQnt = (cartId) => {
    setDisableBtnUpdate(false);

    setCartQnt((prev) => {
      return prev?.map((item) =>
        item.id === cartId
          ? {
              id: item.id,
              quantity: item.quantity - 1 <= 0 ? 1 : item.quantity - 1,
            }
          : item
      );
    });
  };

  const handleUpdateQnt = () => {
    if (!disableBtnUpdate) {
      dispatch(updateQuantity(cartQnt));
      toast.success("Cập nhật thành công");
      setDisableBtnUpdate(true);
    }
  };

  const handleRemoveCart = (cartId) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      text: "Bạn không thể hoàn tác sau khi xóa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItemCart(cartId));
        Swal.fire("Thành công!", "Sản phẩm đã bị xóa.", "success");
      }
    });
  };

  return (
    <>
      <CartNav page="list" />

      <section className="container max-w-6xl mx-auto px-3 mt-10 grid grid-cols-12 mb-9">
        {cart.length ? (
          <>
            <form
              action=""
              method="POST"
              id="cart__detail-form"
              className="col-span-12 lg:col-span-8 lg:pr-6"
            >
              <table
                className="table-auto w-full text-left border-collapse"
                id="cart__detail"
              >
                <thead>
                  <tr className="uppercase border-b-2">
                    <th
                      className="pb-1 uppercase text-sm text-gray-500"
                      colSpan={3}
                    >
                      Sản phẩm
                    </th>
                    <th className="pb-1 uppercase text-sm text-gray-500">
                      Giá
                    </th>
                    <th className="pb-1 uppercase text-sm text-gray-500">
                      Số lượng
                    </th>
                    <th className="pb-1 uppercase text-sm text-gray-500 text-right">
                      Tạm tính
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr className="border-b" key={index}>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleRemoveCart(item.id)}
                          className="p-2 text-gray-400 text-xl transition ease-linear duration-200 hover:text-black"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </td>
                      <td className="p-2">
                        <Link to={`/san-pham/${item.productSlug}`}>
                          <img
                            className="block w-16 object-cover"
                            src={item.productImage}
                            alt=""
                          />
                        </Link>
                      </td>
                      <td className="p-2">
                        <Link
                          to={`/san-pham/${item.productSlug}`}
                          className="font-semibold"
                        >
                          {item.productName}
                        </Link>
                        <div className="text-sm">
                          <p>Đá: {item.ice}%</p>
                          <p>Đường: {item.sugar}%</p>
                        </div>
                      </td>
                      <td className="font-bold">
                        {formatCurrency(item.productPrice)}
                      </td>
                      <td className="p-2">
                        {cartQnt?.map((cartItem, cartIndex) => {
                          if (cartItem.id === item.id) {
                            return (
                              <div
                                className="flex items-center h-9"
                                key={cartIndex}
                              >
                                <button
                                  type="button"
                                  onClick={() => decreaseQnt(item.id)}
                                  className="px-2 bg-gray-100 border-gray-200 h-full border-l border-y transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  className="border border-gray-200 h-full w-10 text-center outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc]"
                                  value={cartItem.quantity}
                                  onChange={(e) =>
                                    handleUpdateQuantity(item.id, e)
                                  }
                                />
                                <button
                                  onClick={() => increaseQnt(item.id)}
                                  type="button"
                                  className="px-2 bg-gray-100 border-gray-200 h-full border-r border-y transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"
                                >
                                  +
                                </button>
                              </div>
                            );
                          }
                        })}
                      </td>
                      <td className="font-bold text-right">
                        {formatCurrency(item.productPrice * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="flex mt-6 items-center">
                <li>
                  <Link to="/thuc-don">
                    <button
                      type="button"
                      className="select-none uppercase h-8 text-[#D9A953] font-semibold text-sm border-[#D9A953] border-2 px-3 transition ease-linear duration-300 hover:bg-[#D9A953] hover:text-white"
                    >
                      <FontAwesomeIcon icon={faLongArrowAltLeft} />
                      <span> Tiếp tục xem sản phẩm</span>
                    </button>
                  </Link>
                </li>
                <li className="ml-2">
                  <button
                    type="button"
                    id="btn-cart-update"
                    disabled={disableBtnUpdate}
                    onClick={() => handleUpdateQnt()}
                    className="cursor-pointer select-none uppercase bg-[#D9A953] px-3 h-8 font-semibold text-sm text-white transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"
                  >
                    Cập nhật giỏ hàng
                  </button>
                </li>
              </ul>
            </form>
            <div className="mt-8 lg:mt-0 col-span-12 lg:col-span-4 lg:border-l lg:pl-6">
              <table className="table-fixed w-full text-left">
                <thead>
                  <tr className="uppercase border-b-2">
                    <th className="pb-1 text-sm text-gray-500" colSpan={2}>
                      Cộng giỏ hàng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td>Tạm tính</td>
                    <td className="py-2 text-right font-semibold">
                      {formatCurrency(totalPrice)}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td>Tổng</td>
                    <td className="py-2 text-right font-semibold">
                      {formatCurrency(totalPrice)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Link to="/checkout">
                <button className="mt-4 w-full px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
                  Tiến hành thanh toán
                </button>
              </Link>
            </div>
          </>
        ) : (
          <section className="text-center col-span-12 py-12">
            <p>Chưa có sản phẩm nào trong giỏ hàng</p>
            <Link to="/thuc-don" className="block mt-4">
              <button className="uppercase h-8 text-[#D9A953] font-semibold text-sm border-[#D9A953] border-2 px-3 transition ease-linear duration-300 hover:bg-[#D9A953] hover:text-white">
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
                <span> Tiếp tục mua hàng</span>
              </button>
            </Link>
          </section>
        )}
      </section>
    </>
  );
};

export default CartPage;
