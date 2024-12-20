import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkUserHeart } from "../../api/favorites";
import { clientUpdate, get as getProduct } from "../../api/product";
import { formatCurrency } from "../../utils";
import FilterProduct from "./FilterProduct";
import Pagination from "./Pagination";
import { getAvgStar, getTotalRating } from "../../api/rating";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../../redux/wishlistSlice";
import { selectAuth } from "../../redux/authSlice";

const ProductContent = ({ url, page, getProducts, parameter }) => {
  const [emptyProduct, setEmptyProduct] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    view: "grid",
    sort: "createdAt",
    order: "desc",
  });

  const limit = 9;
  const totalPage = Math.ceil(totalProduct / limit);
  page = page < 1 ? 1 : page > totalPage ? totalPage : page;
  const start = (page - 1) * limit > 0 ? (page - 1) * limit : 0;

  useEffect(() => {
    const getData = async () => {
      const { data } = await getProducts(
        start,
        limit,
        filter.sort,
        filter.order,
        parameter
      );

      const listProduct = [];
      for await (let product of data) {
        const ratingNumber = await getAvgStar(product._id);
        const { data: totalRating } = await getTotalRating(product._id);
        listProduct.push({
          ...product,
          ratingNumber,
          totalRating: totalRating.length,
        });
      }

      setProducts(listProduct);
    };
    getData();

    const getTotalProduct = async () => {
      const { data } = await getProducts(
        0,
        0,
        filter.sort,
        filter.order,
        parameter
      );
      setEmptyProduct(!data.length ? true : false);
      setTotalProduct(data.length);
    };
    getTotalProduct();
  }, [page, parameter, filter]);

  const handlerUpdateFilter = (data) => {
    setFilter(data);
  };

  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const handleFavorites = async (productId, slug) => {
    if (!user) {
      toast.info("Vui lòng đăng nhập để yêu thích sản phẩm");
    } else {
      const { data } = await checkUserHeart(user._id, productId);

      if (!data.length) {
        // cập nhật số lượng yêu thích
        const { data: product } = await getProduct(slug);
        product.favorites++;

        clientUpdate(product);

        dispatch(
          addWishlist({
            userId: user._id,
            productId,
          })
        );
        toast.success("Đã thêm sản phẩm vào danh sách yêu thích", {
          position: "top-left",
        });
      } else {
        toast.info("Sản phẩm đã tồn tại trong danh sách yêu thích");
      }
    }
  };

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
    <>
      {emptyProduct ? (
        <div className="col-span-12 lg:col-span-9">
          Không tìm thấy sản phẩm nào
        </div>
      ) : (
        <div className="col-span-12 lg:col-span-9">
          <FilterProduct
            filter={filter}
            onUpdateFilter={handlerUpdateFilter}
            start={start}
            limit={limit}
            totalProduct={totalProduct}
          />

          {filter.view === "list" ? (
            <div className="grid grid-cols-1 divide-y">
              {products?.map((item, index) => (
                <div
                  className="grid grid-cols-12 py-4 gap-3 product-item"
                  key={index}
                >
                  <div className="col-span-3 relative group overflow-hidden">
                    <Link
                      to={`/san-pham/${item.slug}`}
                      className="bg-no-repeat bg-cover bg-center block h-full bg-[#f7f7f7] absolute w-full"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <button className="absolute w-full h-8 bottom-0 bg-[#D9A953] opacity-90 transition ease-linear duration-300 text-white font-semibold uppercase text-sm hover:opacity-100 translate-y-full group-hover:translate-y-0">
                      Xem nhanh
                    </button>
                    <button
                      onClick={() => handleFavorites(item._id, item.slug)}
                      className="btn-heart opacity-0 group-hover:opacity-100 absolute top-3 right-3 border-2 border-gray-400 rounded-full w-8 h-8 text-gray-400 transition ease-linear duration-300 hover:bg-red-700 hover:text-white hover:border-red-700"
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>

                  <div className="col-span-9">
                    <h3>
                      <Link
                        to={`/san-pham/${item.slug}`}
                        className="block font-semibold text-xl text-gray-800 pb-1 mb-3 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300"
                      >
                        {item.name}
                      </Link>
                    </h3>
                    <ul className="flex items-center mt-4">
                      <li className="flex text-yellow-400 text-xs pr-6 relative after:content-[''] after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:bg-gray-300 after:h-4">
                        {renderStar(item.ratingNumber || 0)}
                      </li>
                      <li className="pr-6 relative after:content-[''] after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:bg-gray-300 after:h-4">
                        {item.totalRating} Đánh giá
                      </li>
                      <li>10 Đã bán</li>
                    </ul>
                    <div className="mt-1 mb-2">
                      <span className="text-xl text-[#D9A953] font-semibold">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                    <p>{item.description}</p>
                    <button className="mt-4 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
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
                      onClick={() => handleFavorites(item._id, item.slug)}
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
                    <div className="text-sm pt-1">
                      {formatCurrency(item.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Pagination page={page} totalPage={totalPage} url={url} />
        </div>
      )}
    </>
  );
};

export default ProductContent;
