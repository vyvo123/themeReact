import { faTh, faThList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FilterProduct = ({
  filter,
  onUpdateFilter,
  start,
  limit,
  totalProduct,
}) => {
  const updateView = (view) => {
    onUpdateFilter({
      ...filter,
      view,
    });
  };

  const updateSort = (e) => {
    const sortArr = e.target.value.split("-");
    onUpdateFilter({
      ...filter,
      sort: sortArr[0],
      order: sortArr[1],
    });
  };

  return (
    <div className="border-b pb-2 flex justify-between items-center">
      <div className="flex items-center">
        <ul className="flex">
          <li
            onClick={() => updateView("grid")}
            className={`filter__btn-view ${
              filter.view === "grid" ? "active" : ""
            } text-xl cursor-pointer mr-2 text-gray-600 transition ease-linear duration-150 hover:text-[#D9A953]`}
          >
            <FontAwesomeIcon icon={faTh} />
          </li>
          <li
            onClick={() => updateView("list")}
            className={`filter__btn-view ${
              filter.view === "list" ? "active" : ""
            } text-xl cursor-pointer mr-2 text-gray-600 transition ease-linear duration-150 hover:text-[#D9A953]`}
          >
            <FontAwesomeIcon icon={faThList} />
          </li>
        </ul>
        <span>
          Hiển thị {start + 1} -{" "}
          {start + limit > totalProduct ? totalProduct : start + limit} trong{" "}
          {totalProduct} kết quả
        </span>
      </div>
      <form action="" className="flex items-center">
        <label htmlFor="filter-sort">Sắp xếp theo</label>
        <select
          onChange={(e) => updateSort(e)}
          className="ml-2 flex-1 shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-9 text-sm outline-none"
        >
          <option value="createdAt-desc">Mặc định</option>
          <option value="createdAt-desc">Thứ tự theo ngày tạo: mới nhất</option>
          <option value="createdAt-asc">Thứ tự theo ngày tạo: cũ nhất</option>
          <option value="favorites-asc">Lượt yêu thích: thấp -&gt; cao</option>
          <option value="favorites-desc">Lượt yêu thích: cao -&gt; thấp</option>
          <option value="view-asc">Lượt xem: thấp -&gt; cao</option>
          <option value="view-desc">Lượt xem: cao -&gt; thấp</option>
          <option value="price-asc">Thứ tự theo giá: thấp -&gt; cao</option>
          <option value="price-desc">Thứ tự theo giá: cao -&gt; thấp</option>
        </select>
      </form>
    </div>
  );
};

export default FilterProduct;
