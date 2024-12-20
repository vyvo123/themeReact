import {
  faFacebookF,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faAngleLeft,
  faAngleRight,
  faExpandArrowsAlt,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { clientUpdate, get } from "../../api/product";
import { formatCurrency, updateTitle } from "../../utils";
import ProductRelated from "../../components/user/ProductRelated";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import CommentList from "../../components/user/CommentList";
import { checkUserHeart } from "../../api/favorites";
import { getAvgStar, getTotalRating } from "../../api/rating";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../../redux/wishlistSlice";
import { selectAuth } from "../../redux/authSlice";
import { addCart } from "../../redux/cartSlice";
import CommentProduct from "../../components/user/CommentProduct";

const ProductDetailPage = () => {
  const { user } = useSelector(selectAuth);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [reRender, setRerender] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async ({ ice, sugar }) => {
    // get data product
    const { data: product } = await get(slug);
    const productData = {
      productSlug: product.slug,
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image,
    };

    const cartData = {
      id: uuidv4(),
      ...productData,
      quantity,
      ice: +ice,
      sugar: +sugar,
    };

    dispatch(addCart(cartData));
    toast.success(`Thêm ${product.name} vào giỏ hàng thành công`);
    reset();
    setQuantity(1);
  };

  const { slug, page } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    const getProduct = async () => {
      const { data } = await get(slug);
      data.view++;
      await clientUpdate(data);

      const { data: totalRating } = await getTotalRating(data._id);

      updateTitle(`${data.name}`);
      setProduct({
        ...data,
        ratingNumber: await getAvgStar(data._id),
        totalRating: totalRating.length,
      });
    };
    getProduct();
  }, [slug]);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    // setShowBtnClear(true);
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      toast.info("Vui lòng chọn ít nhất 1 sản phẩm");
    } else {
      setQuantity(quantity - 1);
      // setShowBtnClear(true);
    }
  };

  const dispatch = useDispatch();
  const handleFavorites = async (productId, slug) => {
    if (!user) {
      toast.info("Vui lòng đăng nhập để yêu thích sản phẩm");
    } else {
      const { data } = await checkUserHeart(user._id, productId);

      if (!data.length) {
        // cập nhật số lượng yêu thích
        const { data: product } = await get(slug);
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
      <section className="container max-w-6xl mx-auto px-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pb-8">
        <div className="relative group min-h-[500px]">
          <div
            className="h-full absolute w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${product?.image})` }}
          />
          <button className="absolute bottom-2 left-2 rounded-full border-2 border-gray-400 w-9 h-9 text-gray-400 text-lg transition ease-linear duration-300 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white">
            <FontAwesomeIcon icon={faExpandArrowsAlt} />
          </button>
          <button
            onClick={() => handleFavorites(product?._id, product?.slug)}
            className="btn-heart opacity-0 group-hover:opacity-100 absolute top-3 right-3 border-2 border-gray-400 rounded-full w-8 h-8 text-gray-400 transition ease-linear duration-300 hover:bg-red-700 hover:text-white hover:border-red-700"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <div>
          <div className="flex justify-between">
            <div>
              <div className="flex">
                <Link
                  to="/"
                  className="text-gray-500 transition hover:text-black uppercase font-semibold text-sm block pr-4 relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:right-2 after:w-[1px] after:h-3 after:rotate-12 after:bg-gray-400"
                >
                  Home
                </Link>
                <Link
                  to={`/danh-muc/${product?.categoryId?.slug}`}
                  className="text-gray-500 transition hover:text-black uppercase font-semibold text-sm"
                >
                  {product?.categoryId?.name}
                </Link>
              </div>
              <h1 className="font-semibold text-[28px] text-gray-800 pb-1 mb-3 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">
                {product?.name}
              </h1>
              <ul className="flex items-center mt-4">
                <li className="flex text-yellow-400 text-xs pr-4 relative after:content-[''] after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:bg-gray-300 after:h-4">
                  {renderStar(product?.ratingNumber || 0)}
                </li>
                <li className="pr-4 relative after:content-[''] after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:bg-gray-300 after:h-4">
                  {product?.totalRating} Đánh giá
                </li>
                <li>10 Đã bán</li>
              </ul>
              <div className="mt-1 my-2">
                <span className="text-3xl text-[#D9A953] font-semibold">
                  {formatCurrency(product?.price || 0)}
                </span>
              </div>
            </div>
            <ul className="flex">
              <li>
                <button className="w-8 h-8 rounded-full border-2 border-gray-400 text-gray-400 transition ease-linear duration-200 hover:text-white hover:bg-[#D9A953] hover:border-[#D9A953]">
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
              </li>
              <li>
                <button className="w-8 ml-1 h-8 rounded-full border-2 border-gray-400 text-gray-400 transition ease-linear duration-200 hover:text-white hover:bg-[#D9A953] hover:border-[#D9A953]">
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </li>
            </ul>
          </div>
          <div className="flex justify-between">
            <div>
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center mt-2">
                  <label className="min-w-[80px] font-bold text-sm">Đá</label>
                  <ul className="flex">
                    <li>
                      <input
                        type="radio"
                        defaultValue={0}
                        className="form__add-cart-ice"
                        hidden
                        {...register("ice")}
                        id="ice-0"
                      />
                      <label
                        htmlFor="ice-0"
                        className="block cursor-pointer px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500"
                      >
                        0%
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        defaultValue={30}
                        className="form__add-cart-ice"
                        hidden
                        {...register("ice")}
                        id="ice-30"
                      />
                      <label
                        htmlFor="ice-30"
                        className="block cursor-pointer px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500"
                      >
                        30%
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        defaultValue={50}
                        className="form__add-cart-ice"
                        hidden
                        {...register("ice")}
                        id="ice-50"
                      />
                      <label
                        htmlFor="ice-50"
                        className="block cursor-pointer px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500"
                      >
                        50%
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        defaultValue={70}
                        className="form__add-cart-ice"
                        hidden
                        {...register("ice")}
                        id="ice-70"
                      />
                      <label
                        htmlFor="ice-70"
                        className="block cursor-pointer px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500"
                      >
                        70%
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        defaultValue={100}
                        defaultChecked
                        className="form__add-cart-ice"
                        hidden
                        {...register("ice")}
                        id="ice-100"
                      />
                      <label
                        htmlFor="ice-100"
                        className="block cursor-pointer px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500"
                      >
                        100%
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center mt-2">
                  <label className="min-w-[80px] font-bold text-sm">
                    Đường
                  </label>
                  <ul className="flex">
                    <li>
                      <input
                        type="radio"
                        defaultValue={0}
                        {...register("sugar")}
                        hidden
                        className="form__add-cart-sugar"
                        id="sugar-0"
                      />
                      <label
                        htmlFor="sugar-0"
                        className="cursor-pointer block px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500"
                      >
                        0%
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        defaultValue={30}
                        {...register("sugar")}
                        hidden
                        className="form__add-cart-sugar"
                        id="sugar-30"
                      />
                      <label
                        htmlFor="sugar-30"
                        className="cursor-pointer block px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500"
                      >
                        30%
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        defaultValue={50}
                        {...register("sugar")}
                        hidden
                        className="form__add-cart-sugar"
                        id="sugar-50"
                      />
                      <label
                        htmlFor="sugar-50"
                        className="cursor-pointer block px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500"
                      >
                        50%
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        defaultValue={70}
                        {...register("sugar")}
                        hidden
                        className="form__add-cart-sugar"
                        id="sugar-70"
                      />
                      <label
                        htmlFor="sugar-70"
                        className="cursor-pointer block px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500"
                      >
                        70%
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        defaultValue={100}
                        defaultChecked
                        {...register("sugar")}
                        hidden
                        className="form__add-cart-sugar"
                        id="sugar-100"
                      />
                      <label
                        htmlFor="sugar-100"
                        className="cursor-pointer block px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500"
                      >
                        100%
                      </label>
                    </li>
                  </ul>
                </div>

                <div className="border-b border-dashed pb-4 mt-6">
                  {/* {showBtnClear  && <p className="transition-all ease-linear duration-100 mt-6 border-t border-dashed pt-2 text-xl font-semibold">{formatCurrency(totalPrice)}</p>} */}
                  <div className="flex mt-2 items-center">
                    <div className="flex items-center h-9">
                      <button
                        type="button"
                        onClick={handleDecrease}
                        className="px-2 bg-gray-100 border-gray-200 h-full border-l border-y transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="border border-gray-200 h-full w-10 text-center outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc]"
                        value={quantity}
                        onChange={(e) => {
                          const qnt = e.target.value;
                          if (isNaN(qnt)) {
                            toast.info("Vui lòng nhập số");
                          } else {
                            setQuantity(+e.target.value);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleIncrease}
                        className="px-2 bg-gray-100 border-gray-200 h-full border-r border-y transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"
                      >
                        +
                      </button>
                    </div>
                    <button className="ml-2 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </form>
              <p className="mt-1 text-gray-500">
                {" "}
                Danh mục:{" "}
                <Link
                  to={`/danh-muc/${product?.categoryId?.slug}`}
                  className="transition hover:text-black"
                >
                  {product?.categoryId?.name}
                </Link>
              </p>
              <ul className="flex mt-3">
                <li className="mr-1.5">
                  <a
                    href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/"
                    className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li className="mr-1.5">
                  <a
                    href="https://twitter.com/share?url=${window.location.href}/"
                    className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                  >
                    <i className="fab fa-twitter" />
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li className="mr-1.5">
                  <a
                    href="https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}/"
                    className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
              </ul>
            </div>
            {/* <div>
                            <button
                                type="button"
                                className={`${showBtnClear || "hidden"} text-gray-400 transition hover:text-black`}
                            >Xóa</button>
                        </div> */}
          </div>
        </div>
      </section>
      <section className="container max-w-6xl mx-auto px-3">
        <ul className="flex border-t">
          <li className="transition ease-linear duration-200 font-bold cursor-pointer hover:border-t-[#D9A953] hover:text-black uppercase pt-2 border-t-2 border-t-transparent pr-2 text-gray-400 text-xs">
            Mô tả
          </li>
          <li className="transition ease-linear duration-200 font-bold cursor-pointer hover:border-t-[#D9A953] hover:text-black uppercase pt-2 border-t-2 border-t-[#D9A953] pr-2 text-black text-xs">
            Đánh giá
          </li>
        </ul>
      </section>
      <section className="container max-w-6xl mx-auto px-3">
        {!user ? (
          <div className="mt-5">
            Vui lòng{" "}
            <Link to={`/login`}>
              <button className="bg-[#D9A953] px-2 py-1 rounded text-white text-sm font-semibold transition duration-200 ease-linear hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
                đăng nhập
              </button>
            </Link>{" "}
            để nhận xét
          </div>
        ) : (
          <CommentProduct
            productId={product?._id}
            onReRender={setRerender}
            productData={product}
          />
        )}

        <CommentList
          productId={product?._id}
          reRender={reRender}
          slug={slug}
          page={Number(page) || 1}
        />
      </section>

      <ProductRelated
        id={product?._id}
        cateId={product?.categoryId?._id}
        onHandleFavorites={handleFavorites}
      />
    </>
  );
};

export default ProductDetailPage;
