import React, { useContext } from "react";
import Modal from "react-modal";
import styles from "./AlertBox.module.scss";
import { ModalContext } from "../../App";

Modal.setAppElement("#root");

export default function AlertBox(props) {
    const modalContext = useContext(ModalContext);

    const closeModal = () => {
        modalContext.setOpenModal("");
    };

    return (
        <Modal
            isOpen={modalContext.openModal === "alertBox"}
            onRequestClose={closeModal}
            contentLabel={"Alert Box: " + props.headline}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2 className={styles.headline}>{props.headline}</h2>
            {props.children}
        </Modal>
    );
}
