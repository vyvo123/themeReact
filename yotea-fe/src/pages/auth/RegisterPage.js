import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signup } from "../../api/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { updateTitle } from "../../utils";

const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập Username"),
  fullName: yup.string().required("Vui lòng nhập họ tên"),
  phone: yup
    .string()
    .required("Vui lòng nhập sdt")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Số điện thoại không đúng định dạng"
    ),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(4, "Mật khẩu dài tối thiểu 4 ký tự"),
  confirm: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu")
    .test("is_confirm", "Mật khẩu xác nhận không chính xác", function (value) {
      const { password } = this.parent;
      return password === value;
    }),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không đúng định dạng"),
});

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const onSubmit = async (dataInput) => {
    try {
      await signup(dataInput);
      toast.success("Đăng ký tài khoản thành công");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    updateTitle("Đăng ký");
  }, []);

  return (
    <section className="container max-w-6xl mx-auto px-3">
      <h1 className="uppercase mt-8 font-semibold text-2xl text-gray-600">
        Đăng ký
      </h1>

      <form
        action=""
        className="mb-14"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-3">
          <label
            htmlFor="form__reg-username"
            className="font-semibold block mb-1"
          >
            Tên tài khoản *
          </label>
          <input
            type="text"
            {...register("username")}
            id="form__reg-username"
            className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
            placeholder="VD: demo..."
          />
          <div className="text-sm text-red-500 mt-0.5">
            {errors.username?.message}
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="form__reg-fullname"
            className="font-semibold block mb-1"
          >
            Họ và tên *
          </label>
          <input
            type="text"
            {...register("fullName")}
            id="form__reg-fullname"
            className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
            placeholder="VD: Tường Vy..."
          />
          <div className="text-sm text-red-500 mt-0.5">
            {errors.fullName?.message}
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="form__reg-email" className="font-semibold block mb-1">
            Email *
          </label>
          <input
            type="text"
            {...register("email")}
            id="form__reg-email"
            className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
            placeholder="VD: user@gmail.com..."
          />
          <div className="text-sm text-red-500 mt-0.5">
            {errors.email?.message}
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="form__reg-phone" className="font-semibold block mb-1">
            Số điện thoại *
          </label>
          <input
            type="text"
            {...register("phone")}
            id="form__reg-phone"
            className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
            placeholder="VD: 0347526xxx..."
          />
          <div className="text-sm text-red-500 mt-0.5">
            {errors.phone?.message}
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="form__reg-password"
            className="font-semibold block mb-1"
          >
            Mật khẩu *
          </label>
          <input
            type="password"
            {...register("password")}
            id="form__reg-password"
            className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
            placeholder="Mật khẩu"
          />
          <div className="text-sm text-red-500 mt-0.5">
            {errors.password?.message}
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="form__reg-confirm"
            className="font-semibold block mb-1"
          >
            Xác nhận mật khẩu *
          </label>
          <input
            type="password"
            {...register("confirm")}
            id="form__reg-confirm"
            className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
            placeholder="Nhập lại mật khẩu"
          />
          <div className="text-sm text-red-500 mt-0.5">
            {errors.confirm?.message}
          </div>
        </div>

        <button className="select-none mt-8 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
          Đăng ký
        </button>

        <p className="mt-1">
          Đã có tài khoản?
          <Link to="/login"> Đăng nhập ngay</Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;
