import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../../api/categoryNews";
import { getAll as getAllNews } from "../../api/news";

const SidebarNews = ({ cateId, newsId }) => {
  const [cateNews, setCateNews] = useState();
  const [newsLatest, setNewsLatest] = useState();

  useEffect(() => {
    const getCateNews = async () => {
      const { data } = await getAll();
      setCateNews(data);
    };
    getCateNews();

    const getNewsLatest = async () => {
      const { data } = await getAllNews(0, 10);
      setNewsLatest(data);
    };
    getNewsLatest();
  }, []);

  return (
    <aside className="hidden lg:block lg:col-span-3 pl-6 border-l">
      <section>
        <h2 className="uppercase font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">
          CHUYÊN MỤC
        </h2>
        <ul className="mt-4 grid grid-cols-1 divide-y">
          {cateNews?.map((item, index) => (
            <li key={index}>
              <Link
                to={`/tin-tuc/${item.slug}`}
                className={`${
                  cateId === item._id && "text-black font-semibold"
                } block py-1 leading-7 text-gray-500 transition duration-200 hover:text-black`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-5">
        <h2 className="uppercase font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">
          Bài viết mới
        </h2>
        <ul className="mt-4 grid grid-cols-1 divide-y">
          {newsLatest?.map((item, index) => (
            <li key={index}>
              <Link
                to={`/bai-viet/${item.slug}`}
                className={`${
                  item._id === newsId && "text-black font-semibold"
                } limit-line-2 block py-1 leading-7 text-gray-500 transition duration-200 hover:text-black`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default SidebarNews;
