import {useEffect} from "react";

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
    }, [ref]);
}