import React, {useContext, useEffect, useState} from "react";
import styles from "./Register.module.scss";
import Modal from "react-modal";
import {ModalContext, UserContext} from "../../App";
import ButtonHalf from "../ButtonHalf";
import {login, signup} from "../../api";
import {emailValidationRegex, handleRequestError} from "../../util";
import Textbox from "../Input/Textbox";


Modal.setAppElement('#root');

export default function Register(props) {

    const modalContext = useContext(ModalContext);
    const userContext = useContext(UserContext);

    const closeModal = () => {
        modalContext.setOpenModal("");
        resetFields();
    }
    const resetFields = () => {
        setEmail("");
        setUsername("");
        setPassword("");
        setError(null);
    }

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const submit = () => {
        if (email.length <= 5 || !emailValidationRegex.test(email)) {
            setError("The email address you entered is invalid.");
        } else if (username.length < 5) {
            setError("Your username must be at least 5 characters long.");
        } else if (password.length < 6) {
            setError("Your password must be at least 6 characters long.")
        } else {
            signup(email, username, password).then(() => {
                    login(username, password).catch(
                    ).then(res => {
                            userContext.setUserData(res);
                            userContext.setLoggedIn(true);
                            closeModal();
                        },
                        err => {
                            if (err.status == null || !(err.status >= 400 && err.status <= 499)) {
                                handleRequestError(err, modalContext.showAlert)
                            } else {
                                err.json().then(json => setError(json.error));
                            }
                        }
                    )
                }, err => {
                    if (err.status == null || !(err.status >= 400 && err.status <= 499)) {
                        handleRequestError(err, modalContext.showAlert)
                    } else {
                        err.json().then(json => setError(json.error), () => handleRequestError(err, modalContext.showAlert));
                    }
                }
            )
        }

    }

    /*
    In case another modal gets overlaid, reset this modal's fields
     */
    useEffect(() => {
        if (modalContext.openModal !== "signUp") {
            resetFields();
        }
    }, [modalContext.openModal])

    return (
        <Modal
            isOpen={modalContext.openModal === "signUp"}
            onRequestClose={closeModal}
            contentLabel={"Sign Up"}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2 className={styles.headline}>Sign Up</h2>
            <p>We won't use your data for anything else than the game itself. Your email address is only used for
                account recovery.</p>
            {error != null &&
            <div className={styles.error}>
                <p>{error}</p>
            </div>
            }
            <div className={styles.inputs}>
                <Textbox label={"E-Mail"} type={"text"} onChange={(e) => setEmail(e.target.value)} value={email}/>
                <Textbox label={"Username"} type={"text"} onChange={(e) => setUsername(e.target.value)}
                         value={username}/>
                <Textbox label={"Password"} type={"password"} onChange={(e) => setPassword(e.target.value)}
                         value={password}/>
            </div>

            <div className={styles.buttonBox}>
                <ButtonHalf text="Sign Up" onClick={submit}/>
                <button onClick={() => modalContext.setOpenModal("signIn")}>Sign In</button>
            </div>
        </Modal>
    )
}