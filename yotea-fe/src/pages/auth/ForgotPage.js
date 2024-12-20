import { useEffect } from "react";
import { updateTitle } from "../../utils";

const ForgotPage = () => {
  useEffect(() => {
    updateTitle("Quên mật khẩu");
  }, []);

  return (
    <section className="container max-w-6xl mx-auto px-3 min-h-[calc(100vh-478px)]">
      <p className="mt-8 text-gray-600">
        Quên mật khẩu? Vui lòng nhập địa chỉ email. Bạn sẽ nhận được một liên
        kết tạo mật khẩu mới qua email.
      </p>

      <form action="" className="mb-14" id="form__forgot">
        <div className="mt-3">
          <label
            htmlFor="form__forgot-email"
            className="font-semibold block mb-1"
          >
            Email *
          </label>
          <input
            type="text"
            id="form__forgot-email"
            className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
            placeholder="Nhập địa chỉ email"
          />
        </div>

        <button className="select-none mt-8 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
          Đặt lại mật khẩu
        </button>
      </form>
    </section>
  );
};

export default ForgotPage;
