import {useEffect} from "react";
import {discordLink} from "./consts";

export function trimString(str, maxLen) {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(' ', maxLen));
}


/*
Adds undefined elements to the given array until the desired length is reached.
 */
export function populateArrayToLength(existingArray, desiredLength) {
    if (existingArray.length === desiredLength) return existingArray;
    while(existingArray.length < desiredLength) {
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
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onOutsideClick, ref]);
}


export function handleRequestError(err, showAlert) {
    showAlert(err.status == null ? "Couldn't connect to server" : "An error occurred",
        <div>
            <p>The following error occurred: </p>
            <code>{String(err)}</code>
            <p>Check your browser's console (hit F12) for more details. You can get support at: <a href={discordLink}>{discordLink}</a></p>
        </div>
    )
}

export const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;