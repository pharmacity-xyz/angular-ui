import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Slider.module.scss";

import Carousel from "react-bootstrap/Carousel";

const cx = classNames.bind(styles);

function Slider() {
    const sliders = [
        {
            id: 1,
            url: "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1369987284/image_1369987284.jpg?io=getty-c-w1280",
            caption: "Welcome to our shop",
        },
        {
            id: 2,
            url: "http://blog.medikabazaar.com/wp-content/uploads/2018/07/Maintenance-of-medical-devices-Problems-and-Solutions.jpg",
            caption: "Welcome to our shop",
        },
        {
            id: 3,
            url: "https://www.envisioninteligence.com/wp-content/uploads/2018/02/How-to-Increase-Medical-Devices-Sales.jpeg",
            caption: "Welcome to our shop",
        },
        {
            id: 4,
            url: "https://media1.faz.net/ppmedia/aktuell/wirtschaft/300393905/1.6678201/article_multimedia_overview/der-luebecker.jpg",
            caption: "Welcome to our shop",
        },
        {
            id: 5,
            url: "https://medizin-und-technik.industrie.de/wp-content/uploads/2/0/20190207_Draeger_SDC_09167655-AB77-4834-BEC5-3C4982DCF15F.jpg",
            caption: "Welcome to our shop",
        },
    ];

    //handle auto change
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div>
            <div
                id="carousel-example-1z"
                className={cx("container", "carousel", "slide", "carousel-fade", "pt-4")}
            >
                {/*/.Indicators*/}
                <div className={cx("carousel-inner")} role="listbox">
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {sliders.map((slider) => (
                            <Carousel.Item key={slider.id}>
                                <div className="carousel-item active">
                                    <div
                                        className="view"
                                        style={{
                                            backgroundImage: `url(${slider.url})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            height: "300px",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        <Carousel.Caption>
                                            <h3>{slider.caption}</h3>
                                        </Carousel.Caption>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Slider;
