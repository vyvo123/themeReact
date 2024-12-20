import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../../api/categoryNews";

const NavNews = ({ slug }) => {
  const [cateNews, setCateNews] = useState();

  useEffect(() => {
    const getCate = async () => {
      const { data } = await getAll();
      setCateNews(data);
    };
    getCate();
  }, []);

  return (
    <section className="container max-w-6xl px-3 mx-auto flex mt-8 justify-center">
      <Link
        to="/tin-tuc"
        className={`text-center px-4 group flex flex-col items-center cate-news-item ${
          !slug && "active"
        }`}
      >
        <div className="cate-news-icon w-[75px] h-[75px] text-3xl rounded-full flex items-center justify-center bg-[#EEE8DF] transition duration-300 group-hover:bg-[#D9A953] group-hover:text-white cursor-pointer">
          <FontAwesomeIcon icon={faBorderAll} />
        </div>
        <p className="cate-news-name font-semibold mt-1 group-hover:text-[#D9A953] transition duration-300">
          Tất cả
        </p>
      </Link>

      {cateNews?.map((item, index) => (
        <Link
          to={`/tin-tuc/${item.slug}`}
          key={index}
          className={`text-center px-4 group flex flex-col items-center cate-news-item ${
            item.slug === slug && "active"
          }`}
        >
          <div className="cate-news-icon w-[75px] h-[75px] text-3xl rounded-full flex items-center justify-center bg-[#EEE8DF] transition duration-300 group-hover:bg-[#D9A953] group-hover:text-white cursor-pointer">
            <svg
              className="svg-inline--fa fa-newspaper fa-w-18"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="newspaper"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              data-fa-i2svg
            >
              <path
                fill="currentColor"
                d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"
              />
            </svg>
          </div>
          <p className="cate-news-name font-semibold mt-1 group-hover:text-[#D9A953] transition duration-300">
            {item.name}
          </p>
        </Link>
      ))}
    </section>
  );
};

export default NavNews;
