import { useEffect, useState } from "react";
import * as client from "../Articles/client";
import { Link } from "react-router-dom";
export default function ArticleHomePage() {
    const [article, setArticle] = useState<any>({});
    const fetchNewestArticle = async () => {
        const articles = await client.getAllArticles();
        const sortedArticles = articles.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setArticle(sortedArticles[0]);
    }
    useEffect(() => {fetchNewestArticle();}, []);
    return (
        <div id="nutrition-articles" className="col-6 container-fluid">
        <h2 className="mb-3 text-start fw-bold">Article of the Day:</h2>
        <div className="col" style={{ width: "100%" }}>
            <div className="card" >
            <Link to={`/PurrfectBite/articles/${article._id}`} className="text-decoration-none" >
                <img src="/images/healthy.png" className="card-img-top" style={{ height: "300px", objectFit: "cover", width: "100%" }} />

                <div className="card-body" style={{ color: "black" }}>
                    <h4 className="text-center">{article? article.title:"Article is currently unavailable?"}</h4>
                    <p style={{ maxHeight: 500, overflow: "hidden" }}>
                        {article.content}
                        </p>
                </div>
                </Link>
            </div>
        </div>
    </div>
    );
}