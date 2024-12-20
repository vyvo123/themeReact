import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { checkPassword } from "../../../api/auth";
import { update } from "../../../api/user";
import { toast } from "react-toastify";
import { selectAuth } from "../../../redux/authSlice";
import { useSelector } from "react-redux";

const AdminUpdatePassword = () => {
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
      await update({ _id: user._id, password: dataInput.newPassword });
      toast.success("Cập nhật mật khẩu thành công");
      reset();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <>
      <header className="z-10 fixed top-14 left-0 md:left-60 right-0 px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <h5 className="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
            Profile
          </h5>
          <span>Đổi mật khẩu</span>
        </div>
        <Link to="/admin/profile">
          <button
            type="button"
            className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cập nhật tài khoản
          </button>
        </Link>
      </header>

      <div className="p-6 mt-24 overflow-hidden">
        <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <span className="font-semibold mb-4 block text-xl">
                Thông tin chi tiết tài khoản:
              </span>
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-6">
                  <label
                    htmlFor="form__change-pass-current-pass"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    {...register("oldPassword")}
                    id="form__change-pass-current-pass"
                    className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.oldPassword?.message}
                  </div>
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="form__change-pass-new-pass"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    {...register("newPassword")}
                    id="form__change-pass-new-pass"
                    className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập mật khẩu mới"
                  />
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.newPassword?.message}
                  </div>
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="form__change-pass-confirm"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    id="form__change-pass-confirm"
                    className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Xác nhận mật khẩu mới"
                  />
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.confirmPassword?.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {" "}
                Lưu thay đổi{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminUpdatePassword;
