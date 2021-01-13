import React, { useContext, useState, useEffect } from "react";
import styles from "./Forgot.module.scss";
import Modal from "react-modal";
import { ModalContext, UserContext } from "../../App";
import ButtonHalf from "../ButtonHalf";
import { requestTemporaryAccount } from "../../api";
import { emailValidationRegex, handleRequestError } from "../../util";
import Textbox from "../Input/Textbox";

Modal.setAppElement("#root");

export default function Forgot(props) {
    const modalContext = useContext(ModalContext);
    const userContext = useContext(UserContext);

    const closeModal = () => {
        modalContext.setOpenModal("");
        resetFields();
    };

    const resetFields = () => {
        setEmail("");
    };

    useEffect(() => {
        if (modalContext.openModal !== "forgot") {
            resetFields();
        }
    }, [modalContext.openModal]);

    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const submit = () => {
        if (!emailValidationRegex.test(email)) {
            setError("The email address you entered is invalid.");
            return;
        }
    };
    return (
        <Modal
            isOpen={modalContext.openModal === "forgot"}
            onRequestClose={closeModal}
            contentLabel={"Account Recovery"}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2 className={styles.headline}>Account Recovery</h2>
            <p>Enter your email addres and we will send you your username and a link for resetting your password.</p>
            {error != null && (
                <div className={styles.error}>
                    <p>{error}</p>
                </div>
            )}
            <div className={styles.inputs}>
                <Textbox label={"E-Mail"} type={"email"} onChange={e => setEmail(e.target.value)} value={email} />
            </div>

            <div className={styles.buttonBox}>
                <ButtonHalf text="Recover" onClick={submit} />
            </div>
        </Modal>
    );
}
