import React, { useContext, useState } from "react";
import styles from "./Report.module.scss";
import Modal from "react-modal";
import { ModalContext } from "../../App";
import ButtonHalf from "../ButtonHalf";
import { discordLink } from "../../consts";

Modal.setAppElement("#root");

export default function Report(props) {
    const modalContext = useContext(ModalContext);
    const [whatToReport, setWhatToReport] = useState(null);

    const closeModal = () => {
        modalContext.setOpenModal("");
    };

    return (
        <Modal isOpen={modalContext.openModal === "report"} onRequestClose={closeModal} contentLabel={"Report"} className={styles.modal} overlayClassName={styles.overlay}>
            <h2 className={styles.headline}>
                Report {whatToReport === "player" ? "a Player" : ""} {whatToReport === "bug" ? "a bug" : ""}
            </h2>
            {whatToReport == null && (
                <div>
                    <h3>What do you want to report?</h3>
                    <div className={styles.buttonBox}>
                        <ButtonHalf onClick={() => setWhatToReport("bug")} text="A bug" />
                        <ButtonHalf onClick={() => setWhatToReport("player")} text="A player" />
                    </div>
                </div>
            )}
            {whatToReport === "player" && (
                <div>
                    <div className={styles.buttonBox}>
                        <ButtonHalf text="A bug" />
                        <ButtonHalf text="A player" />
                    </div>
                </div>
            )}
            {whatToReport === "bug" && (
                <div>
                    <h3>Is the bug related to the web interface?</h3>
                    <a href={"https://github.com/realmayus/secrethitler-frontend/issues/new"}>➞ Report frontend bug</a>
                    <h3>Is the bug related to the game itself?</h3>
                    <a href={"https://github.com/realmayus/secrethitler-backend/issues/new"}>➞ Report backend bug</a>
                    <br />
                    <p>
                        If you're unsure or don't have a GitHub account and don't want to create one, you can also report bugs on our <a href={discordLink}>Discord server</a>.
                    </p>
                </div>
            )}
        </Modal>
    );
}
