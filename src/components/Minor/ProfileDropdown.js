import React, {useContext, useState, useRef} from "react";
import styles from "./ProfileDropdown.module.scss";
import {ModalContext, UserContext} from "../../App";
import dropdownArrow from "../../assets/dropdownArrow.svg";
import {useOutsideAlerter} from "../../util";

export default function ProfileDropdown(props) {
    const userContext = useContext(UserContext);
    const modalContext = useContext(ModalContext);
    const [expanded, setExpanded] = useState(false);
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef, () => setExpanded(false))

    return(
        <div className={styles.outerWrapper} ref={wrapperRef}>
            <button className={styles.innerWrapper} onClick={() => setExpanded(!expanded)}>
                <span>{userContext.loggedIn ? userContext.userData.username : "Not signed in"}</span>
                <img alt="dropdown" src={dropdownArrow} />
            </button>
            { expanded &&
                <div className={styles.dropdown}>
                    <ul className={styles.dropdownList}>
                        <li><button onClick={() => {
                            modalContext.setOpenModal("signIn");
                            setExpanded(false);
                        }}>Sign In</button></li>
                        <li><button onClick={() => {
                            modalContext.setOpenModal("signUp")
                            setExpanded(false);
                        }}>Create Account</button></li>
                    </ul>
                </div>
            }
        </div>
    )
}