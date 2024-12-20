import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadFile } from "../../../utils";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import { selectAuth, updateAuth } from "../../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object().shape({
  fullName: yup.string().required("Vui lòng nhập họ tên"),
  username: yup.string().required("Vui lòng nhập username"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không đúng định dạng"),
  address: yup.string().required("Vui lòng nhập địa chỉ chi tiết"),
  phone: yup
    .string()
    .required("Vui lòng nhập sdt")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Số điện thoại không đúng định dạng"
    ),
});

const AdminUpdateInfoPage = () => {
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState();

  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (dataInput) => {
    try {
      if (typeof dataInput.avatar === "object" && dataInput.avatar.length) {
        dataInput.avatar = await uploadFile(dataInput.avatar[0]);
      }

      dispatch(updateAuth(dataInput));
      toast.success("Cập nhật tài khoản thành công");
    } catch (error) {
      toast.error("Cập nhật tài khoản không thành công");
    }
  };

  useEffect(() => {
    setLoading(true);
    setPreview(user.avatar);
  }, []);

  const handlePreview = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <header className="z-10 fixed top-14 left-0 md:left-60 right-0 px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <h5 className="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
            Profile
          </h5>
          <span>Cập nhật tài khoản</span>
        </div>
        <Link to="/admin/profile/change-password">
          <button
            type="button"
            className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Đổi mật khẩu
          </button>
        </Link>
      </header>

      <div className="p-6 mt-24 overflow-hidden">
        <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <span className="font-semibold mb-4 block text-xl">
                Thông tin tài khoản:
              </span>
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-6">
                  <label
                    htmlFor="form__update-account-fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    id="form__update-account-fullname"
                    className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập tên đầy đủ"
                  />
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.fullName?.message}
                  </div>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <label
                    htmlFor="form__update-account-username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    {...register("username")}
                    type="text"
                    id="form__update-account-username"
                    className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập username"
                  />
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.username?.message}
                  </div>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <label
                    htmlFor="form__update-account-phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    {...register("phone")}
                    id="form__update-account-phone"
                    className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập sdt"
                  />
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.phone?.message}
                  </div>
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="form__update-account-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    {...register("email")}
                    id="form__update-account-email"
                    className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập email"
                  />
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.email?.message}
                  </div>
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="form__update-account-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Địa chỉ hiện tại
                  </label>
                  <input
                    type="text"
                    {...register("address")}
                    id="form__update-account-address"
                    className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập thôn/xóm/TDP"
                  />
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.address?.message}
                  </div>
                </div>
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Xem trước ảnh
                  </label>
                  <div className="mt-1">
                    <img
                      src={preview}
                      alt="Preview Image"
                      id="form__update-account-preview"
                      className="h-40 w-40 rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Ảnh đại diện
                  </label>
                  <div className="w-full mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="form__update-account-avatar"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            {...register("avatar")}
                            onChange={(e) => handlePreview(e)}
                            id="form__update-account-avatar"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
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

      <Loading active={loading} />
    </>
  );
};

export default AdminUpdateInfoPage;
