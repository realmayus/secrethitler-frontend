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