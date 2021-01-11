import React, {useContext} from "react";
import styles from "./SignInDecision.module.scss";
import Modal from "react-modal";
import {ModalContext, UserContext} from "../../App";
import ButtonHalf from "../ButtonHalf";
import {requestTemporaryAccount} from "../../api";
import {handleRequestError} from "../../util";


Modal.setAppElement('#root');

export default function SignInDecision(props) {

    const modalContext = useContext(ModalContext);
    const userContext = useContext(UserContext);

    const closeModal = () => {
        modalContext.setOpenModal("");
    }

    return(
        <Modal
            isOpen={modalContext.openModal === "signInDecision"}
            onRequestClose={closeModal}
            contentLabel={"Sign in or use temporary account"}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2 className={styles.headline}>Sign in or play with temporary account?</h2>
            <p>If you don't want to sign in or create an account right now, you can also play with a temporary account.</p>
            <p>Keep in mind that playing anonymously will not save any stats.</p>
            <div className={styles.buttonBox}>
                <ButtonHalf text="Sign In" onClick={() => modalContext.setOpenModal("signIn")}/>
                <ButtonHalf text="Play anonymously" onClick={() => {
                    requestTemporaryAccount().catch(err => handleRequestError(err, modalContext.showAlert)).then( res => {
                            userContext.setUserData(res);
                            userContext.setLoggedIn(true);
                        }
                    )
                }}/>
            </div>
        </Modal>
    )
}