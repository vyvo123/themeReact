import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Pagination = ({ page, totalPage, url }) => {
  const pagination = [];
  for (let i = 1; i <= totalPage; i++) {
    pagination.push(
      <li key={i}>
        <Link
          to={`/${url}/page/${i}`}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white ${
            page === i
              ? "border-[#D9A953] bg-[#D9A953] text-white"
              : "border-gray-500 text-gray-500"
          }`}
        >
          {i}
        </Link>
      </li>
    );
  }

  return (
    <ul className="flex justify-center mt-5">
      {page > 1 && (
        <li>
          <Link
            to={`/${url}/page/${page - 1}`}
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold border-gray-500 text-gray-500 mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white"
          >
            <button>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
          </Link>
        </li>
      )}

      {totalPage > 1 && pagination}

      {page < totalPage && (
        <li>
          <Link
            to={`/${url}/page/${page + 1}`}
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold border-gray-500 text-gray-500 mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white"
          >
            <button>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
