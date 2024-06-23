import { useParams } from "react-router";
import * as userClient from "../Users/client"
import * as client from "./client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function ArticlesWrote() {
    const { uid } = useParams();
    const [user, setUser] = useState<any>({});
    const [articles, setArticles] = useState<any[]>([]);
    const fetchUserAndArticles = async () => {
        if (!uid) return;
        const user = await userClient.findUserById(uid.toString());
        setUser(user);
        const articlesList = await client.findArticlesByAuthor(uid);
        setArticles(articlesList);
    }

    useEffect(() => {
        fetchUserAndArticles();
    }, [uid]);
    return (
        <div id="ArticlesPublished" className="container-fluid">
            <h1>{user.firstName}'s Published Articles({articles?articles.length: 0}):</h1>
        
        <div className="row row-cols-1 row-cols-md-3 g-4">
        {articles && articles.map((article: any) => (
            <div className="col" key={article._id}>
                <div className="card h-100">
                    <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text">Author: {user.firstName} {user.lastName}</p>
                        <Link to={`/PurrfectBite/articles/${article._id}`} className="btn btn-outline-primary">Read More</Link>
                    </div>
                </div>
            </div>
        ))}
    </div> </div>
    );
}