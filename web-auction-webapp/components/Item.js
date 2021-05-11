import Link from "next/link";

const Item = ({item}) => {
    return (
        <div className="lg:w-1/3 md:w-1/2 p-4 w-full">
            <a className="block w-full h-48 rounded overflow-hidden">

                {
                    item.photo ? <img alt="ecommerce" className="object-cover object-center w-full h-full block"
                      src={`/images/${item.photo}`}/> :
                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
                }
            </a>
            <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.date_open}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{item.name}</h2>
                <p className="mt-1"> Last Highest Bid: {item.current_price}</p>
                <p className="mt-1 truncate">{item.description}</p>
                <Link href={"/items/" + item.id}>
                    <button className="block w-full mt-1 rounded-xl px-6 py-2 bg-black text-gray-100">Bid Now</button>
                </Link>
            </div>
        </div>
    )
}

export default Item;