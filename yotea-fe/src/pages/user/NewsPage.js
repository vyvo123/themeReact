import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAll } from "../../api/news";
import NavNews from "../../components/user/NavNews";
import NewsContent from "../../components/user/NewsContent";
import { updateTitle } from "../../utils";

const NewsPage = () => {
  const { page } = useParams();

  useEffect(() => {
    updateTitle("Tin tức");
  }, []);

  return (
    <>
      <NavNews slug={""} />

      <NewsContent getNews={getAll} page={Number(page) || 1} url="tin-tuc" />
    </>
  );
};

export default NewsPage;
