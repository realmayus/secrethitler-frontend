import React, { useEffect } from "react";
import styles from "./FadeScrollSection.module.scss";
import Anime from "./Anime";
import anime from "animejs";

export default function FadeInSection(props) {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            });
        });
        observer.observe(domRef.current);
    }, []);
    return (
        <div
            className={
                styles.fadeInSection +
                " " +
                (isVisible ? styles.isVisible : "") +
                " " +
                (props.alternate != null && props.alternate === true ? styles.alternate : "") +
                " " +
                props.className
            }
            ref={domRef}
        >
            <Anime
                easing="easeOutExpo"
                translateX={[-10, 0]}
                translateY={[30, 0]}
                duration={2000}
                delay={anime.stagger(0, { start: props.delay != null ? props.delay : 20 * 28 + 20 * 11 + 500 + 500 })}
                opacity={[0, 1]}
            >
                {props.children}
            </Anime>
        </div>
    );
}
