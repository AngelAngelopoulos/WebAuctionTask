
import cookie from "cookie"

const parseCookies = (req) => {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export default parseCookies;
