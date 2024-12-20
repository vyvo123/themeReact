import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { add as addComment, get } from "../../api/comment";
import { checkUserRating, add as AddRating, update } from "../../api/rating";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

const schema = yup.object().shape({
  star: yup.mixed().required("Vui lòng chọn mức đánh giá"),
  content: yup.string().required("Vui lòng nhập nội dung bình luận"),
});

const CommentProduct = ({ productId, onReRender, productData }) => {
  const { user } = useSelector(selectAuth);
  const [emptyCmt, setEmptyCmt] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ star: ratingNumber, content }) => {
    try {
      // check user rating
      const { data } = await checkUserRating(user._id, productId);
      if (!data.length) {
        AddRating({
          userId: user._id,
          productId,
          ratingNumber,
        });
      } else {
        update({
          _id: data[0]["_id"],
          ratingNumber,
        });
      }

      addComment({
        productId,
        userId: user._id,
        content,
      })
        .then(() => toast.success("Bình luận thành công"))
        .then(() => reset())
        .then(() => onReRender((prev) => !prev));
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  useEffect(() => {
    const getCmt = async () => {
      const { data } = await get(productId);
      setEmptyCmt(!data.length ? true : false);
    };
    productId && getCmt();
  }, [productId]);

  return (
    <div>
      <h2 className="mt-3 font-semibold text-xl">Đánh giá</h2>
      {emptyCmt && <p>Chưa có đánh giá nào</p>}

      <form
        action=""
        className="px-3 py-2 border-2 border-[#D9A953] mt-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-semibold text-xl">
          {emptyCmt
            ? `Hãy là người đầu tiên nhận xét "${productData?.name}"`
            : `Nhận xét về "${productData?.name}"`}
        </h2>

        <div className="mt-2">
          <label className="block text-sm font-semibold">
            Đánh giá của bạn *
          </label>
          <div className="stars">
            <input
              type="radio"
              {...register("star")}
              hidden
              className="form__comment-star-number"
              id="star-5"
              value="5"
            />
            <label htmlFor="star-5" title="5 sao" className="star__item">
              <FontAwesomeIcon icon={faStar} />
            </label>
            <input
              type="radio"
              {...register("star")}
              hidden
              className="form__comment-star-number"
              id="star-4"
              value="4"
            />
            <label htmlFor="star-4" title="4 sao" className="star__item">
              <FontAwesomeIcon icon={faStar} />
            </label>
            <input
              type="radio"
              {...register("star")}
              hidden
              className="form__comment-star-number"
              id="star-3"
              value="3"
            />
            <label htmlFor="star-3" title="3 sao" className="star__item">
              <FontAwesomeIcon icon={faStar} />
            </label>
            <input
              type="radio"
              {...register("star")}
              hidden
              className="form__comment-star-number"
              id="star-2"
              value="2"
            />
            <label htmlFor="star-2" title="2 sao" className="star__item">
              <FontAwesomeIcon icon={faStar} />
            </label>
            <input
              type="radio"
              {...register("star")}
              hidden
              className="form__comment-star-number"
              id="star-1"
              value="1"
            />
            <label htmlFor="star-1" title="1 sao" className="star__item">
              <FontAwesomeIcon icon={faStar} />
            </label>
          </div>
          <div className="text-sm mt-0.5 text-red-500">
            {errors.star?.message}
          </div>
        </div>

        <div className="mt-2">
          <label
            htmlFor="form__comment-content"
            className="block text-sm font-semibold"
          >
            Nhận xét của bạn
          </label>
          <textarea
            {...register("content")}
            id="form__comment-content"
            cols={30}
            rows={10}
            className="w-full outline-none border mt-1 px-3 py-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc]"
            placeholder="Nhập nội dung bình luận"
          ></textarea>
          <div className="text-sm mt-0.5 text-red-500">
            {errors.content?.message}
          </div>
        </div>

        <button className="my-3 px-4 py-2 bg-[#D9A953] font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
          Gửi đi
        </button>
      </form>
    </div>
  );
};

export default CommentProduct;
