import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { getAll } from "../../api/store";
import { useForm } from "react-hook-form";
import { add } from "../../api/contact";
import { toast } from "react-toastify";
import { updateTitle } from "../../utils";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập họ tên"),
  store: yup.string().required("Vui lòng chọn chi nhánh phản hồi"),
  content: yup.string().required("Vui lòng nhập nội dung phản hồi"),
  confirm: yup
    .bool()
    .oneOf([true], "Vui lòng đồng ý với điều khoản của chúng tôi"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không đúng định dạng"),
  phone: yup
    .string()
    .required("Vui lòng nhập sdt")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Số điện thoại không đúng định dạng"
    ),
});

const ContactPage = () => {
  const [stores, setStores] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ confirm, ...dataInput }) => {
    try {
      await add(dataInput);
      toast.success("Gửi liên hệ thành công");
      reset();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
  };

  useEffect(() => {
    const getStores = async () => {
      const { data } = await getAll();
      setStores(data);
    };
    getStores();
    updateTitle("Liên hệ");
  }, []);

  return (
    <>
      <section className="container max-w-6xl mx-auto px-3 py-8 text-center">
        <h1 className="text-2xl font-semibold text-[#D9A953] mb-2">
          Liên hệ với Yotea
        </h1>
        <p>
          Từng ngày Yotea trở nên hoàn thiện hơn về diện mạo, chất lượng sản
          phẩm dịch vụ là nhờ sự đóng góp ý kiến của quý khách hàng. Để cảm nhận
          được sự thay đổi ấy, đừng ngần ngại nói với Yotea nhé.
        </p>
      </section>
      <section className="bg-[#EEE8DF] py-16">
        <form
          action=""
          className="container max-w-6xl mx-auto px-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <input
                type="text"
                {...register("name")}
                placeholder="Họ và tên"
                id="contact__form-name"
                className="w-full rounded-full outline-none h-10 px-4 shadow-sm"
              />
              <div className="text-sm mt-0.5 text-red-500">
                {errors.name?.message}
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <input
                type="text"
                {...register("email")}
                placeholder="Email"
                id="contact__form-email"
                className="w-full rounded-full outline-none h-10 px-4 shadow-sm"
              />
              <div className="text-sm mt-0.5 text-red-500">
                {errors.email?.message}
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <input
                type="text"
                {...register("phone")}
                placeholder="Số điện thoại"
                id="contact__form-phone"
                className="w-full rounded-full outline-none h-10 px-4 shadow-sm"
              />
              <div className="text-sm mt-0.5 text-red-500">
                {errors.phone?.message}
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <select
                id="contact__form-store"
                {...register("store")}
                className="outline-none w-full rounded-full h-10 px-4 shadow-sm"
              >
                <option value="">Cửa hàng phản hồi</option>
                {stores?.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="text-sm mt-0.5 text-red-500">
                {errors.store?.message}
              </div>
            </div>
            <div className="col-span-12">
              <label
                htmlFor="contact__form-content"
                className="text-[#D9A953] font-semibold mb-1 text-lg block"
              >
                Nội dung phản hồi
              </label>
              <textarea
                id="contact__form-content"
                {...register("content")}
                cols={30}
                rows={10}
                placeholder="Nội dung phản hồi"
                className="w-full rounded-xl outline-none py-2 px-3 shadow-sm"
                defaultValue={""}
              />
              <div className="text-sm mt-0.5 text-red-500">
                {errors.content?.message}
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("confirm")}
                  id="contact__form-checkbox"
                />
                <label htmlFor="contact__form-checkbox" className="ml-2">
                  Tôi xác nhận các thông tin cá nhân cung cấp ở trên là hoàn
                  toàn chính xác và đồng ý để Yotea sử dụng các thông tin đó cho
                  mục đích giải quyết phản hồi.
                </label>
              </div>
              <div className="text-sm mt-0.5 text-red-500">
                {errors.confirm?.message}
              </div>
            </div>
          </div>
          <button className="block mx-auto mt-8 h-10 rounded-full bg-[#D9A953] text-white font-semibold px-4 transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
            Gửi phản hồi
          </button>
        </form>
      </section>
      <section className="container max-w-6xl mx-auto px-3 py-10 leading-relaxed">
        <h2 className="text-xl font-semibold text-[#D9A953] mb-1">
          Thỏa thuận bảo mật thông tin
        </h2>
        <p>
          {" "}
          Yotea cam kết giữ bí mật hoàn toàn thông tin của Quý khách hàng theo
          đúng quy định pháp luật nước sở tại về quyền bảo mật thông tin có liên
          quan. Trường hợp xảy ra khiếu nại, than phiền, Yotea có thể sẽ sử dụng
          thông tin khách hàng để chuyển giao đến bộ phận liên quan giải quyết:{" "}
        </p>
        <ul className="mb-5">
          <li>1. Nội bộ các bộ phận trực thuộc Yotea</li>
          <li>
            {" "}
            2. Bên thứ ba được ủy quyền chính thức từ Yotea cho việc giải quyết
            các than phiền, khiếu nại mang tính chất nghiêm trọng{" "}
          </li>
        </ul>
        <p>
          Thời gian giải quyết khiếu nại than phiền được tính dựa trên các ngày
          làm việc trong tuần từ thứ 2 đến thứ 6, thao giờ hành chính.{" "}
        </p>
        <ul className="mb-5">
          <li>
            1. Yotea cam kết bảo mật các thông tin mà khách hàng cung cấp và
            tuân thủ quy định pháp luật về bảo mật những thông tin liên quan.{" "}
          </li>
          <li>
            {" "}
            2. Thông tin cá nhân của khách hàng được sử dụng nhằm mục đích:{" "}
            <ul>
              <li>- Giải quyết khiếu nại, than phiền</li>
              <li>
                - Tiếp nhận ý kiến để cải thiện chất lượng sản phẩm dịch vụ
              </li>
              <li>- Cung cấp thông tin các chương trình khuyến mãi.</li>
            </ul>
          </li>
          <li>
            {" "}
            3. Yotea có thể tiết lộ thông tin của khách hàng cho mục đích giải
            quyết khiếu nại, than phiền của khách hàng cho:{" "}
            <ul>
              <li>
                - Các bộ phận trực thuộc Cty cổ phần TMDV Chào ngày mới - Trà
                sữa Yotea
              </li>
              <li>
                {" "}
                - Bên thứ ba được ủy quyền chính thức từ Trà sữa Yotea cho việc
                giải quyết các than phiền, khiếu nại mang tính chất nghiêm trọng{" "}
              </li>
            </ul>
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-[#D9A953] mb-1">LƯU Ý</h2>
        <p>
          {" "}
          Quý khách hàng vui lòng cung cấp đầy đủ chính xác các thông tin cá
          nhân để Yotea có thể liên hệ giải quyết vấn đề hoặc tiếp nhận ý kiến
          của khách hàng một cách nhanh nhất.{" "}
        </p>
        <p>
          {" "}
          Quá trình giải quyết và xử lý phản hồi của quý khách hàng sẽ chậm hơn
          vào các ngày Thứ bảy, Chủ nhật, ngày lễ.{" "}
        </p>
      </section>
    </>
  );
};

export default ContactPage;
