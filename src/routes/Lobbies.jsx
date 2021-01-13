import React, { useContext, useState, useEffect } from "react";
import styles from "./Lobbies.module.scss";
import Wordmark from "../components/Wordmark";
import { useHistory } from "react-router-dom";
import GameLobbyCard from "../components/Panels/GameLobbyCard";
import Stats from "../components/Panels/Stats";
import News from "../components/Panels/News";
import ButtonHalf from "../components/ButtonHalf";
import Filters from "../components/Panels/Filters";
import { ModalContext, UserContext } from "../App";
import SignInDecision from "../components/modal/SignInDecision";
import ProfileDropdown from "../components/Minor/ProfileDropdown";
import { checkIfLoggedIn, getLobbies } from "../api";
import { handleRequestError } from "../util";
import anime from "animejs";
import Anime from "../components/Minor/Anime";
import FadeInSection from "../components/Minor/FadeScrollSection";

export default function Lobbies() {
    const history = useHistory();
    const modalContext = useContext(ModalContext);
    const userContext = useContext(UserContext);
    const [games, setGames] = useState([]);

    const openGame = id => {
        if (!userContext.loggedIn) {
            modalContext.setOpenModal("signInDecision");
        } else {
            if (id != null) {
                history.push("/game/" + id);
            } else {
                const freeGames = games.filter(game => game.currentPlayers < game.maxPlayers);
                const bestGame = freeGames.sort((a, b) => (a.currentPlayers < b.currentPlayers ? 1 : -1))[0];
                if (bestGame != null) {
                    history.push("/game/" + bestGame.gameID);
                }
            }
        }
    };

    useEffect(() => {
        fetchLobbies();
    }, []);

    const fetchLobbies = () => {
        getLobbies().then(
            res => {
                setGames(res.games);
            },
            err => {
                handleRequestError(err, modalContext.showAlert);
            },
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.profileDropdown}>
                <ProfileDropdown />
            </div>
            <div className={styles.header}>
                <div>
                    <div className={styles.wordmarkWrapper}>
                        <Wordmark inverted={true} />
                    </div>
                    <h3 className={styles.pageTitle}>Lobbies</h3>
                    <div className={styles.buttonBox}>
                        <ButtonHalf text="Back" onClick={() => history.push("/")} />
                        <ButtonHalf text="Quick Join" onClick={() => openGame()} />
                        <ButtonHalf text="Create" onClick={() => history.push("/game/create")} />
                    </div>
                </div>
            </div>

            <div className={styles.page}>
                <div className={styles.sidebarLeft}>
                    <Anime easing="easeOutExpo" translateX={[-30, 0]} translateY={[30, 0]} duration={1200} delay={anime.stagger(100, { start: 400 })} opacity={[0, 1]}>
                        <Filters />
                    </Anime>
                </div>

                <div className={styles.games}>
                    {games.map((item, index) => (
                        <GameLobbyCard
                            key={index}
                            onClick={() => openGame(item.id)}
                            author={item.players[0]}
                            id={item.id}
                            name={item.name}
                            currentPlayers={item.players.length}
                            joinedPlayers={item.players}
                            maxPlayers={item.maxPlayers}
                            locked={false}
                        />
                    ))}
                </div>
                <div className={styles.sidebarRight}>
                    <Anime easing="easeOutExpo" translateX={[-30, 0]} translateY={[30, 0]} duration={1200} delay={anime.stagger(100, { start: 400 })} opacity={[0, 1]}>
                        <Stats />
                        <News />
                    </Anime>
                </div>
            </div>
        </div>
    );
}
