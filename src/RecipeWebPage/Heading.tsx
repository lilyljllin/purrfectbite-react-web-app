import { Link } from "react-router-dom"
export default function Heading() {
    return (
        <Link to={"/PurrfectBite/home"} className="text-decoration-none">
        <div id="recipe-home-page-top-quarter" className="top-quarter mb-3 d-flex justify-content-center" >
                    <img src="./images/purrfectbite.png"  height="100%"/>
            </div>
            </Link>
    )
}