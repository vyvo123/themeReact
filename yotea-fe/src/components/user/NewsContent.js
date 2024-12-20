import { faArrowRight, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDateNews } from "../../utils";
import Pagination from "./Pagination";

const NewsContent = ({ page, getNews, parameter, url }) => {
  const [emptyNews, setEmptyNews] = useState(false);
  const [news, setNews] = useState();
  const [totalNews, setTotalNews] = useState(1);

  const limit = 8;
  const totalPage = Math.ceil(totalNews / limit);
  page = page < 1 ? 1 : page > totalPage ? totalPage : page;
  const start = (page - 1) * limit > 0 ? (page - 1) * limit : 0;

  useEffect(() => {
    const getDataNews = async () => {
      const { data } = await getNews(0, 0, parameter);
      setEmptyNews(!data.length ? true : false);
      setTotalNews(data.length);

      const { data: newsData } = await getNews(start, limit, parameter);
      setNews(newsData);
    };
    getDataNews();
  }, [page, parameter]);

  return (
    <>
      {emptyNews ? (
        <div className="py-16 bg-[#EFE8DE] mt-6 min-h-[500px]">
          <div className="container max-w-6xl text-center mx-auto px-3">
            Không tìm thấy bài viết nào
          </div>
        </div>
      ) : (
        <section className="py-16 bg-[#EFE8DE] mt-6 min-h-[500px]">
          <div
            className="container max-w-6xl mx-auto px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            id="news__list"
          >
            {news?.map((item, index) => (
              <div key={index}>
                <Link
                  to={`/bai-viet/${item.slug}`}
                  style={{ backgroundImage: `url(${item.thumbnail})` }}
                  className="block bg-cover bg-center pt-[70%] rounded-t-xl relative"
                >
                  <button className="absolute top-2 left-2 bg-[#D9A953] rounded-full w-10 h-10 text-white text-lg">
                    <FontAwesomeIcon icon={faNewspaper} />
                  </button>
                </Link>
                <div className="bg-white rounded-b-xl shadow px-3 py-2">
                  <p className="text-sm text-gray-500">
                    {formatDateNews(item.createdAt)}
                  </p>
                  <h3>
                    <Link
                      to={`/bai-viet/${item.slug}`}
                      className="limit-line-2 block py-1 font-semibold text-justify leading-tight transition duration-300 text-gray-600 hover:text-black"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <div className="limit-line-3 text-gray-500 text-sm text-justify">
                    {item.description}
                  </div>
                  <Link to={`/bai-viet/${item.slug}`}>
                    <button className="block mx-auto w-9 h-9 rounded-full border-2 border-[#D9A953] text-[#D9A953] transition duration-300 hover:bg-[#D9A953] hover:text-white mt-5 mb-2">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Pagination page={page} totalPage={totalPage} url={url} />
        </section>
      )}
    </>
  );
};

export default NewsContent;
