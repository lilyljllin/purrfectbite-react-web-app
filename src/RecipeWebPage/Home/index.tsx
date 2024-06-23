import "../Style.css";

import Heading from "../Heading";
import Menu from "../Menu";
import RecipeCards from "./RecipeCards";
import ArticleHomePage from "./ArticleHomePage";
import { useSelector } from "react-redux";
import RecentSaved from "./RecentSaved";
export default function Home() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div id="recipe-home-page" className="d-flex flex-column">
            {currentUser && <RecentSaved /> }
            <div id="recipe-home-content" className="flex-fill d-flex">
                
                <ArticleHomePage />
                <RecipeCards />
            </div>


        </div>
    )
}