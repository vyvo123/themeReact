import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../../../api/news";
import { formatDateNews } from "../../../utils";

const HomeNews = () => {
  const [news, setNews] = useState();

  useEffect(() => {
    const getCate = async () => {
      const { data } = await getAll(0, 4);
      setNews(data);
    };
    getCate();
  }, []);

  return (
    <section className="bg-[#EFE8DE] py-9">
      <div className="container max-w-6xl mx-auto px-3">
        <h3>
          <a
            href=""
            className="uppercase text-center block text-[#D9A953] text-2xl font-semibold"
          >
            TIN TỨC - KHUYẾN MÃI
          </a>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {news?.map((item, index) => (
            <div key={index}>
              <Link
                to={`/bai-viet/${item.slug}`}
                style={{ backgroundImage: `url(${item.thumbnail})` }}
                className="block bg-cover bg-center pt-[70%] rounded-t-xl"
              />
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
      </div>
    </section>
  );
};

export default HomeNews;
