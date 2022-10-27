import { useState, useEffect, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Details.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext, AUTH_ACTION } from "../../../context/AuthContextProvider";
import { GetProductByIdApi } from "../../../services/productService";
import { postOrderApi } from "../../../services/orderService";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import config from "../../../config";

const cx = classNames.bind(styles);
function Details() {
    const productId = useParams().id;
    const [authState, dispatch] = useContext(AuthContext);
    const { isLoggedIn, role } = authState;
    const [product, setProduct] = useState({});

    const [numberOrder, setNumberOrder] = useState(0);
    const [numberInStock, setNumberInStock] = useState(product.unitsInStock);

    const navigate = useNavigate();

    const handleIncreaseNumberOrder = () => {
        if (numberOrder < product.unitsInStock) {
            setNumberOrder((prev) => prev + 1);
            setNumberInStock((prev) => prev - 1);
        }
    };

    const handleDecreaseNumberOrder = () => {
        if (numberOrder >= 1) {
            setNumberOrder((prev) => prev - 1);
            setNumberInStock((prev) => prev + 1);
        }
    };

    //handle order action
    const handleOrderAction = async () => {
        if (!isLoggedIn) {
            dispatch({ type: AUTH_ACTION.OPEN_MODAL });
        } else {
            if (numberOrder !== 0) {
                await postOrderApi({
                    memberId: authState.member.memberId,
                    freight: 0,
                    orderDetail: {
                        productId: productId,
                        quantity: numberOrder,
                        discount: 0,
                    },
                });
                toast.success(`Order ${numberOrder} '${product.productName}' successfully!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                navigate("/orders");
            } else {
                toast.error("Order number cannot be 0!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            }
        }
    };

    //Get Product By Id
    useEffect(() => {
        const getProductById = async () => {
            const product = await GetProductByIdApi(productId);
            setProduct(product);
            setNumberInStock(product.unitsInStock);
        };
        getProductById();
    }, [productId]);

    const handleRenderImageOfCategory = (id) => {
        switch (id) {
            case 1:
                return "https://vivina.net/static/media/images/news/ca-cau-vong-boesemans-rainbowfish-1536x1021-1629620543.jpg";
            case 2:
                return "https://p2u4d7g7.stackpathcdn.com/wp-content/uploads/sites/11/2019/09/orinoco_altum-copy.jpg";
            case 3:
                return "https://www.aquariumfishonline.com.au/wp-content/uploads/2021/11/Discus-Red-Malboro-Melon.jpg";
            case 4:
                return "https://st2.depositphotos.com/1037861/6377/i/600/depositphotos_63772197-stock-photo-corydoras-fish.jpg";
            case 5:
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzTUMX32EM2RXsT3q5_g2i7vPmczPX3is80w&usqp=CAU";
            default:
                return "https://rlv.zcache.ca/tbd_stamp_classic_round_sticker-r4784b0e615b0424bac1e083b0ef4ec4e_0ugmp_8byvr_736.jpg";
        }
    };

    return (
        <div className={cx("row")}>
            <div className={cx("col-lg-5", "item-photo")}>
                <img
                    style={{ maxWidth: "100%", width: "450px", height: "450px" }}
                    src={handleRenderImageOfCategory(product.categoryId)}
                    alt="fish"
                />
            </div>
            <div className={cx("col-lg-7")} style={{ border: "0px solid gray", margin: "auto" }}>
                {/* Name */}
                <h3 style={{ fontSize: "3rem", fontWeight: "bold" }}>{product.productName}</h3>
                {/* Category */}
                <h5 style={{ color: "#337ab7" }}>
                    belong to{" "}
                    <span style={{ textDecoration: "underline", fontWeight: 500 }}>
                        {product.categoryName}
                    </span>
                </h5>
                {/* Unit Price */}
                <h3 style={{ marginTop: 0 }}>{product.unitPrice} VNĐ</h3>
                {/* Detalles especificos del producto */}
                <div className={cx("section")}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut venenatis
                        sem. Mauris malesuada lorem sit amet eros molestie, vel pharetra risus
                        ultricies. Vivamus ornare nisi at auctor lacinia. Integer faucibus euismod
                        aliquet. In molestie interdum nulla volutpat accumsan. Morbi cursus tellus
                        in est auctor placerat. Fusce quis nulla elit. Donec ac porttitor eros, ac
                        posuere sem. Proin tempor, mi non iaculis dapibus, arcu sem iaculis neque,
                        et lobortis turpis magna et turpis. Mauris vel tellus eu mi commodo
                        condimentum in ut dui. Praesent in quam a dui gravida finibus eget quis
                        quam. Vivamus risus erat, molestie vitae condimentum blandit, vehicula in
                        urna. Vestibulum faucibus interdum ligula, quis bibendum ligula convallis a.
                        Aenean nec gravida augue. Ut in sagittis justo, at laoreet dolor.
                    </p>
                </div>
                <div
                    className={cx("section", "d-flex", "align-items-center")}
                    style={{ paddingBottom: 20 }}
                >
                    <h6 className={cx("title-attr", "mb-0", "me-2")}>
                        <small>Number in stock</small>
                    </h6>
                    <div>
                        <span style={{ fontWeight: "bold" }}>{numberInStock}</span>
                    </div>
                </div>
                {role !== config.roles.ADMIN && (
                    <>
                        <div
                            className={cx("section", "d-flex", "align-items-center")}
                            style={{ paddingBottom: 20 }}
                        >
                            <h6 className={cx("title-attr", "mb-0", "me-2")}>
                                <small>Number to order</small>
                            </h6>
                            <div className={cx("quantity", "d-flex", "align-items-center")}>
                                <button
                                    className={cx("btn-minus", "me-2")}
                                    onClick={handleDecreaseNumberOrder}
                                >
                                    <span>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </span>
                                </button>
                                <input
                                    type="number"
                                    value={numberOrder}
                                    onChange={(e) => setNumberOrder(e.target.value)}
                                />
                                <button
                                    className={cx("btn-plus", "ms-2")}
                                    onClick={handleIncreaseNumberOrder}
                                >
                                    <span>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className={cx("section")} style={{ paddingBottom: 20 }}>
                            <button
                                className={cx("btn", "btn-success")}
                                style={{ width: "100px" }}
                                onClick={handleOrderAction}
                            >
                                Order
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Details;
