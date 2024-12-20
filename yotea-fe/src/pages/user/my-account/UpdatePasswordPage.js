import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkPassword } from "../../../api/auth";
import { updateMyInfo } from "../../../api/user";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { updateTitle } from "../../../utils";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/authSlice";

const UpdatePasswordPage = () => {
  const { user } = useSelector(selectAuth);

  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu hiện tại")
      .test(
        "is_confirm",
        "Mật khẩu hiện tại không chính xác",
        async function (value) {
          try {
            const { data } = await checkPassword({
              _id: user._id,
              password: value,
            });
            if (data.success) return true;
          } catch (error) {
            console.log({ error });
          }

          return false;
        }
      ),
    newPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu mới")
      .min(4, "Vui lòng nhập mật khẩu tối thiểu 4 ký tự"),
    confirmPassword: yup
      .string()
      .required("Vui lòng xác nhận mật khẩu")
      .test(
        "is_confirm",
        "Mật khẩu xác nhận không chính xác",
        function (value) {
          const { newPassword } = this.parent;

          return newPassword === value;
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (dataInput) => {
    try {
      await updateMyInfo({ _id: user._id, password: dataInput.newPassword });
      toast.success("Cập nhật mật khẩu thành công");
      reset();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
  };

  useEffect(() => {
    updateTitle("Đổi mật khẩu");
  }, []);

  return (
    <>
      <h2 className="uppercase text-lg font-semibold text-gray-600 pb-1 border-b">
        Đổi mật khẩu
      </h2>

      <form action="" className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12">
            <label
              htmlFor="form__change-pass-current-pass"
              className="mb-1 block font-semibold"
            >
              Mật khẩu cũ *
            </label>
            <input
              type="password"
              {...register("oldPassword")}
              id="form__change-pass-current-pass"
              className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
              placeholder="Nhập mật khẩu hiện tại"
            />
            <div className="text-sm mt-0.5 text-red-500">
              {errors.oldPassword?.message}
            </div>
          </div>
          <div className="col-span-12">
            <label
              htmlFor="form__change-pass-new-pass"
              className="mb-1 block font-semibold"
            >
              Mật khẩu mới *
            </label>
            <input
              type="password"
              {...register("newPassword")}
              id="form__change-pass-new-pass"
              className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
              placeholder="Nhập mật khẩu mới"
            />
            <div className="text-sm mt-0.5 text-red-500">
              {errors.newPassword?.message}
            </div>
          </div>
          <div className="col-span-12">
            <label
              htmlFor="form__change-pass-confirm"
              className="mb-1 block font-semibold"
            >
              Xác nhận mật khẩu mới *
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              id="form__change-pass-confirm"
              className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
              placeholder="Xác nhận mật khẩu mới"
            />
            <div className="text-sm mt-0.5 text-red-500">
              {errors.confirmPassword?.message}
            </div>
          </div>
        </div>

        <button className="mt-4 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
          Đổi mật khẩu
        </button>
      </form>
    </>
  );
};

export default UpdatePasswordPage;
