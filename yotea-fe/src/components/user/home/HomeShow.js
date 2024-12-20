import Slider from "react-slick";
import NextArrow from "../../admin/NextArrow";
import PrevArrow from "../../admin/PrevArrow";

const HomeShow = () => {
    const settings = {
        autoplay: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: <NextArrow onClick={() => {}} />,
        prevArrow: <PrevArrow onClick={() => {}} />
    }

    return (
        <section className="px-3 py-9">
            <div className="text-center">
                <h3 className="uppercase text-center block text-[#D9A953] text-2xl font-semibold">#trasuayotea</h3>
                <p>Những hình ảnh update từ Instagram.</p>
            </div>
            <div className="mt-5 group" id="home__show">
                <Slider {...settings}>
                    <div className="px-1">
                        <div style={{backgroundImage: 'url(https://res.cloudinary.com/levantuan/image/upload/v1642602026/fpoly/asm-js/188771575_2218613684942468_2579336373501724462_n_xalanv.jpg)'}} className="bg-cover bg-center bg-no-repeat pt-[100%] rounded-xl" />
                    </div>
                    <div className="px-1">
                        <div style={{backgroundImage: 'url(https://res.cloudinary.com/levantuan/image/upload/v1644636592/assignment-js/189575039_2218613701609133_1807153932665168509_n_eu8dlb.jpg)'}} className="bg-cover bg-center bg-no-repeat pt-[100%] rounded-xl" />
                    </div>
                    <div className="px-1">
                        <div style={{backgroundImage: 'url(https://res.cloudinary.com/levantuan/image/upload/v1644636625/assignment-js/192162539_2218613691609134_315152083587119036_n.jpg_cvupn5.jpg)'}} className="bg-cover bg-center bg-no-repeat pt-[100%] rounded-xl" />
                    </div>
                    <div className="px-1">
                        <div style={{backgroundImage: 'url(https://res.cloudinary.com/levantuan/image/upload/v1644636690/assignment-js/164808803_2168878463249324_4976714040347378146_n.jpg_pbxg7s.jpg)'}} className="bg-cover bg-center bg-no-repeat pt-[100%] rounded-xl" />
                    </div>
                    <div className="px-1">
                        <div style={{backgroundImage: 'url(https://res.cloudinary.com/levantuan/image/upload/v1644636710/assignment-js/142499890_2118294831641021_8362360178489540776_n.jpg_dwbaqb.jpg)'}} className="bg-cover bg-center bg-no-repeat pt-[100%] rounded-xl" />
                    </div>
                    <div className="px-1">
                        <div style={{backgroundImage: 'url(https://res.cloudinary.com/levantuan/image/upload/v1644636731/assignment-js/133575440_2092707987533039_2284287378785690382_n.jpg_iga8xi.jpg)'}} className="bg-cover bg-center bg-no-repeat pt-[100%] rounded-xl" />
                    </div>
                    <div className="px-1">
                        <div style={{backgroundImage: 'url(https://res.cloudinary.com/levantuan/image/upload/v1644636763/assignment-js/131232338_2081100108693827_8397922432733191698_n.jpg_jcaetm.jpg)'}} className="bg-cover bg-center bg-no-repeat pt-[100%] rounded-xl" />
                    </div>
                    <div className="px-1">
                        <div style={{backgroundImage: 'url(https://res.cloudinary.com/levantuan/image/upload/v1644636776/assignment-js/127662748_2069207806549724_7155889781395155286_n.jpg_ncvek6.jpg)'}} className="bg-cover bg-center bg-no-repeat pt-[100%] rounded-xl" />
                    </div>
                </Slider>
            </div>
        </section>
    )
}

export default HomeShow;