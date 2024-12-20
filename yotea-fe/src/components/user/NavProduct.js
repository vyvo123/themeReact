import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../../api/category";
import { getFavorites } from "../../api/product";
import { formatCurrency } from "../../utils";

const NavProduct = ({ cateId }) => {
  const [categories, setCategories] = useState();
  const [productTop10, setProductTop10] = useState();

  useEffect(() => {
    const getCate = async () => {
      const { data } = await getAll();
      setCategories(data);
    };

    const getTop10 = async () => {
      const { data } = await getFavorites();
      setProductTop10(data);
    };

    getTop10();
    getCate();
  }, []);

  return (
    <aside className="hidden lg:block lg:col-span-3 pt-3">
      <div>
        <h2 className="uppercase font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">
          Danh mục sản phẩm
        </h2>
        <ul className="grid grid-cols-1 divide-y mt-3">
          {categories?.map((item, index) => (
            <li key={index}>
              <Link
                to={`/danh-muc/${item.slug}`}
                className={`${
                  item._id === cateId
                    ? "text-black font-semibold"
                    : "text-[#D9A953]"
                } block uppercase py-2 transition duration-300 ease-linear hover:text-black`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3">
        <h2 className="uppercase font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">
          Lọc theo giá
        </h2>
      </div>
      <div className="mt-5">
        <h2 className="uppercase font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">
          Sản phẩm yêu thích
        </h2>
        <ul className="grid grid-cols-1 divide-y mt-2">
          {productTop10?.map((item, index) => (
            <li className="py-3 flex" key={index}>
              <Link
                to={`/san-pham/${item.slug}`}
                className="block bg-[#f7f7f7]"
              >
                <img
                  className="w-16 h-16 object-cover block"
                  src={item.image}
                  alt=""
                />
              </Link>
              <div className="ml-3 flex-1">
                <Link
                  to={`/san-pham/${item.slug}`}
                  className="uppercase transition duration-300 ease-linear hover:text-black block text-[#D9A953] text-sm"
                >
                  {item.name}
                </Link>
                <span className="font-semibold">
                  {formatCurrency(item.price)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default NavProduct;
