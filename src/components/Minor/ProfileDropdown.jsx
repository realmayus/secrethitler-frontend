import React, { useContext, useRef, useState } from "react";
import styles from "./ProfileDropdown.module.scss";
import { ModalContext, UserContext } from "../../App";
import dropdownArrow from "../../assets/dropdownArrow.svg";
import { handleRequestError, useOutsideAlerter } from "../../util";
import { signout } from "../../api";
import { useLocation } from "react-router-dom";
import Anime from "./Anime";

export default function ProfileDropdown(props) {
    const userContext = useContext(UserContext);
    const modalContext = useContext(ModalContext);
    const [expanded, setExpanded] = useState(false);
    const wrapperRef = useRef(null);
    const location = useLocation();
    useOutsideAlerter(wrapperRef, () => setExpanded(false));
    if (location.pathname.startsWith("/g") || location.pathname.startsWith("/game")) return <></>;
    return (
        <div className={styles.outerWrapper} ref={wrapperRef}>
            <button className={styles.innerWrapper} onClick={() => setExpanded(!expanded)}>
                <span>{userContext.userData != null && userContext.loggedIn ? userContext.userData.username : "Not signed in"}</span>
                <img alt="dropdown" src={dropdownArrow} />
            </button>
            {expanded && (
                <Anime translateY={[20, 0]} easing={"easeOutElastic"} opacity={[0, 1]}>
                    <div className={styles.dropdown}>
                        {!userContext.loggedIn ? (
                            <ul className={styles.dropdownList}>
                                <li>
                                    <button
                                        onClick={() => {
                                            modalContext.setOpenModal("signIn");
                                            setExpanded(false);
                                        }}
                                    >
                                        Sign In
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            modalContext.setOpenModal("signUp");
                                            setExpanded(false);
                                        }}
                                    >
                                        Create Account
                                    </button>
                                </li>
                            </ul>
                        ) : (
                            <ul className={styles.dropdownList}>
                                <li>
                                    <button
                                        onClick={() =>
                                            signout().then(
                                                () => {
                                                    setExpanded(false);
                                                    userContext.setUserData(null);
                                                    userContext.setLoggedIn(false);
                                                },
                                                err => {
                                                    setExpanded(false);
                                                    handleRequestError(err, modalContext.showAlert);
                                                },
                                            )
                                        }
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </Anime>
            )}
        </div>
    );
}
