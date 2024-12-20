import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateTitle, uploadFile } from "../../../utils";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import { selectAuth, updateMyAccount } from "../../../redux/authSlice";

const schema = yup.object().shape({
  fullName: yup.string().required("Vui lòng nhập họ tên"),
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

const UpdateInfoPage = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(
    "https://res.cloudinary.com/levantuan/image/upload/v1644302455/assignment-js/thumbnail-image-vector-graphic-vector-id1147544807_ochvyr.jpg"
  );

  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    updateTitle("Cập nhật tài khoản");
    const start = async () => {
      setLoading(true);

      setPreview(user.avatar);
      reset({
        ...user,
      });
      setLoading(false);
    };
    start();
  }, []);

  const handlePreview = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (dataInput) => {
    try {
      if (typeof dataInput.avatar === "object" && dataInput.avatar.length) {
        dataInput.avatar = await uploadFile(dataInput.avatar[0]);
      }

      dispatch(updateMyAccount(dataInput));
      toast.success("Cập nhật tài khoản thành công");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  return (
    <>
      <h2 className="uppercase text-lg font-semibold text-gray-600 pb-1 border-b">
        Cập nhật thông tin tài khoản
      </h2>
      <form action="" className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-6">
            <label
              htmlFor="form__update-account-fullname"
              className="mb-1 block font-semibold"
            >
              Họ tên *
            </label>
            <input
              type="text"
              {...register("fullName")}
              id="form__update-account-fullname"
              className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
              placeholder="Nhập họ tên"
            />
            <div className="text-sm mt-0.5 text-red-500">
              {errors.fullName?.message}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <label
              htmlFor="form__update-account-phone"
              className="mb-1 block font-semibold"
            >
              Số điện thoại *
            </label>
            <input
              {...register("phone")}
              type="text"
              id="form__update-account-phone"
              className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
              placeholder="Nhập họ tên"
            />
            <div className="text-sm mt-0.5 text-red-500">
              {errors.phone?.message}
            </div>
          </div>
          <div className="col-span-12">
            <label
              htmlFor="form__update-account-avatar"
              className="mb-1 block font-semibold"
            >
              Ảnh đại diện *
            </label>
            <input
              type="file"
              {...register("avatar")}
              onChange={(e) => handlePreview(e)}
              id="form__update-account-avatar"
              className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 py-1 text-sm outline-none"
            />
          </div>
          <div className="col-span-12">
            <label className="mb-1 block font-semibold">
              Xem trước ảnh đại diện
            </label>
            <div>
              <img
                src={preview}
                id="form__update-account-preview"
                className="w-40 h-40 object-cover rounded-md"
                alt=""
              />
            </div>
          </div>
          <div className="col-span-12 mb-3">
            <label
              htmlFor="form__update-account-email"
              className="font-semibold mb-1 block"
            >
              Email *
            </label>
            <input
              type="text"
              {...register("email")}
              id="form__update-account-email"
              className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
              placeholder="Nhập địa chỉ email"
            />
            <div className="text-sm mt-0.5 text-red-500">
              {errors.email?.message}
            </div>
          </div>
          <div className="col-span-12 mb-3">
            <label
              htmlFor="form__update-account-add"
              className="font-semibold mb-1 block"
            >
              Địa chỉ cụ thể *
            </label>
            <input
              type="text"
              {...register("address")}
              id="form__update-account-add"
              className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
              placeholder="Nhập Thôn/Xóm/TDP"
            />
            <div className="text-sm mt-0.5 text-red-500">
              {errors.address?.message}
            </div>
          </div>
        </div>
        <button className="mt-4 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
          Cập nhật
        </button>
      </form>

      <Loading active={loading} />
    </>
  );
};

export default UpdateInfoPage;
