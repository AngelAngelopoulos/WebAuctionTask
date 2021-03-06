import '../styles/globals.css'
import Head from "next/head";
import 'tailwindcss/tailwind.css'
import styles from "../styles/Home.module.css";
import {CookiesProvider} from "react-cookie"


function MyApp({Component, pageProps}) {
    return (
        <CookiesProvider>
            <Head>
                <title>Web Auction App</title>
                <meta name="description" content="Web Auction App"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Component {...pageProps} />
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://angelalvaradohdz.me"
                    target="_blank"
                    rel="noopener noreferrer"
                >Created by
                    <span className="underline font-bold ml-1"> Angel Alvarado</span>
                </a>
            </footer>
        </CookiesProvider>)

}

export function redirectUser(ctx, location) {
    if (ctx.req) {
        ctx.res.writeHead(302, {Location: location});
        ctx.res.end();
    } else {
        //Router.push(location);
    }
}

/*
MyApp.getInitialProps = (ctx) => {
    const data = parseCookies(ctx.req)

    if (res) {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            res.writeHead(301, { Location: "/" })
            res.end()
        }
    }

    return {
        data: data && data,
    }
}
*/

export default MyApp;
