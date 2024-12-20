import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import NextArrow from "../../admin/NextArrow";
import PrevArrow from "../../admin/PrevArrow";

const HomeFeedback = () => {
  const settings = {
    autoplay: true,
    infinite: true,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
  };

  return (
    <section
      className="py-16 mt-16 bg-center bg-cover bg-no-repeat group"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/levantuan/image/upload/v1642602275/fpoly/asm-js/pizi_coffe_1_r8_clients_say_row_bg_img_vc7e3r.jpg)",
      }}
    >
      <div className="container max-w-6xl mx-auto">
        <div>
          <h3 className="uppercase text-center block text-[#D9A953] text-2xl font-semibold">
            KHÁCH HÀNG NÓI GÌ
          </h3>
          <p className="text-center text-sm text-gray-300 font-semibold mt-1">
            1500+ KHÁCH HÀNG HÀI LÒNG
          </p>
        </div>
        <ul>
          <Slider {...settings}>
            <li className="text-center mt-9">
              <img
                src="https://res.cloudinary.com/levantuan/image/upload/v1642602479/fpoly/asm-js/chang-trai-lai-3-dong-mau-va-nhung-bac-si-noi-tieng-tren-mang-4abe91-300x300_uah3ea.jpg"
                alt=""
                className="w-24 h-24 object-cover rounded-full mx-auto"
              />
              <ul className="flex text-yellow-500 justify-center mt-2">
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
              </ul>
              <p className="font-semibold text-gray-300 text-xl italic">
                Tường Vy
              </p>
              <p className="mt-1 text-gray-300">
                {" "}
                Mình rất thích đưa khách hàng của mình đến đây bởi vì phong cách
                rất chuyên nghiệp.Hơn nữa thức uống ở đây rất ngon, có hương vị
                rất khác biệt, các vị khách của mình vô cùng thích.{" "}
              </p>
            </li>
            <li className="text-center mt-9">
              <img
                src="https://res.cloudinary.com/levantuan/image/upload/v1644636235/assignment-js/img_1062_89af8c0f-3d9b-49c5-4b09-33fc8d0a2f0d-300x300_rb8mcq.jpg"
                alt=""
                className="w-24 h-24 object-cover rounded-full mx-auto"
              />
              <ul className="flex text-yellow-500 justify-center mt-2">
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
              </ul>
              <p className="font-semibold text-gray-300 text-xl italic">
                Ngô Lệ Hằng
              </p>
              <p className="mt-1 text-gray-300">
                {" "}
                Nếu như muốn được thư giãn hãy nghe một bản nhạc. Nếu muốn tìm
                một hương vị trà chanh đúng gu nhất với mình thì hãy đến với Tea
                House. Nơi luôn khiến mình hài lòng nhất.{" "}
              </p>
            </li>
            <li className="text-center mt-9">
              <img
                src="https://res.cloudinary.com/levantuan/image/upload/v1644636291/assignment-js/4302df8958f010703fef2d8187d869a6-280x280_yvpuzs.jpg"
                alt=""
                className="w-24 h-24 object-cover rounded-full mx-auto"
              />
              <ul className="flex text-yellow-500 justify-center mt-2">
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                </li>
              </ul>
              <p className="font-semibold text-gray-300 text-xl italic">
                Nguyễn Quang Vinh
              </p>
              <p className="mt-1 text-gray-300">
                {" "}
                Không gian được thiết kế quá tuyệt vời luôn giúp mình có nhiều
                idea và cảm hứng để mình sáng tạo. Hơn nữa chất lượng đồ uống ở
                đây vô cùng vừa ý mình, Tea House là sự lựa chọn tuyệt vời.{" "}
              </p>
            </li>
          </Slider>
        </ul>
      </div>
    </section>
  );
};

export default HomeFeedback;
