import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsRelated } from "../../api/product";
import { getAvgStar, getTotalRating } from "../../api/rating";
import { formatCurrency } from "../../utils";

const ProductRelated = ({ id, cateId, onHandleFavorites }) => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await getProductsRelated(0, 4, id, cateId);

      const listProduct = [];
      for await (let product of data) {
        const ratingNumber = await getAvgStar(product._id);
        listProduct.push({
          ...product,
          ratingNumber,
        });
      }

      setProducts(listProduct);
    };
    cateId && getProducts();
  }, [id]);

  // render star
  const renderStar = (ratingNumber) => {
    const ratingArr = [];
    for (let i = 0; i < ratingNumber; i++) {
      ratingArr.push(
        <div className="text-yellow-400" key={i}>
          <FontAwesomeIcon icon={faStar} />
        </div>
      );
    }

    for (let i = 0; i < 5 - ratingNumber; i++) {
      ratingArr.push(
        <div className="text-gray-300" key={i + 5}>
          <FontAwesomeIcon icon={faStar} />
        </div>
      );
    }

    return ratingArr;
  };

  return (
    <section className="container max-w-6xl px-3 mx-auto my-6">
      <div className="border-t">
        <h2 className="text-2xl font-semibold mt-2">Sản phẩm tương tự</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {products?.map((item, index) => (
            <div className="group" key={index}>
              <div className="relative bg-[#f7f7f7] overflow-hidden">
                <Link
                  to={`/san-pham/${item.slug}`}
                  style={{ backgroundImage: `url(${item.image})` }}
                  className="bg-cover pt-[100%] bg-center block"
                />
                <button className="absolute w-full bottom-0 h-9 bg-[#D9A953] text-center text-gray-50 opacity-95 uppercase font-semibold text-sm transition ease-linear duration-300 hover:opacity-100 hover:text-white translate-y-full group-hover:translate-y-0">
                  Xem nhanh
                </button>
                <button
                  onClick={() => onHandleFavorites(item._id, item.slug)}
                  className="btn-heart absolute top-3 right-3 w-8 h-8 rounded-full border-2 text-[#c0c0c0] text-lg border-[#c0c0c0] transition duration-300 hover:text-white hover:bg-red-700 hover:border-red-700 opacity-0 group-hover:opacity-100"
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
              <div className="text-center py-3">
                <p className="uppercase text-xs text-gray-400">
                  {item.categoryId?.name}
                </p>
                <Link
                  to={`/san-pham/${item.slug}`}
                  className="block font-semibold text-lg"
                >
                  {item.name}
                </Link>
                <ul className="flex text-yellow-500 text-xs justify-center pt-1">
                  {renderStar(item.ratingNumber || 0)}
                </ul>
                <div className="text-sm pt-1">{formatCurrency(item.price)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRelated;
