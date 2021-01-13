import React, { useContext, useState, useEffect } from "react";
import styles from "./SignIn.module.scss";
import Modal from "react-modal";
import { ModalContext, UserContext } from "../../App";
import ButtonHalf from "../ButtonHalf";
import { login, requestTemporaryAccount } from "../../api";
import { handleRequestError } from "../../util";
import Textbox from "../Input/Textbox";

Modal.setAppElement("#root");

export default function SignIn(props) {
    const modalContext = useContext(ModalContext);
    const userContext = useContext(UserContext);

    const closeModal = () => {
        modalContext.setOpenModal("");
        resetFields();
    };

    const resetFields = () => {
        setUsername("");
        setPassword("");
        setError(undefined);
    };

    useEffect(() => {
        if (modalContext.openModal !== "signIn") {
            resetFields();
        }
    }, [modalContext.openModal]);

    const submit = () => {
        login(username, password).then(
            res => {
                userContext.setUserData(res);
                userContext.setToken(res.token);
                userContext.setLoggedIn(true);
                closeModal();
            },
            err => {
                if (err.status == null || !(err.status >= 400 && err.status <= 499)) {
                    handleRequestError(err, modalContext.showAlert);
                } else {
                    err.json().then(json => setError(json.error));
                }
            },
        );
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);

    return (
        <Modal isOpen={modalContext.openModal === "signIn"} onRequestClose={closeModal} contentLabel={"Sign in"} className={styles.modal} overlayClassName={styles.overlay}>
            <h2 className={styles.headline}>Sign In</h2>
            <p>
                Don't want to create an account? Play with a <button>temporary account</button>
            </p>
            {error != null && (
                <div className={styles.error}>
                    <p>{error}</p>
                </div>
            )}
            <div className={styles.inputs}>
                <Textbox label={"Username"} type={"text"} onChange={e => setUsername(e.target.value)} value={username} />
                <Textbox label={"Password"} type={"password"} onChange={e => setPassword(e.target.value)} value={password} />
                <button style={{ marginTop: 10 }} onClick={() => modalContext.setOpenModal("forgot")}>
                    Recover account
                </button>
            </div>

            <div className={styles.buttonBox}>
                <ButtonHalf text="Sign In" onClick={submit} />
                <button onClick={() => modalContext.setOpenModal("signUp")}>Sign Up</button>
            </div>
        </Modal>
    );
}
