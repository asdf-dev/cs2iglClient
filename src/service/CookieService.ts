import { useRouter } from "vue-router";
import { createUser } from "./dataService";

export class CookieService {

    createValidCookie() {
        console.debug("creating cookie")
        const date = new Date();
        date.setTime(date.getTime() + (5 * 24 * 60 * 60 * 1000)); // Set expiry date to 5 days from now
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `Valid=isValid; ${expires}; path=/`;
    }

    getValidCookie() {
        const name = 'Valid=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');

        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                const value = cookie.substring(name.length);
                return value; 
            }
        }
        return null; 
    }

     isCookieValid() {
        const validCookie = this.getValidCookie();
        if (validCookie) {
            return true;
        }
        return false; 
    }

    cookieValidator() {
        const cookie = this.getValidCookie()
        if (cookie == null) {
            console.debug("cookie was null")
            const username = localStorage.getItem('username');
            if (username == null) {
                const router = useRouter();
                router.push('/')
                return
            }
            const resp = createUser(username)
            resp.then(value => {
                localStorage.setItem('id', value.id);
                localStorage.setItem('username', value.name);
                this.createValidCookie()
            })
        }
    }
}