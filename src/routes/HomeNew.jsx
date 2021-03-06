import Wordmark from "../components/Wordmark";
import React, { useContext } from "react";
import styles from "./HomeNew.module.scss";
import Button from "../components/Button";
import lizard from "../assets/lizardTitle.jpg";
import { useHistory } from "react-router-dom";
import { ModalContext } from "../App";
import FadeInSection from "../components/Minor/FadeScrollSection";
import anime from "animejs";
import Anime from "../components/Minor/Anime";

export default function HomeNew() {
    const history = useHistory();
    const modalContext = useContext(ModalContext);

    const letterize = str => {
        for (let char in str) {
        }
        return str.split("").map(c =>
            c !== " " ? (
                <span style={{ display: "inline-flex" }} className={styles.title}>
                    {c}
                </span>
            ) : (
                <span style={{ marginRight: 20 }} />
            ),
        );
    };
    return (
        <div className={styles.outerWrapper}>
            <div>
                <div className={styles.header}>
                    <div className={styles.wordmarkWrapper}>
                        <Wordmark inverted={true} />
                    </div>
                    <div className={styles.mainHeader}>
                        <div className={styles.headerLeft}>
                            <div>
                                <div className={styles.title}>
                                    <Anime
                                        easing="easeInExpo"
                                        className={styles.title}
                                        translateX={[-20, 0]}
                                        translateY={[-20, 0]}
                                        duration={400}
                                        delay={anime.stagger(20)}
                                        opacity={[0, 1]}
                                    >
                                        {letterize("Can you stem the rising tide")}
                                    </Anime>
                                </div>
                                <div style={{ marginBottom: 40 }} className={styles.title}>
                                    <Anime
                                        easing="easeInExpo"
                                        className={styles.title}
                                        translateX={[-20, 0]}
                                        translateY={[-20, 0]}
                                        duration={400}
                                        delay={anime.stagger(20, { start: 20 * 28 })}
                                        opacity={[0, 1]}
                                    >
                                        {letterize("of Fascism?")}
                                    </Anime>
                                </div>
                            </div>

                            <div className={styles.buttonBox}>
                                <Anime
                                    easing="easeOutExpo"
                                    translateX={[-30, 0]}
                                    translateY={[30, 0]}
                                    duration={1200}
                                    delay={anime.stagger(100, { start: 20 * 28 + 20 * 11 + 500 })}
                                    opacity={[0, 1]}
                                >
                                    <Button text={"Join a lobby"} onClick={() => history.push("/lobbies")} />
                                    <Button text={"Sign In"} onClick={() => modalContext.setOpenModal("signIn")} />
                                </Anime>
                            </div>
                        </div>
                        <div className={styles.headerRight}>
                            <Anime opacity={[0, 1]} easing={"easeOutExpo"} delay={500}>
                                <img alt={"lizard person"} src={lizard} className={styles.lizard} />
                            </Anime>
                        </div>
                    </div>
                </div>
                <svg preserveAspectRatio="none" viewBox="0 0 1923 46" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.curve}>
                    <path preserveAspectRatio="none" d="M0 0C600.5 34.3333 1825.7 82.4 1922.5 0H0Z" fill="#BA4F3D" />
                </svg>
                <div className={styles.footer}>
                    <div className={styles.footerWrapper}>
                        <div>
                            <Anime
                                easing="easeOutExpo"
                                translateX={[-10, 0]}
                                translateY={[30, 0]}
                                duration={2000}
                                delay={anime.stagger(0, { start: 20 * 28 + 20 * 11 + 500 + 500 })}
                                opacity={[0, 1]}
                            >
                                <h3 className={styles.blueHeading}>
                                    An online implementation of the social deduction game <a href="https://secrethitler.com">Secret Hitler</a>.
                                </h3>
                                <p>
                                    The year is 1932. The place is pre-WWII Germany. In Secret Hitler, players are German politicians attempting to hold a fragile Liberal
                                    government together and stem the rising tide of Fascism. Watch out though—there are secret Fascists among you, and one player is Secret Hitler.
                                </p>
                            </Anime>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.gameInstructionOuterWrapper}>
                <div className={styles.gameInstructionWrapper}>
                    <FadeInSection alternate={true}>
                        <div className={styles.rulesSlide}>
                            <div className={styles.rulesSection}>
                                <h1 className={styles.rulesHeadline}>Overview</h1>
                                <p>
                                    At the beginning of the game, each player is secretly assigned to one of three roles: Liberal, Fascist , or Hitler . The Liberals have a
                                    majority, but they don’t know for sure who anyone is; Fascists must resort to secrecy and sabotage to accomplish their goals. Hitler plays for
                                    the Fascist team, and the Fascists know Hitler’s identity from the outset, but Hitler doesn’t know the Fascists and must work to figure them
                                    out.
                                </p>

                                <p>
                                    Whenever a Fascist Policy is enacted, the government becomes more powerful, and the President is granted a single-use power which must be used
                                    before the next round can begin. It doesn’t matter what team the President is on; in fact, even Liberal players might be tempted to enact a
                                    Fascist Policy to gain new powers.{" "}
                                </p>
                            </div>
                        </div>
                    </FadeInSection>

                    <FadeInSection alternate={true}>
                        <div className={styles.rulesSlide}>
                            <div className={styles.rulesSection}>
                                <h1 className={styles.rulesHeadline}>Object</h1>
                                <p>Every player has a secret identity as a member of either the Liberal team or the Fascist team. Players on the Liberal team win if either:</p>
                                <ul>
                                    <li>Five liberal policies are enacted OR</li>
                                    <li>Hitler is assassinated.</li>
                                </ul>
                                <p>Players on the Facist team win if either:</p>
                                <ul>
                                    <li>Six Facist policies are enacted OR</li>
                                    <li>Hitler is elected Chancellor any time after the third Fascist Policy has been enacted.</li>
                                </ul>
                            </div>
                        </div>
                    </FadeInSection>

                    <FadeInSection alternate={true}>
                        <div className={styles.rulesSlide}>
                            <div className={styles.rulesSection}>
                                <h1 className={styles.rulesHeadline}>Setup</h1>
                                <p>
                                    The 11 Fascist Policy tiles and the 6 Liberal Policy tiles are shuffled into a single Policy deck. Use the table below to determine the
                                    distribution of roles.
                                </p>
                                <table className={styles.table}>
                                    <tbody>
                                        <tr>
                                            <th># Players</th>
                                            <th>5</th>
                                            <th>6</th>
                                            <th>7</th>
                                            <th>8</th>
                                            <th>9</th>
                                            <th>10</th>
                                        </tr>
                                        <tr>
                                            <td>Liberals</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>5</td>
                                            <td>6</td>
                                        </tr>
                                        <tr>
                                            <td>Fascists</td>
                                            <td>1 + H</td>
                                            <td>1 + H</td>
                                            <td>2 + H</td>
                                            <td>2 + H</td>
                                            <td>3 + H</td>
                                            <td>3 + H</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </FadeInSection>

                    <FadeInSection alternate={true}>
                        <div className={styles.rulesSlide}>
                            <div className={styles.rulesSection}>
                                <h1 className={styles.rulesHeadline}>Gameplay</h1>
                                <h2 className={styles.subheading}>Election</h2>
                                1. <strong>Pass the Presidential Candidacy</strong>
                                <p>At the beginning of a new round, the Presidency moves to the next player in the row.</p>
                                2. <strong>Nominate a chancellor</strong>
                                <p>
                                    The presidential candidate chooses a Chancellor candidate. The Presidential candidate is free to discuss Chancellor options with all the other
                                    players to make it more likely the Government gets elected.
                                </p>
                                3. <strong>Vote on the Government</strong>
                                <p>Once the Chancellor candidate was chosen, every player, including the candidates themselves votes on the proposed Government.</p>
                                <p>
                                    If the election ends up in a tie or if the majority of players votes no, the election fails. The next player in the row becomes the Presidential
                                    candidate and the election failed. The election tracker advances.
                                </p>
                                <em>Election Tracker:</em> If the group rejects three Governments in a row, the country is thrown into chaos. The policy on top of the policy deck
                                gets revealed and enacted. The tracker resets every time a policy gets enacted, whether it was enacted by an elected Government or by the frustrated
                                populance.
                                <p>
                                    If the majority of players votes yes, the Presidential candidate and the Chancellor candidate become the new President and Chancellor,
                                    respectively.
                                </p>
                                <p>
                                    ➡️ If three or more fascist policies have been enacted already and the new Chancellor is Hitler, the game is over and the Fascists win.
                                    Otherwise, other players know for sure the Chancellor is not Hitler.
                                </p>
                            </div>
                        </div>
                    </FadeInSection>
                    <FadeInSection alternate={true}>
                        <div className={styles.rulesSlide}>
                            <div className={styles.rulesSection}>
                                <h1 className={styles.rulesHeadline}>(…) Gameplay</h1>
                                <h2 className={styles.subheading}>Legislative Session</h2>
                                <p>
                                    During the Legislative Session, the President and Chancellor work together to enact a new Policy in secret. The President draws the top three
                                    tiles from the Policy deck, looks at them in secret, and discards one tile face down into the Discard pile. The remaining two tiles go to the
                                    Chancellor, who looks in secret, discards one Policy tile face down, and enacts the remaining Policy by placing the tile face up on the
                                    corresponding track.
                                </p>

                                <h2 className={styles.subheading}>Executive Action</h2>
                            </div>
                        </div>
                    </FadeInSection>
                    <div className={styles.footerBottom}>
                        <button className={styles.aboutButton} onClick={() => modalContext.setOpenModal("about")}>
                            About
                        </button>
                        <span>•</span>
                        <button className={styles.aboutButton} onClick={() => modalContext.setOpenModal("report")}>
                            Report a bug
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
