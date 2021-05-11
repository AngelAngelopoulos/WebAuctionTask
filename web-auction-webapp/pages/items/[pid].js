import {useRouter} from 'next/router'
import {useState} from "react";
import parseCookies from "../../helpers";
import Navbar from "../../components/Navbar";
import Swal from 'sweetalert2'
import Link from "next/link";
import Countdown from "../../components/Countdown";
import backend from "../../config";

const fetchItem = async (item, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        //mode: 'no-cors',
        headers: myHeaders,
        credentials: 'include'
    };
    const url = `${backend}api/items/${item}/`
    return await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch((error) => {
            console.log(error)
        });
}

const Details = ({item_init, data}) => {
    const router = useRouter()
    const {pid} = router.query
    const [bid, setBid] = useState({});
    const [item, setItem] = useState(item_init);
    const [message, setMessage] = useState('')


    const createBid = async (bid, token) => {
        const url = `${backend}api/bids/`
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(bid);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch(url, requestOptions);

            const new_bid = await response.json();

            if (!response.ok) {
                throw Error(new_bid[Object.keys(new_bid)[0]])
            } else {
                await Swal.fire({
                    icon: 'success',
                    title: 'Your bid was submitted successfully',
                })
            }

            return new_bid;

        } catch (error) {

            await Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: `${error}`
            })
            await setMessage(error.toString())

        }
    }

    const submitBid = async (event) => {
        const token = JSON.parse(data.user).token;
        const bid_sub = {
            "user_id": JSON.parse(data.user).user_id,
            "item_id": item.id,
            "date": new Date().toISOString(),
            "amount": bid.amount
        }
        const new_bid = await createBid(bid_sub, token)
        fetchItem(item.id, token).then(
            (result) => {
                setItem(result);
            }
        )
    }

    const ValidateBid = (event) => {

    }

    const changeBidAmount = async (event) => {
        const bid_amount = event.target.value;

        if (isNaN(parseFloat(bid_amount)) && bid_amount !== '') {
            setMessage('This is not a valid value')
        } else {
            setBid({amount: bid_amount})
            setMessage('')
        }

    }

    return (
        <div className="w-full h-full  min-h-screen">
            {
                data.user && true ? <Navbar login={'hide'}/> : <Navbar login={'show'}/>
            }

            <div className="lg:w-4/5 px-8 md:px-0 flex mx-auto mt-4 "><Link href="/items"><a
                className="rounded-lg bg-black text-white px-3 py-2"> Return to items</a></Link></div>

            <section className="text-gray-600 body-font overflow-hidden">
                {
                    data.user && true ? <div className="container py-4 px-8 md:px-0 mx-auto ">

                        <div className="lg:w-4/5 mx-auto flex flex-wrap ">

                            {
                                item.photo ? <img alt="ecommerce"
                                                  src={`/images/${item.photo}`}
                                                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"/>
                                    : <img alt="ecommerce"
                                           className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                                           src="https://dummyimage.com/400x400"/>
                            }

                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">{item.state}</h2>
                                <h1 className="text-gray-900 text-6xl title-font font-bold mb-1">{item.name}</h1>
                                <div className="flex mb-4">
                                  <span className="flex items-center">

                                    <Countdown date={item.date_close_auction}/>
                                  </span>
                                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">

                                    </a>
                                    <a className="text-gray-500">

                                    </a>
                                    <a className="text-gray-500">

                                    </a>
                                  </span>
                                </div>
                                {
                                    item.description ?
                                        <p className="leading-relaxed">Description: {item.description}</p>
                                        : <p className="leading-relaxed">No description available</p>
                                }


                                <div className="flex">
                                <span
                                    className="title-font mt-2 font-bold text-3xl text-gray-900">${item.current_price}</span>


                                </div>
                                <div
                                    className=" mt-6 items-center pb-5 border-2 border-gray-100 rounded-xl shadow-xl mb-5">
                                    <p className="mt-3 font-bold text-lg text-black text-center uppercase">Submit an
                                        offer!</p>
                                    {
                                        message ?
                                            <p className="p-2 mx-2 text-center text-red-800 bg-red-400 rounded-xl">
                                                {message}
                                            </p> : ''
                                    }
                                    <div className="p-6  flex flex-row justify-center mx-auto space-x-4">


                                        <input onChange={changeBidAmount}
                                               className="p-4 border-2 border-gray-300 h-10 rounded-lg "
                                               placeholder='$'/>
                                        <button
                                            onClick={submitBid}

                                            className="flex text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-800 rounded">Bid
                                            now!
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : <p className='text-center mt-32'><Link href="/login"><a
                        className='font-bold underline'>Login</a></Link> to access to
                        this page</p>
                }
            </section>
        </div>
    )
}


Details.getInitialProps = async (ctx) =>
{
    const {req, res} = ctx
    const data = parseCookies(req)

    if (res) {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            res.writeHead(301, {Location: "/"})
            res.end()
        }
    }

    let item_init = {}
    if (data.user) {
        item_init = await fetchItem(ctx.query.pid, JSON.parse(data.user).token)
    }

    return {
        data: data && data,
        item_init: item_init && item_init
    }
}

export default Details;