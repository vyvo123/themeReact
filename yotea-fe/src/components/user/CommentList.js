import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";
import Swal from "sweetalert2";
import { get as getCmt, remove as deleteCmt } from "../../api/comment";
import { get as getRating } from "../../api/rating";
import { formatDateNews } from "../../utils";
import Pagination from "./Pagination";

const CommentList = ({
  productId,
  reRender: productDetailRerender,
  slug,
  page,
}) => {
  const [comments, setComments] = useState();
  const { user } = useSelector(selectAuth);
  const [reRender, setRerender] = useState(false);
  const [totalCmt, setTotalCmt] = useState(0);

  const limit = 4;
  const totalPage = Math.ceil(totalCmt / limit);
  page = page < 1 ? 1 : page > totalPage ? totalPage : page;
  const start = (page - 1) * limit > 0 ? (page - 1) * limit : 0;

  useEffect(() => {
    const getComments = async () => {
      const { data } = await getCmt(productId);
      setTotalCmt(data.length);

      const { data: dataComment } = await getCmt(productId, start, limit);
      const { data: dataRating } = await getRating(productId);

      const commentJoinRating = dataComment.map((cmt) => {
        const rating = dataRating.find(
          (item) => item.userId === cmt.userId._id
        );

        return {
          cmtId: cmt._id,
          ratingId: rating._id,
          userId: cmt.userId._id,
          userAvatar: cmt.userId.avatar,
          content: cmt.content,
          createdAt: cmt.createdAt,
          fullName: cmt.userId.fullName,
          rating: rating.ratingNumber,
        };
      });

      setComments(commentJoinRating);
    };
    productId && getComments();
  }, [productId, reRender, productDetailRerender, page]);

  const handleRemoveCmt = async (cmtId) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa bình luận này?",
      text: "Không thể hoàn tác sau khi xóa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCmt(cmtId).then(() => {
          setRerender(!reRender);
          Swal.fire("Thành công!", "Bình luận đã bị xóa.", "success");
        });
      }
    });
  };

  // render star
  const renderStar = (ratingNumber) => {
    const ratingArr = [];
    for (let i = 0; i < ratingNumber; i++) {
      ratingArr.push(
        <div className="text-yellow-400" key={i}>
          <FontAwesomeIcon icon={faStar} />
        </div>
      );
    }

    for (let i = 0; i < 5 - ratingNumber; i++) {
      ratingArr.push(
        <div className="text-gray-300" key={i + 5}>
          <FontAwesomeIcon icon={faStar} />
        </div>
      );
    }

    return ratingArr;
  };

  return (
    <div>
      <ul className="mt-4 grid grid-cols-1 divide-y divide-dashed">
        {comments?.map((item, index) => (
          <li className="flex py-4" key={index}>
            <img
              src={item.userAvatar}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-2">
              <div className="flex text-xs mb-0.5">
                {renderStar(item.rating)}
              </div>
              <div>
                <span className="font-semibold">{item.fullName}</span>
                <span className="text-sm text-gray-500">
                  {" "}
                  ({formatDateNews(item.createdAt)})
                </span>
              </div>
              <p className="text-gray-500">{item.content}</p>
              <ul className="text-gray-500 flex text-sm mt-1">
                {user && (item.userId === user._id || user.role) ? (
                  <li
                    onClick={() => handleRemoveCmt(item.cmtId)}
                    className="btn-remove transition hover:text-black cursor-pointer"
                  >
                    Xóa
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        page={page || 1}
        totalPage={totalPage}
        url={`san-pham/${slug}`}
      />
    </div>
  );
};

export default CommentList;
