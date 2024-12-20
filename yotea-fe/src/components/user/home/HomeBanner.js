import Slider from "react-slick";
import { useGetSlidersQuery } from "../../../api/slider";
import NextArrow from "../../admin/NextArrow";
import PrevArrow from "../../admin/PrevArrow";

const HomeBanner = () => {
    const { data: sliders } = useGetSlidersQuery("");

    const settings = {
        autoplay: true,
        infinite: true,
        nextArrow: <NextArrow onClick={() => {}} />,
        prevArrow: <PrevArrow onClick={() => {}} />
    }

    return (
        <section>
            <ul id="banner" className="relative group">
                <Slider {...settings}>
                    {sliders?.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.url}
                                title={item.title}
                                style={{ backgroundImage: `url(${item.image})` }}
                                className="block pt-[34%] bg-center bg-cover bg-no-repeat"
                                target="_blank"
                            />
                        </li>
                    ))}
                </Slider>
            </ul>
        </section>
    )
}

export default HomeBanner;