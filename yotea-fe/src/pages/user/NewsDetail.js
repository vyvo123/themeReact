import {
  faFacebookF,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get } from "../../api/news";
import NewsRelated from "../../components/user/NewsRelated";
import SidebarNews from "../../components/user/SidebarNews";
import { formatDate, updateTitle } from "../../utils";

const NewsDetail = () => {
  const [news, setNews] = useState();

  const { slug } = useParams();

  useEffect(() => {
    const getNews = async () => {
      const { data } = await get(slug);
      setNews(data);
      updateTitle(`${data.title}`);
    };
    getNews();
  }, [slug]);

  return (
    <div>
      <section className="container max-w-6xl mx-auto px-3 text-center pt-7">
        <div className="border-b border-dashed pb-7">
          <Link
            to={`/tin-tuc/${news?.category.slug}`}
            className="uppercase text-sm"
          >
            {news?.category.name}
          </Link>
          <h1 className="uppercase font-bold text-xl py-1">{news?.title}</h1>
          <p className="text-sm">
            POSTED ON {formatDate(news?.createdAt || "")} BY ADMIN
          </p>
        </div>
      </section>
      <section className="container max-w-6xl mx-auto px-3 grid grid-cols-12 pb-8 pt-4">
        <div className="col-span-12 lg:col-span-9 lg:pr-6">
          <div className="leading-relaxed text-justify">{news?.content}</div>
          <ul className="flex justify-center py-7">
            <li className="mx-0.5">
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/"
                className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </li>
            <li className="mx-0.5">
              <a
                href="https://twitter.com/share?url=${window.location.href}/"
                className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li className="mx-0.5">
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}/"
                className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
          <div className="border-t border-dashed">
            <NewsRelated id={news?._id} category={news?.category._id} />
          </div>
        </div>

        <SidebarNews cateId={news?.category._id} newsId={news?._id} />
      </section>
    </div>
  );
};

export default NewsDetail;
