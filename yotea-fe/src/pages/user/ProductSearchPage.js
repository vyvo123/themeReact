import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { search } from "../../api/product";
import NavProduct from "../../components/user/NavProduct";
import ProductContent from "../../components/user/ProductContent";
import { updateTitle } from "../../utils";

const ProductSearchPage = () => {
  const { keyword, page } = useParams();

  useEffect(() => {
    updateTitle(`Kết quả tìm kiếm cho "${keyword}"`);
  }, []);

  return (
    <>
      <section className="container max-w-6xl mx-auto px-3 pt-8 mb-5 text-center">
        <div className="flex justify-center">
          <Link
            to="/"
            className="transition duration-300 ease-linear hover:text-[#D9A953] block pr-6 font-semibold relative after:content-[''] after:absolute after:right-3 after:bg-gray-500 after:w-[1px] after:h-4 after:rotate-12 after:top-1/2 after:-translate-y-1/2"
          >
            Trang chủ
          </Link>
          <Link
            to="/thuc-don"
            className="transition duration-300 ease-linear hover:text-[#D9A953] font-semibold"
          >
            Sản phẩm
          </Link>
        </div>
        <h1 className="text-[#D9A953] font-semibold text-3xl mt-1">
          Kết quả tìm kiếm "{keyword}"
        </h1>
      </section>

      <section className="container max-w-6xl mx-auto px-3 grid grid-cols-12 gap-6 mb-8">
        <NavProduct />

        <ProductContent
          url={`tim-kiem/${keyword}`}
          getProducts={search}
          parameter={keyword}
          page={Number(page) || 0}
        />
      </section>
    </>
  );
};

export default ProductSearchPage;
