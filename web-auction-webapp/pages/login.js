import {useState} from "react";
import jwt from 'jsonwebtoken'
import fetch from 'isomorphic-fetch'
import {useRouter} from "next/router";
import {useCookies} from 'react-cookie'
import parseCookies from "../helpers";
import Items from "./items";
import Navbar from "../components/Navbar";
import backend from "../config";


const Login = ({data}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [cookies, setCookie] = useCookies(["user"])
    const [message, setMessage] = useState('')


    async function submitForm() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({"username": username, "password": password});

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${backend}api/token/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                const token = result.access
                if (token) {
                    const json = jwt.decode(token)
                    json.token = token;
                    try {
                        setCookie("user", json, {
                            path: "/",
                            maxAge: 1700, // Expiration
                            sameSite: true
                        })
                    } catch (err) {
                        console.log(err)
                    }
                    router.push("/items")

                } else {
                    setMessage(result.detail)
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className='w-full h-full min-h-screen'>
            {
                data.user && true ? <Navbar login={'hide'}/> : <Navbar login={'show'}/>
            }
            <div className="justify-center mt-24 content-center align-middle items-center">
                <h1 className="text-center text-2xl font-bold">Login</h1>
                <div className="w-2/3 mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">

                    { message.length > 0 ?
                        <p className="p-2 text-center text-red-800 bg-red-400 rounded-xl">
                            {message}
                        </p> : ''
                    }
                    <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                               name="username" id="username" type="text" placeholder="Username" value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                            name="password" id="password" type="password" placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-black w-full hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                                type="button" onClick={submitForm} value="Login">
                            Sign In
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

Login.getInitialProps = async ({req, res}) => {
    const data = parseCookies(req)

    if (res) {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            res.writeHead(301, {Location: "/"})
            res.end()
        }
    }
    return {
        data: data && data,
    }

}
export default Login;