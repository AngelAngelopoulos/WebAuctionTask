import React, {useState} from "react";
import Link from 'next/link'
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";

export default function Navbar(props) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const router = useRouter()
    const [cookies, setCookie] = useCookies(["user"])

    const handleLogout = (e) => {
        setCookie('user', null, {
            maxAge: 0
        })
        e.preventDefault()
        router.push("/items")
    }

    return (
        <div>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-black mb-0">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a
                            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                            href="/"
                        >
                            Web Auction App
                        </a>
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-white block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="nav-item">
                                <Link href="/">
                                    <a
                                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    >
                                        <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span
                                        className="ml-2">Home</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/items">
                                    <a
                                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    >
                                        <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span
                                        className="ml-2">Items</span>
                                    </a>
                                </Link>
                            </li>
                            {
                                props.login === 'show' ? <li className="nav-item">
                                    <Link href="/login">
                                        <a
                                            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                        >
                                            <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span
                                            className="ml-2">Login</span>
                                        </a>
                                    </Link>
                                </li> : ''
                            }
                            {
                                props.login === 'hide' ? <li className="nav-item">

                                    <a onClick={handleLogout}
                                       className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    >
                                        <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span
                                        className="ml-2">Logout</span>
                                    </a>

                                </li> : ''
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}