import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { get, remove } from "../../api/comment";
import { formatDate } from "../../utils";

const AdminCommentList = ({ onSetTotal, start, limit }) => {
  const [comments, setComments] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getComment = async () => {
      const { data } = await get(id);
      onSetTotal(data.length);

      const { data: listComment } = await get(id, start, limit);
      setComments(listComment);
    };
    getComment();
  }, [start]);

  const handleRemoveCmt = async (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa không?",
      text: "Bạn không thể hoàn tác sau khi xóa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        remove(id)
          .then(() => {
            Swal.fire("Thành công!", "Đã xóa thành công.", "success");
          })
          .then(() =>
            setComments((prev) => prev?.filter((item) => item._id !== id))
          );
      }
    });
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {" "}
            STT{" "}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {" "}
            Người bình luận{" "}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {" "}
            Nội dung{" "}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {" "}
            Thời gian bình luận{" "}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {" "}
            Actions{" "}
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {comments?.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {++index + start}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={item.userId.avatar}
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {item.userId.fullName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.userId.email}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.content}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
              {formatDate(item.createdAt)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => handleRemoveCmt(item._id)}
                className="btn-remove h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminCommentList;
