export const setCookie = (cookieName, cookieValue, exDate = '') => {
    const d = new Date(exDate).toUTCString();
    const expires = `expires=${d}`;
    const cookie = `${cookieName}=${cookieValue};${expires};path=/`;
    document.cookie = cookie;
};

export const getCookie = (cookieName) => {
    const name = `${cookieName}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

/**
 * Delete a cookie
 * @param {String} cname, cookie name
 */
export const deleteCookie = (cname) => {
    const d = new Date(); // Create an date object
    d.setTime(d.getTime() - (1000 * 60 * 60 * 24 * 60)); // Set the time to the past. 1000 milliseonds = 1 second
    const expires = `expires=${d.toGMTString()}`; // Compose the expirartion date
    window.document.cookie = `${cname}=; ${expires}; path=/`;// Set the cookie with name and the expiration date
};
