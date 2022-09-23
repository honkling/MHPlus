function getCookie(e) {
    const t = e + "="; // "access_token_prd="
    const n = decodeURIComponent(document.cookie); // decodeURIComponent is a function provided by the browsers. Don't waste your time like I did
    const r = n.split("; "); // Array of string key-value pairs for cookies
    let i; // null
    return (
        r.forEach((e) => {
            0 === e.indexOf(t) && (i = e.substring(t.length)); // All cookies that starts with "access_token_prd="
        }),
        i // The token
    );
}

JSON.stringify({
    minehutToken: getCookie("access_token_prd"),
    minehutSession: localStorage.minehut_session_id,
    slgProfile: localStorage.slg_profile_id,
    slgSession: localStorage.slg_session_id,
    slgUserToken: localStorage.slg_session_id
});
