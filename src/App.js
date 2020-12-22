import './App.scss';
import React, {createContext, useState, useEffect} from "react";
import Header from "./components/Header";
import Router from "./Router";
import {checkIfLoggedIn} from "./api";
import InfoBar from "./components/Minor/InfoBar";
import {discordLink} from "./consts";
import AlertBox from "./components/modal/AlertBox";
import About from "./components/modal/About";
import Report from "./components/modal/Report";
import {handleRequestError} from "./util";
import SignIn from "./components/modal/SignIn";
import Register from "./components/modal/Register";
import Forgot from "./components/modal/Forgot";


export const UserContext = createContext(null);
export const ModalContext = createContext(null);

function App() {
    const [userData, setUserData] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [info, setInfo] = useState(null)
    const [alertBoxDetails, setAlertBoxDetails] = useState({})
    const [openModal, setOpenModal] = useState("");

    const getOtherUserData = (userID) => {

    }

    const showAlert = (headline, content) => {
        setAlertBoxDetails({headline, content})
        setOpenModal("alertBox");
    }

    const checkLoginStatus = () => {
        checkIfLoggedIn().then(res => {
                if (res.isLoggedIn) {
                    console.log("Already logged in.")
                    setLoggedIn(true);
                }
            }
        ).catch(res => {
            console.log(res);
            if(res.status == null) {
                setInfo({message: "Couldn't connect to server",
                    moreOnClick: () => handleRequestError(res, showAlert),
                    msgType: "warning"
                });
            } else {
                console.log("Not already logged in.")
            }
            setLoggedIn(false);
        })
    }

    useEffect(() => {
        checkLoginStatus()
    }, [])

    return (
        <div className="App">
            <ModalContext.Provider value={{openModal, setOpenModal, showAlert}}>
                <UserContext.Provider value={{userData, setUserData, loggedIn, setLoggedIn}}>
                    { info != null &&
                        <InfoBar type={info.msgType} message={info.message} moreOnClick={() => info.moreOnClick()}/>
                    }

                    <AlertBox headline={alertBoxDetails.headline}>
                        {alertBoxDetails.content}
                    </AlertBox>
                    <About/>
                    <SignIn/>
                    <Register/>
                    <Forgot/>
                    <Report/>
                    <Router/>
                </UserContext.Provider>
            </ModalContext.Provider>
        </div>
  );
}

export default App;
