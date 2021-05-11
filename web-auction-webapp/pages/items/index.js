import Navbar from "../../components/Navbar";
import Item from "../../components/Item";
import parseCookies from "../../helpers"
import {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import Link from "next/link";
import backend from "../../config";


const fetchItems = async (page, ordering, term, token) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        //mode: 'no-cors',
        headers: myHeaders,
        credentials: 'include'
    };
    const url = `${backend}api/items/?page=${page}&ordering=${ordering}&search=${term}`
    return await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch((error) => {
            console.log(error)
        });
}

const Items = ({data, items}) => {
    const [items_fetched, setItems] = useState(items)
    const [term, setTerm] = useState('')
    const [page, setPage] = useState('1')
    const [ordering, setOrderTerm] = useState('current_price')

    useEffect(async () => {
        if (data.user) {
            await fetchItems(page, ordering, term, JSON.parse(data.user).token).then(
                (result) => {
                    setItems(result);
                }
            )
        }
        else {
            setItems({results: []})
        }
    }, [term, page, ordering]);

    const changeOrderTerm = async (event) => {
        setOrderTerm(event.target.value)
    }

    const changeSearchTerm = async (event) => {
        setPage('1')
        setTerm(event.target.value);
    }

    const changePage = async (page) => {
        setPage(page.selected + 1);
    }

    return (
        <div className='w-full h-full min-h-screen'>
            {
                data.user && true ? <Navbar login={'hide'}/> : <Navbar login={'show'}/>
            }
            <h1 className='text-center font-bold text-6xl mt-8'>Items</h1>

            <section className="text-gray-600 w-full body-font">
                {
                    data.user && true ? <div className="w-full justify-center content-center items-center">

                            {
                                items_fetched ?
                                    <div className='px-5 py-2 mx-auto w-11/12'>
                                        <div
                                            className="p-4 flex flex-wrap lg:flex-row justify-between items-center space-y-3">
                                            <select onChange={changeOrderTerm} value={ordering}
                                                    className='w-full lg:w-64 border-2 border-gray-300 rounded-lg px-4 py-2'>
                                                <option name="Current price - ASC" value="current_price">Current price -
                                                    ASC
                                                </option>
                                                <option name="Current price - DSC" value="-current_price">Current price
                                                    - DSC
                                                </option>
                                            </select>
                                            <div className="py-2 text-gray-600 w-full lg:w-64">
                                                <input
                                                    className="border-2 border-gray-300 bg-white h-10 px-4 w-full  rounded-lg text-sm focus:outline-none"
                                                    type="search" name="search" placeholder="Search" value={term}
                                                    onChange={changeSearchTerm}/>
                                            </div>
                                        </div>
                                        {
                                            items_fetched.results.length > 0 ?

                                                <div className="w-full flex flex-wrap justify-center items-center">


                                                    {items_fetched.results.map((item, key) => (
                                                        <Item key={key} item={item}/>
                                                    ))
                                                    }
                                                </div>
                                                : <p className='text-center my-32'>There are no results</p>
                                        }

                                        <ReactPaginate
                                            pageCount={Math.ceil((items_fetched.count / 10))}
                                            pageRangeDisplayed={2}
                                            marginPagesDisplayed={2}
                                            previousLabel='<'
                                            nextLabel='>'
                                            breakLabel='...'
                                            containerClassName='p-2 flex justify-center content-center mx-auto'
                                            pageClassName='border-2 rounded-lg border-gray-800 justify-center content-center p-2 mx-1'
                                            pageLinkClassName='text-center'
                                            activeClassName='bg-gray-200'
                                            activeLinkClassName='text-blue-600'
                                            previousClassName='mr-3 bg-gray-900 text-gray-100 rounded-lg border-gray-900 justify-center content-center p-2'
                                            nextClassName='ml-3 bg-gray-900 text-gray-100 rounded-lg border-gray-900 justify-center content-center p-2'
                                            previousLinkClassName='text-center'
                                            nextLinkClassName='text-center'
                                            disabledClassName='text-gray-500'
                                            onPageChange={changePage}
                                        />
                                    </div> : <p className='text-center mt-32'>There are no results</p>
                            }
                        </div> :
                        <p className='text-center mt-32'><Link href="/login"><a
                            className='font-bold underline'>Login</a></Link> to access to
                            this page</p>
                }
            </section>
        </div>
    )
}

Items.getInitialProps = async ({req, res}) => {
    const data = parseCookies(req)

    if (res) {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            res.writeHead(301, {Location: "/"})
            res.end()
        }
    }

    let items = {results: []}
    if (data.user) {
        items = await fetchItems('1', 'current_price', '', JSON.parse(data.user).token)
    }

    return {
        data: data && data,
        items: items && items
    }
}

export default Items;

