import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "../../../api/slider";
import { uploadFile } from "../../../utils";
import { useDispatch } from "react-redux";
import { updateSlider } from "../../../redux/sliderSlice";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập tên slide"),
  url: yup.string().required("Vui lòng nhập Url slide"),
  status: yup.string().required("Vui lòng chọn trạng thái slide"),
});

const EditSlidePage = () => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (typeof data.image === "object" && data.image.length) {
        data.image = await uploadFile(data.image[0]);
      }

      dispatch(updateSlider(data));

      toast.success("Cập nhật slide thành công");
      navigate("/admin/slider");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  const handlePreview = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    // get data
    (async () => {
      const { data } = await get(id);
      setPreview(data.image);
      reset(data);
    })();
  }, []);

  return (
    <>
      <header className="z-10 fixed top-14 left-0 md:left-60 right-0 px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <h5 className="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
            Slider
          </h5>
          <span>Cập nhật Slide</span>
        </div>
        <Link to="/admin/slider">
          <button
            type="button"
            className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            DS Slide
          </button>
        </Link>
      </header>

      <div className="p-6 mt-24 overflow-hidden">
        <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <span className="font-semibold mb-4 block text-xl">
                Thông tin chi tiết slider:
              </span>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="form__add-slider-title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên slider
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    id="form__add-slider-title"
                    className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập tên slide"
                  />
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.title?.message}
                  </div>
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="form__add-slider-url"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Url slider
                  </label>
                  <input
                    type="text"
                    {...register("url")}
                    id="form__add-slider-url"
                    className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập url slide"
                  />
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.url?.message}
                  </div>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <label
                    htmlFor="form__add-slider-stt"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Trạng thái
                  </label>
                  <select
                    {...register("status")}
                    id="form__add-slider-stt"
                    defaultValue={0}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">-- Chọn trạng thái slide --</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Hiển thị</option>
                  </select>
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.status?.message}
                  </div>
                </div>
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Xem trước ảnh
                  </label>
                  <div className="mt-1">
                    <img
                      src={
                        preview ||
                        "https://res.cloudinary.com/levantuan/image/upload/v1644302455/assignment-js/thumbnail-image-vector-graphic-vector-id1147544807_ochvyr.jpg"
                      }
                      alt="Preview Img"
                      className="h-60 w-full object-cover rounded-md"
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Ảnh slider
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
                          htmlFor="form__add-slider-img"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            {...register("image")}
                            onChange={(e) => handlePreview(e)}
                            id="form__add-slider-img"
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
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.image?.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cập nhật Slider
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditSlidePage;
