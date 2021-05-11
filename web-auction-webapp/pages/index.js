import parseCookies from "../helpers";
import Navbar from "../components/Navbar";


const Index = ({data}) => {
    return (
        <div className="w-full h-full min-h-screen">
            {
                data.user && true ? <Navbar login={'hide'}/> : <Navbar login={'show'}/>
            }
            <h1 className="mt-20 text-center text-6xl font-bold">Web Auction</h1>
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