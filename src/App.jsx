import * as styles from "./App.scss";
import React, { createContext, useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Router from "./Router.jsx";
import { checkIfLoggedIn, getOtherUserDataApi } from "./api.js";
import InfoBar from "./components/Minor/InfoBar.jsx";
import { discordLink } from "./consts.js";
import AlertBox from "./components/modal/AlertBox.jsx";
import About from "./components/modal/About.jsx";
import Report from "./components/modal/Report.jsx";
import { handleRequestError } from "./util";
import SignIn from "./components/modal/SignIn";
import Register from "./components/modal/Register";
import Forgot from "./components/modal/Forgot";
import ProfileDropdown from "./components/Minor/ProfileDropdown";
import SignInDecision from "./components/modal/SignInDecision";

export const ModalContext = createContext(null);
export const UserContext = createContext(null);

function App() {
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [info, setInfo] = useState(null);
    const [game, setGame] = useState(null);
    const [alertBoxDetails, setAlertBoxDetails] = useState({});
    const [openModal, setOpenModal] = useState("");
    const [cachedUserData, setCachedUserData] = useState([]);

    const getOtherUserData = async userID => {
        if (userID == null) return Promise.reject();
        const cacheResult = cachedUserData.find(x => x.userID === userID);

        if (cacheResult == null) {
            getOtherUserDataApi(userID).then(
                res => {
                    if (res.player != null) {
                        setCachedUserData([...cachedUserData, res.player]);
                    } else {
                        setCachedUserData([...cachedUserData, { userID: userID }]);
                    }
                    return Promise.resolve(res.player);
                },
                err => {
                    console.log(err);
                    if (err.status == null) {
                        handleRequestError(err, showAlert);
                    }
                },
            );
        } else {
            return Promise.resolve(cacheResult);
        }
    };

    const showAlert = (headline, content) => {
        setAlertBoxDetails({ headline, content });
        setOpenModal("alertBox");
    };

    const checkLoginStatus = () => {
        checkIfLoggedIn().then(
            res => {
                if (res.isLoggedIn) {
                    console.log("Already logged in.");
                    setLoggedIn(true);
                    setUserData(res.user);
                    setToken(res.token);
                }
            },
            err => {
                console.log(err);
                if (err.status == null) {
                    setInfo({
                        message: "Couldn't connect to server",
                        moreOnClick: () => handleRequestError(err, showAlert),
                        msgType: "warning",
                    });
                } else {
                    console.log("Not already logged in.");
                }
                setLoggedIn(false);
            },
        );
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <div className={styles.noSelect}>
            <ModalContext.Provider value={{ openModal, setOpenModal, showAlert }}>
                <UserContext.Provider
                    value={{
                        userData,
                        setUserData,
                        loggedIn,
                        setLoggedIn,
                        setGame,
                        game,
                        setToken,
                        token,
                        getOtherUserData,
                    }}
                >
                    {info != null && <InfoBar type={info.msgType} message={info.message} moreOnClick={() => info.moreOnClick()} />}

                    <AlertBox headline={alertBoxDetails.headline}>{alertBoxDetails.content}</AlertBox>
                    <About />
                    <SignIn />
                    <Register />
                    <Forgot />
                    <Report />
                    <SignInDecision />
                    <ProfileDropdown />

                    <Router />
                </UserContext.Provider>
            </ModalContext.Provider>
        </div>
    );
}

export default App;
