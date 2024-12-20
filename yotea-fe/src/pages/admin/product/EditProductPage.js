import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get, useUpdateProductMutation } from "../../../api/product";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadFile } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getCates,
  selectCatesProduct,
} from "../../../redux/categoryProductSlice";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên sản phẩm"),
  price: yup
    .string()
    .required("Vui lòng nhập giá sản phẩm")
    .test("min", "Vui lòng nhập lại giá SP", (value) => Number(value) >= 0),
  description: yup.string().required("Vui lòng nhập mô tả SP"),
  categoryId: yup.string().required("Vui lòng chọn danh mục SP"),
  status: yup.number().required("Vui lòng chọn trạng thái SP"),
});

const EditProductPage = () => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState();
  const categories = useSelector(selectCatesProduct);
  const [updateProduct] = useUpdateProductMutation();

  const { slug } = useParams();

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

      updateProduct(data)
        .unwrap()
        .then(() => {
          toast.success("Cập nhật SP thành công");
          navigate("/admin/product");
        });
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  const handlePreview = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    dispatch(getCates());

    const getProduct = async () => {
      const { data } = await get(slug);
      setPreview(data.image);
      reset({
        ...data,
        categoryId: data.categoryId?._id,
      });
    };
    getProduct();
  }, []);

  return (
    <>
      <header className="z-10 fixed top-14 left-0 md:left-60 right-0 px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <h5 className="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
            Products
          </h5>
          <span>Cập nhật SP</span>
        </div>
        <Link to="/admin/product">
          <button
            type="button"
            className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            DS SP
          </button>
        </Link>
      </header>

      <div className="p-6 mt-24 overflow-hidden">
        <form
          action=""
          id="form__add-product"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <span className="font-semibold mb-4 block text-xl">
                Thông tin chi tiết sản phẩm:
              </span>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="form__add-product-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    id="form__add-product-name"
                    className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập tên sản phẩm"
                  />
                  <div className="error-desc text-sm mt-0.5 text-red-500">
                    {errors.name?.message}
                  </div>
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="form__add-product-price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Giá sản phẩm
                  </label>
                  <input
                    type="number"
                    {...register("price")}
                    id="form__add-product-price"
                    className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập giá sản phẩm"
                  />
                  <div className="error-desc text-sm mt-0.5 text-red-500">
                    {errors.price?.message}
                  </div>
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="form__add-product-description"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Mô tả
                  </label>
                  <textarea
                    id="form__add-product-description"
                    rows={3}
                    className="py-2 px-3 focus:outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Nhập mô tả sản phẩm"
                    defaultValue={""}
                    {...register("description")}
                  />
                  <div className="error-desc text-sm mt-0.5 text-red-500">
                    {errors.description?.message}
                  </div>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <label
                    htmlFor="form__add-product-cate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Danh mục sản phẩm
                  </label>
                  <select
                    id="form__add-product-cate"
                    {...register("categoryId")}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">-- Chọn danh mục sản phẩm --</option>
                    {categories?.map((cate, index) => (
                      <option key={index} value={cate._id}>
                        {cate.name}
                      </option>
                    ))}
                  </select>
                  <div className="error-desc text-sm mt-0.5 text-red-500">
                    {errors.categoryId?.message}
                  </div>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <label
                    htmlFor="form__add-product-stt"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Trạng thái
                  </label>
                  <select
                    id="form__add-product-stt"
                    {...register("status")}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">-- Chọn trạng thái sản phẩm --</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Hiển thị</option>
                  </select>
                  <div className="error-desc text-sm mt-0.5 text-red-500">
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
                      alt="Preview Image"
                      id="form__add-product-preview"
                      className="h-60 w-full object-cover rounded-md"
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Ảnh sản phẩm
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
                          htmlFor="form__add-product-image"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            {...register("image")}
                            onChange={(e) => handlePreview(e)}
                            id="form__add-product-image"
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
                  <div className="error-image text-sm mt-0.5 text-red-500" />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cập nhật sản phẩm
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProductPage;
