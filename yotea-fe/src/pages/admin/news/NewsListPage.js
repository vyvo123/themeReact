import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AdminPagination from "../../../components/admin/AdminPagination";
import NewsList from "../../../components/admin/NewsList";
import { selectTotalNews } from "../../../redux/newsSlice";

const NewsListPage = () => {
  const totalItem = useSelector(selectTotalNews);

  const { page } = useParams();

  const limit = 10;
  const totalPage = Math.ceil(totalItem / limit);
  let currentPage = Number(page) || 1;
  currentPage =
    currentPage < 1 ? 1 : currentPage > totalPage ? totalPage : currentPage;
  const start = (currentPage - 1) * limit > 0 ? (currentPage - 1) * limit : 0;

  return (
    <>
      <header className="fixed top-14 left-0 md:left-60 right-0 px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <h5 className="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
            News
          </h5>
          <span>DS bài viết</span>
        </div>
        <Link to="/admin/news/add">
          <button
            type="button"
            className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Thêm bài viết
          </button>
        </Link>
      </header>

      <div className="p-6 mt-24 overflow-hidden">
        <form
          action=""
          className="flex rounded-md shadow-sm mb-5"
          method="POST"
          id="news__search-form"
        >
          <input
            type="text"
            name="company-website"
            id="news__search-form-key"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 px-4 py-2 border outline-none"
            placeholder="Nhập tiêu đề bài viết..."
          />
          <select
            className="border-gray-300 border outline-none px-2 text-sm"
            id="news__search-form-stt"
          >
            <option value="">-- Trạng thái --</option>
            <option value={1}>Hiển thị</option>
            <option value={0}>Ẩn</option>
          </select>
          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm cursor-pointer hover:bg-gray-200">
            <i className="fas fa-search" />
          </span>
        </form>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <NewsList start={start} limit={limit} />

                <AdminPagination
                  page={currentPage}
                  totalPage={totalPage}
                  url="news"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsListPage;
