import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faChevronUp,
  faClock,
  faEnvelope,
  faHeart,
  faHome,
  faPhoneAlt,
  faSearch,
  faShoppingCart,
  faSortDown,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { search } from "../../api/product";
import { formatCurrency, formatDate } from "../../utils";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWishlist,
  getWishlist,
  selectShowWishlist,
  selectWishlist,
  showWishlist,
} from "../../redux/wishlistSlice";
import { selectAuth, selectStatusLoggin } from "../../redux/authSlice";
import { getCates, selectCatesProduct } from "../../redux/categoryProductSlice";
import { selectCart } from "../../redux/cartSlice";

const WebsiteLayout = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [productsSearch, setProductsSearch] = useState();
  const [isEmptyProduct, setIsEmptyProduct] = useState(false);
  const [keyword, setKeyword] = useState();
  const categories = useSelector(selectCatesProduct);

  const wishlist = useSelector(selectWishlist);
  const isShowWishlist = useSelector(selectShowWishlist);

  const isLogged = useSelector(selectStatusLoggin);
  const { user } = useSelector(selectAuth);
  const cart = useSelector(selectCart);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      setVisible(scrollTop > 1000 ? true : false);
      setHeaderFixed(scrollTop > 1000 ? true : false);
    });

    dispatch(getCates());

    if (isLogged) {
      dispatch(getWishlist(user._id));
    }
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // search
  const handleSearchProduct = async (e) => {
    const key = e.target.value;
    setKeyword(key);
    const { data } = await search(0, 0, "createdAt", "desc", key);
    setIsEmptyProduct(!data.length ? true : false);
    setProductsSearch(data);
  };

  const navigate = useNavigate();
  const handleSubmitFormSearch = (e) => {
    e.preventDefault();
    if (!keyword) {
      toast.error("Vui lòng nhập tên SP");
    } else {
      navigate(`/tim-kiem/${keyword}`);
    }
  };

  const handleRemoveWishList = async (id) => {
    dispatch(deleteWishlist(id));
  };

  const handleShowWishlist = () => {
    if (!isLogged) {
      toast.info("Vui lòng đăng nhập để xem danh sách yêu thích");
    } else {
      dispatch(showWishlist(true));
    }
  };

  return (
    <>
      <header>
        <div className="bg-[#D9A953] hidden md:block">
          <div className="container max-w-6xl px-3 mx-auto flex justify-between items-center h-10">
            <ul className="flex items-center">
              <li className="relative after:content-[''] after:absolute after:w-[1px] after:h-3.5 after:bg-gray-50 after:right-3 after:top-1/2 after:-translate-y-1/2 text-sm uppercase pr-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                <a href="mailto:vyvnt@fpt.edu.vn">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span className="pl-1">Contact</span>
                </a>
              </li>
              <li className="relative after:content-[''] after:absolute after:w-[1px] after:h-3.5 after:bg-gray-50 after:right-3 after:top-1/2 after:-translate-y-1/2 text-sm uppercase pr-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                <FontAwesomeIcon icon={faClock} />
                <span className="pl-1">08:00 - 17:00</span>
              </li>
              <li className="text-sm uppercase text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                <a href="tel:0983983983">
                  <FontAwesomeIcon icon={faPhoneAlt} />
                  <span className="pl-1">0983 983 983</span>
                </a>
              </li>
            </ul>
            <ul className="flex items-center">
              <li className="group relative uppercase text-sm pl-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                <button className="rounded-full border border-gray-50 w-7 h-7">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <div className="hidden min-w-[280px] z-20 group-hover:block absolute top-full -right-[100px] bg-white shadow p-3 opacity-100">
                  <form
                    action=""
                    className="flex"
                    onSubmit={(e) => handleSubmitFormSearch(e)}
                  >
                    <input
                      type="text"
                      onChange={(e) => handleSearchProduct(e)}
                      className="text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] flex-1 border px-2 h-8 text-sm outline-none"
                      placeholder="Nhập tên sản phẩm"
                    />
                    <button className="px-3 bg-red-500 transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </form>
                  <ul className="mt-3 grid grid-cols-1 divide-y max-h-[70vh] overflow-y-auto">
                    {productsSearch?.map((item, index) => (
                      <li key={index}>
                        <Link
                          to={`/san-pham/${item.slug}`}
                          className="flex py-2 transition duration-200 hover:bg-gray-50 hover:text-[#D9A953] text-black items-center px-2"
                        >
                          <img
                            src={item.image}
                            className="w-10 h-10 object-cover rounded-full bg-[#f7f7f7]"
                            alt=""
                          />
                          <p className="pl-1 pr-2 normal-case font-normal">
                            {item.name}
                          </p>
                          <p className="font-medium ml-auto">
                            {formatCurrency(item.price)}
                          </p>
                        </Link>
                      </li>
                    ))}

                    {isEmptyProduct && (
                      <li className="text-black normal-case">
                        Không tìm thấy sản phẩm nào!
                      </li>
                    )}
                  </ul>
                </div>
              </li>

              {isLogged ? (
                <li className="relative after:content-[''] after:absolute after:w-[1px] after:h-3.5 after:bg-gray-50 after:left-3 after:top-1/2 after:-translate-y-1/2 uppercase text-sm pl-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                  <Link to={user.role ? "/admin/" : "/my-account/"}>
                    Hello, {user.fullName}
                  </Link>
                </li>
              ) : (
                <>
                  <li className="relative after:content-[''] after:absolute after:w-[1px] after:h-3.5 after:bg-gray-50 after:left-3 after:top-1/2 after:-translate-y-1/2 uppercase text-sm pl-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                    <Link to="/login">Đăng nhập</Link>
                  </li>
                  <li className="relative after:content-[''] after:absolute after:w-[1px] after:h-3.5 after:bg-gray-50 after:left-3 after:top-1/2 after:-translate-y-1/2 uppercase text-sm pl-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                    <Link to="/register">Đăng ký</Link>
                  </li>
                </>
              )}
              <li
                onClick={handleShowWishlist}
                className="header-icon-heart relative after:content-[''] after:absolute after:w-[1px] after:h-3.5 after:bg-gray-50 after:left-3 after:top-1/2 after:-translate-y-1/2 uppercase text-base cursor-pointer pl-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100"
              >
                <div className="relative">
                  <label
                    id="header-wishlist-label"
                    className="absolute w-4 h-4 bg-green-700 text-xs text-center rounded-full -right-3 -top-1"
                  >
                    {wishlist.length}
                  </label>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </li>
              <li
                id="header-cart-label"
                className="uppercase text-base pl-4 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100"
              >
                <Link to="/cart" className="relative">
                  <label className="absolute w-4 h-4 bg-green-700 text-xs text-center rounded-full -right-3 -top-1">
                    {cart.length}
                  </label>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`md:h-24 h-[70px] bg-white ${headerFixed && "active"}`}
          id="header-bottom"
        >
          <div className="container max-w-6xl mx-auto px-3 h-full">
            <div className="border-b flex items-center h-full">
              <div className="flex-1 md:hidden">
                <button className="btn-toggle-nav cursor-pointer pr-3 py-3 text-lg transition duration-200 ease-linear text-gray-400 hover:text-black">
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
              <ul className="flex-1 items-center hidden md:flex">
                <li className="menu__item pr-4 font-semibold text-gray-500 transition ease-linear duration-200 hover:text-black">
                  <NavLink to="/">Trang chủ</NavLink>
                </li>
                <li className="menu__item pr-4 font-semibold text-gray-500 transition ease-linear duration-200 hover:text-black">
                  <NavLink to="/gioi-thieu">Giới thiệu</NavLink>
                </li>
                <li className="menu__item relative pr-4 font-semibold text-gray-500 transition ease-linear duration-200 hover:text-black group">
                  <Link to="/thuc-don" className="flex items-center">
                    Sản phẩm
                    <div className="pl-1 -mt-1">
                      <FontAwesomeIcon icon={faSortDown} />
                    </div>
                  </Link>
                  <ul className="z-20 invisible group-hover:visible absolute top-full left-0 bg-white shadow min-w-[150px] max-w-full grid grid-cols-1 divide-y px-2 rounded-sm">
                    {categories?.map((item, index) => (
                      <li key={index}>
                        <Link
                          to={`/danh-muc/${item.slug}`}
                          className="block py-1.5 text-gray-500 transition ease-linear duration-200 hover:text-[#D9A953]"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <div className="h-full">
                <Link to="/" className="block h-full py-2">
                  <img
                    className="block h-full"
                    src="https://res.cloudinary.com/levantuan/image/upload/v1642588847/fpoly/asm-js/logo_oeo8uq.png"
                    alt=""
                  />
                </Link>
              </div>
              <ul className="flex-1 justify-end hidden md:flex">
                <li className="menu__item pl-4 font-semibold text-gray-500 transition ease-linear duration-200 hover:text-black">
                  <NavLink to="/tin-tuc">Tin tức</NavLink>
                </li>
                <li className="menu__item pl-4 font-semibold text-gray-500 transition ease-linear duration-200 hover:text-black">
                  <NavLink to="/lien-he">Liên hệ</NavLink>
                </li>
                <li className="menu__item pl-4 font-semibold text-gray-500 transition ease-linear duration-200 hover:text-black">
                  <NavLink to="/cua-hang">Cửa hàng</NavLink>
                </li>
              </ul>
              <ul className="flex flex-1 justify-end md:hidden">
                <li
                  onClick={handleShowWishlist}
                  className="uppercase text-base cursor-pointer pl-6 text-gray-600 font-light opacity-80 transition ease-linear duration-200 hover:text-black hover:opacity-100"
                >
                  <div className="relative">
                    <label className="text-white absolute w-4 h-4 bg-green-700 text-xs text-center rounded-full -right-3 -top-1">
                      {wishlist.length}
                    </label>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </li>
                <li className="uppercase text-base pl-4 text-gray-600 font-light opacity-80 transition ease-linear duration-200 hover:text-black hover:opacity-100">
                  <Link to="/gio-hang" className="relative">
                    <label className="text-white absolute w-4 h-4 bg-green-700 text-xs text-center rounded-full -right-3 -top-1">
                      {cart.length}
                    </label>
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <section className="nav__mobile invisible transition-all duration-500 ease-linear fixed top-0 right-0 bottom-0 left-0 z-20">
          <div className="nav__mobile-overlay invisible transition-all duration-400 ease-linear relative w-screen h-screen bg-[rgba(0,0,0,0.6)]" />
          <nav className="nav__mobile-content -translate-x-full transition duration-500 ease absolute top-0 left-0 bottom-0 min-w-[260px] bg-[rgba(255,255,255,0.95)] shadow py-10">
            <form action="" className="flex px-3" id="nav__mobile-search">
              <input
                type="text"
                className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] min-w-[80px] border px-2 h-8 text-sm outline-none"
                placeholder="Nhập tên sản phẩm tìm kiếm"
              />
              <button className="px-3 text-white bg-red-500 transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            <ul className="grid grid-cols-1 divide-y mt-5">
              <li>
                <NavLink
                  to="/"
                  className="px-3 py-3.5 transition ease-linear duration-200 hover:bg-gray-200 text-sm font-semibold text-gray-500 hover:text-black uppercase block"
                >
                  Trang chủ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gioi-thieu"
                  className="px-3 py-3.5 transition ease-linear duration-200 hover:bg-gray-200 text-sm font-semibold text-gray-500 hover:text-black uppercase block"
                >
                  Giới thiệu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/thuc-don"
                  className="px-3 py-3.5 transition ease-linear duration-200 hover:bg-gray-200 text-sm font-semibold text-gray-500 hover:text-black uppercase block"
                >
                  Sản phẩm
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tin-tuc"
                  className="px-3 py-3.5 transition ease-linear duration-200 hover:bg-gray-200 text-sm font-semibold text-gray-500 hover:text-black uppercase block"
                >
                  Tin tức
                  </NavLink>
              </li>
              <li>
                <NavLink
                  to="/lien-he"
                  className="px-3 py-3.5 transition ease-linear duration-200 hover:bg-gray-200 text-sm font-semibold text-gray-500 hover:text-black uppercase block"
                >
                  Liên hệ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cua-hang"
                  className="px-3 py-3.5 transition ease-linear duration-200 hover:bg-gray-200 text-sm font-semibold text-gray-500 hover:text-black uppercase block"
                >
                  Cửa hàng
                </NavLink>
              </li>
            </ul>
          </nav>
          <button className="nav__mobile-close fixed top-3 right-3 text-3xl text-gray-300 transition duration-200 ease-linear hover:text-white">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </section>
        <section id="wishlist" className="wishlist" />
      </header>

      <main>
        <Outlet />
      </main>

      <footer
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/levantuan/image/upload/v1642602939/fpoly/asm-js/bg_footer_r0omu5.jpg)",
        }}
        className="bg-cover bg-center bg-no-repeat py-14"
      >
        <div className="container max-w-6xl mx-auto px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white text-xl uppercase font-semibold mb-3">
                KẾT NỐI VỚI CHÚNG TÔI
              </h3>
              <p className="text-gray-300 text-justify">
                {" "}
                Chúng tôi mong muốn tạo nên hương vị thức uống tuyệt vời nhất.
                Là điểm đến đầu tiên dành cho bạn khi muốn thưởng thức trọn vẹn
                của tách Coffee{" "}
              </p>
              <ul className="flex text-white">
                <li className="mr-3 mt-3">
                  <a
                    href="https://www.facebook.com/TuongVy/"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li className="mr-3 mt-3">
                  <a
                    href="https://www.youtube.com/c/tanhieu1998/"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </li>
                <li className="mr-3 mt-3">
                  <a
                    href="https://www.instagram.com/tanhieu1998/"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                <li className="mr-3 mt-3">
                  <a href="https://www.tiktok.com/@tanhieu1998" target="_blank">
                    <FontAwesomeIcon icon={faTiktok} />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-xl uppercase font-semibold mb-3">
                Liên hệ
              </h3>
              <ul className="text-white leading-relaxed">
                <li className="flex">
                  <div className="min-w-[25px]">
                    <FontAwesomeIcon icon={faHome} />
                  </div>{" "}
                  Hà Nội
                </li>
                <li className="flex">
                  <div className="min-w-[25px]">
                    <FontAwesomeIcon icon={faPhoneAlt} />
                  </div>{" "}
                  Hotline: <a href="tel:0983983983">&nbsp; 0983983983</a>
                </li>
                <li className="flex">
                  <div className="min-w-[25px]">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>{" "}
                  Email:{" "}
                  <a href="mailto:vyvnt@fpt.edu.vn">
                    &nbsp; vyvnt@fpt.edu.vn
                  </a>
                </li>
                <li className="flex">
                  <div className="min-w-[25px]">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </div>{" "}
                  Facebook:{" "}
                  <a
                    href="https://www.facebook.com/TuongVy/"
                    target="_blank"
                  >
                    &nbsp; Tường Vy
                  </a>
                </li>
              </ul>
            </div>
            <div className="overflow-hidden">
              <h3 className="text-white text-xl uppercase font-semibold mb-3">
                Kết nối với chúng tôi
              </h3>

              <div
                className="fb-page"
                data-href="https://www.facebook.com/fpt.poly"
                data-tabs=""
                data-width=""
                data-height=""
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <blockquote
                  cite="https://www.facebook.com/fpt.poly"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/fpt.poly">
                    Cao đẳng FPT Polytechnic
                  </a>
                </blockquote>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-300 mt-9">
            {" "}
            Copyright 2022 ©{" "}
            <strong>
              {" "}
              Bản quyền thuộc về{" "}
              <a href="https://www.facebook.com/TuongVy/" target="_blank">
                Tường Vy
              </a>
            </strong>
          </div>
        </div>

        <button
          onClick={handleScrollTop}
          className={`${
            visible && "active"
          } btn__scroll-top invisible w-9 h-9 rounded-full border-2 border-gray-400 text-gray-400 fixed right-5 bottom-3 transition-all ease-linear duration-400 hover:text-white hover:bg-[#D9A953] hover:border-[#D9A953]`}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      </footer>

      <section
        id="wishlist"
        className={`${isShowWishlist && "active"} wishlist`}
      >
        <div
          onClick={() => dispatch(showWishlist(false))}
          className="wishlist__overlay invisible opacity-0 transition-all duration-400 ease-linear fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.6)] z-20"
        ></div>

        <div className="wishlist__content transition duration-500 ease fixed top-0 right-0 bottom-0 min-w-[360px] bg-white shadow z-20 translate-x-full">
          <header className="px-3 h-14 flex justify-between items-center border-b-2">
            <h1 className="uppercase font-semibold text-lg">
              Danh sách yêu thích
            </h1>
            <button
              onClick={() => dispatch(showWishlist(false))}
              className="py-2 font-semibold text-xl text-gray-500 transition duration-200 ease-linear hover:text-black"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </header>

          <div className="h-[calc(100vh-56px)] overflow-y-auto">
            <ul>
              {wishlist?.map((item, index) => (
                <li className="flex px-2 py-3 items-center" key={index}>
                  <img
                    src={item.productId.image}
                    className="w-16 h-16 object-cover"
                    alt=""
                  />

                  <div className="ml-2">
                    <Link
                      to={`/san-pham/${item.productId.slug}`}
                      className="block uppercase font-semibold"
                    >
                      {item.productId.name}
                    </Link>
                    <p className="text-sm font-medium">
                      {formatCurrency(item.productId.price)}
                    </p>
                    <p className="text-sm">{formatDate(item.createdAt)}</p>
                  </div>

                  <button
                    onClick={() => handleRemoveWishList(item._id)}
                    className="wishlist-icon-delete ml-auto transition ease-linear duration-200 text-gray-500 hover:text-black"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebsiteLayout;
