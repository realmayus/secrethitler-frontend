import React, { useEffect, useState, useRef } from "react";
import { discordLink } from "./consts";
import anime from "animejs";

export function trimString(str, maxLen) {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(" ", maxLen));
}

/*
Adds undefined elements to the given array until the desired length is reached.
 */
export function populateArrayToLength(existingArray, desiredLength) {
    if (existingArray.length === desiredLength) return existingArray;
    while (existingArray.length < desiredLength) {
        existingArray.push(undefined);
    }
    return existingArray;
}

export function useOutsideAlerter(ref, onOutsideClick) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onOutsideClick();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onOutsideClick, ref]);
}

export function handleRequestError(err, showAlert) {
    console.log(err);
    showAlert(
        err.status == null ? "Couldn't connect to server" : "An error occurred",
        <div>
            <p>The following error occurred: </p>
            <code>{err.status == null ? String(err) : `Code: ${err.status}; Text: ${err.statusText}`}</code>
            <p>
                Check your browser's console (hit F12) for more details. You can get support at: <a href={discordLink}>{discordLink}</a>
            </p>
        </div>,
    );
}

export const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [audio, playing]);

    useEffect(() => {
        audio.addEventListener("ended", () => setPlaying(false));
        return () => {
            audio.removeEventListener("ended", () => setPlaying(false));
        };
    }, [audio]);

    return [playing, toggle];
};

export const useAnime = initialAnimeProperties => {
    const animationRef = useRef(null);
    const [animeProperties, setAnimeProperties] = useState(initialAnimeProperties);
    useEffect(() => {
        animationRef.current = anime(animeProperties);
    }, [animeProperties]);
    return [animationRef.current, setAnimeProperties];
};

export const randomString = length => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
