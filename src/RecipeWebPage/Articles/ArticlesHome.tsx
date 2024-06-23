import { IoIosAddCircle } from "react-icons/io";
import { Route, Routes, useNavigate, useLocation } from "react-router";
import * as client from "./client";
import ArticleEditor from "./ArticleEditor";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ArticlesHome() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();
    const location = useLocation();
    const [articles, setArticles] = useState<any[]>([]);

    const fetchArticles = async (search: string) => {
        if (search) {
            const articlesList = await client.searchArticles(search);
            setArticles(articlesList);
        } else {
            const articlesList = await client.getAllArticles();
            setArticles(articlesList);
        }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get('search') || "";
        fetchArticles(search);
    }, [location.search]);

    return (
        <div id="articles" className="container-fluid">
            <h2>Articles({articles ? articles.length : 0}):</h2>
            {currentUser && currentUser.role === "DIETITIAN" && (
                <button className="btn btn-yellow my-4" onClick={() => navigate("/PurrfectBite/articles/editor")}>
                    <IoIosAddCircle className="me-1" /> Create Article
                </button>
            )}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {articles && articles.map((article) => (
                    <div className="col" key={article._id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">Author: {article.author.firstName} {article.author.lastName}</p>
                                <Link to={`/PurrfectBite/articles/${article._id}`} className="btn btn-border-brown">Read More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
