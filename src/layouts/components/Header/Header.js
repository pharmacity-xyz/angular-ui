import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faReceipt, faKey, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import "tippy.js/dist/tippy.css";
import Menu from "../../../components/Popper/Menu";

import Modal from "react-modal";
import AuthForm from "../../../components/AuthForm";

import { AuthContext, AUTH_ACTION } from "../../../context/AuthContextProvider";
import { LS } from "../../../utils/localStorage";
import config from "../../../config";

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();

    const [authState, dispatch] = useContext(AuthContext);
    const { isLoggedIn, openAuthModal, role } = authState;

    console.log(authState);

    const handleSignOut = () => {
        LS.removeLocalStorage("auth");
        dispatch({ type: AUTH_ACTION.LOGOUT });
        navigate("/");
    };

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            dispatch({ type: AUTH_ACTION.LOGIN });
        }
    }, [dispatch]);

    //custom modal
    const customStyles = {
        overlay: {
            zIndex: 2,
        },

        content: {
            top: "52%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "500px",
            minWidth: "300px",
            maxHeight: "700px",
            height: "auto",
            width: "30%",
            backgroundColor: "#FFFFFF",
            borderRadius: "25px",
        },
    };

    const [typeForm, setTypeForm] = useState("");

    function openModal(type) {
        dispatch({ type: AUTH_ACTION.OPEN_MODAL });
        setTypeForm(type);
    }

    function closeModal() {
        dispatch({ type: AUTH_ACTION.CLOSE_MODAL });
    }

    //User menu
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: "Profile",
            to: role === config.roles.ADMIN ? "/admin/profile" : "/profile",
        },
        role === config.roles.USER
            ? {
                  icon: <FontAwesomeIcon icon={faReceipt} />,
                  title: "Orders",
                  to: "/orders",
              }
            : null,
        {
            icon: <FontAwesomeIcon icon={faKey} />,
            title: "Change Password",
            to: role === config.roles.ADMIN ? "/admin/password/change" : "/password/change",
        },
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            title: "Log out",
            signOut: handleSignOut,
        },
    ];

    return (
        <nav
            className={cx(
                "navbar",
                "sticky-top",
                "navbar-expand-lg",
                "navbar-light",
                "white",
                "scrolling-navbar"
            )}
        >
            <div
                className={cx(
                    "container",
                    "d-flex",
                    "align-items-center",
                    "justify-content-between"
                )}
            >
                {/* Brand */}
                <Link className={cx("navbar-brand", "waves-effect")} to="/">
                    <strong className="blue-text">MedicalEquipmentShop</strong>
                </Link>

                <div className={cx("auth-action", "d-flex", "align-items-center")}>
                    {!isLoggedIn ? (
                        <>
                        
                            <button
                                className={cx("btn btn-primary")}
                                onClick={() => openModal("login")}
                            >
                                Log in
                            </button>
                            <button
                                className={cx("btn btn-success")}
                                onClick={() => openModal("signup")}
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <Menu items={userMenu}>
                            <div
                                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                            >
                                <span style={{ fontWeight: "500" }}>{authState.member.email}</span>
                                <FontAwesomeIcon icon={faUser} className={cx("user-icon")} />
                            </div>
                        </Menu>
                    )}
                </div>
                <Modal
                    height={typeForm === "signup" ? "80%" : "60%"}
                    isOpen={openAuthModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    {typeForm === "signup" ? <AuthForm type="signup" /> : <AuthForm type="login" />}
                </Modal>
            </div>
        </nav>
    );
}

export default Header;
