import {
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CartNav from "../../../components/user/CartNav";
import { updateTitle } from "../../../utils";

const ThankPage = () => {
  useEffect(() => {
    updateTitle("Đặt hàng thành công");
  }, []);

  return (
    <div className="mb-32">
      <CartNav page="thank-you" />

      <section className="container max-w-6xl mx-auto">
        <h1 className="text-center mt-4 font-semibold text-2xl uppercase">
          Đặt hàng thành công
        </h1>

        <p className="text-center mt-2">
          Cảm ơn bạn đã đặt hàng của Tea House. Nhân viên sẽ gọi điện từ số điện
          thoại bạn đã cung cấp để Confirm (Xác nhận) lại với bạn trong thời
          gian sớm nhất để xác nhận đơn hàng.
        </p>

        <div className="flex items-center justify-center mt-2">
          <Link to="/thuc-don">
            <button className="uppercase h-8 text-[#D9A953] font-semibold text-sm border-[#D9A953] border-2 px-3 transition ease-linear duration-300 hover:bg-[#D9A953] hover:text-white">
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
              <span> Tiếp tục mua hàng</span>
            </button>
          </Link>
          <Link to={`/my-account/cart`} className="ml-2">
            <button className="uppercase h-8 text-[#D9A953] font-semibold text-sm border-[#D9A953] border-2 px-3 transition ease-linear duration-300 hover:bg-[#D9A953] hover:text-white">
              <span>Kiểm tra đơn hàng </span>
              <FontAwesomeIcon icon={faLongArrowAltRight} />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ThankPage;
