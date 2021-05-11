import parseCookies from "../helpers";
import Navbar from "../components/Navbar";
import Link from "next/link";


const Index = ({data}) => {
    return (
        <div className="w-full h-full min-h-screen justify-center">
            {
                data.user && true ? <Navbar login={'hide'}/> : <Navbar login={'show'}/>
            }
            <h1 className="mt-20 text-center text-6xl font-bold">Web Auction</h1>
            <section className="mx-auto w-11/12 text-gray-600 body-font">
                <div className=" mx-auto flex px-5 py-4 md:flex-row flex-col items-center">
                    <div
                        className="lg:flex-grow lg:w-2/3 md:w-2/3 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-4xl mb-4 font-bold text-gray-900">
                            The best Auction Shop in the Country
                        </h1>
                        <p className="mb-8 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                            anim id est laborum.</p>
                        <div className="flex justify-center">
                            <Link href="/items">
                                <button
                                    className="inline-flex text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-black-800 rounded text-lg">Bid
                                    now!
                                </button>
                            </Link>

                        </div>
                    </div>
                    <div className=" md:w-1/3 w-5/6">
                        <img className="rounded" alt="hero"
                             src="/images/phonograph.jpg"/>
                    </div>
                </div>
            </section>
        </div>

    );
}

Index.getInitialProps = async ({req, res}) => {
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
export default Index;