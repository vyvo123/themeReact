import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const CartNav = ({ page }) => {
  return (
    <section className="container max-w-6xl mx-auto px-3 mt-10">
      <ul className="flex justify-center items-center">
        <li className="text-2xl px-2">
          <Link
            to="/cart"
            className={`${
              page === "list" && "text-black"
            } uppercase text-gray-400 transition ease-linear duration-200 hover:text-black`}
          >
            SHOPPING CART
          </Link>
        </li>
        <li className="text-md text-gray-400 px-2 hidden md:block">
          <FontAwesomeIcon icon={faChevronRight} />
        </li>
        <li className="text-2xl px-2">
          <Link
            to="/checkout"
            className={`${
              page === "checkout" && "text-black"
            } uppercase text-gray-400 transition ease-linear duration-200 hover:text-black`}
          >
            Checkout details
          </Link>
        </li>
        <li className="text-md text-gray-400 px-2 hidden md:block">
          <FontAwesomeIcon icon={faChevronRight} />
        </li>
        <li className="text-2xl px-2">
          <span
            className={`${
              page === "thank-you" && "text-black"
            } uppercase text-gray-400`}
          >
            Order Complete
          </span>
        </li>
      </ul>
    </section>
  );
};

export default CartNav;
