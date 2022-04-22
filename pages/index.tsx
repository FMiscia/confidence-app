import type { NextPage } from "next"
import Link from "next/link"
const Home: NextPage = () => {
    return (
        <div className="std flex-column align-center">
            <h1>Confidence Challenge</h1>
            <Link href="/locations">
                <a className="font-light">Go to Locations page</a>
            </Link>
        </div>
    )
}

export default Home
