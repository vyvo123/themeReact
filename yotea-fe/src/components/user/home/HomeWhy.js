const HomeWhy = () => {
    return (
        <section style={{backgroundImage: 'url(https://res.cloudinary.com/levantuan/image/upload/v1642595093/fpoly/asm-js/bg_why_vzvhn6.jpg)'}} className="bg-cover bg-center bg-no-repeat py-20">
            <div className="container max-w-6xl mx-auto px-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <h2 className="uppercase text-[#D9A953] text-2xl font-semibold">TẠI SAO CHỌN CHÚNG TÔI</h2>
                    <p className="text-justify mt-3">YoTea mang đến cho khách hàng sự trải nghiệm tuyệt vời chất lượng đồ uống hảo hạng với những hạt cà phê rang xay được chọn lọc kỹ càng từ những vùng đất trồng nổi tiếng, khi pha cà phê vẫn giữ được hương vị đậm đà, thơm ngon và nguyên chất. </p>
                    <ul className="mt-10">
                        <li className="flex mt-5">
                            <img src="https://res.cloudinary.com/levantuan/image/upload/v1642595029/fpoly/asm-js/icon_why_1_rc8aau.png" alt="" className="w-14 h-14" />
                            <div className="pl-3">
                                <h3 className="font-semibold text-xl text-gray-800">Giá cả phải chăng</h3>
                                <p>Cam kết chỉ cung cấp cà phê nguồn gốc được kiểm soát chất lượng</p>
                            </div>
                        </li>
                        <li className="flex mt-5">
                            <img src="https://res.cloudinary.com/levantuan/image/upload/v1644636006/assignment-js/icon_why_2_gy4ky6.png" alt="" className="w-14 h-14" />
                            <div className="pl-3">
                                <h3 className="font-semibold text-xl text-gray-800">Hương vị tuyệt hảo</h3>
                                <p>Những đợt trà được lựa chọn cẩn thận ngay từ lúc đang ngâm mình trong sương</p>
                            </div>
                        </li>
                        <li className="flex mt-5">
                            <img src="https://res.cloudinary.com/levantuan/image/upload/v1644636006/assignment-js/icon_why_3_lerehz.png" alt="" className="w-14 h-14" />
                            <div className="pl-3">
                                <h3 className="font-semibold text-xl text-gray-800">Sản phẩm tự nhiên</h3>
                                <p>Cam kết chỉ cung cấp lá trà có nguồn gốc được kiểm soát chất lượng chặt</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div />
            </div>
        </section>
    )
}

export default HomeWhy;