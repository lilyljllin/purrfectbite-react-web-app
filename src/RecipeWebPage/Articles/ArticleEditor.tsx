import { useNavigate, useLocation } from "react-router";
import * as client from "./client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ArticleEditor() {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const location = useLocation();

    // Function to get query parameters
    const getQueryParams = (query: string) => {
        return new URLSearchParams(query);
    };

    const params = getQueryParams(location.search);
    const articleId = params.get('articleId');
    
    const [aid, setAid] = useState(articleId ? articleId : "");
    const [article, setArticle] = useState<any>({ author: currentUser._id, title: "", content: "" });
    const [error, setError] = useState<string | null>(null);

    const fetchArticle = async () => {
        try {
            if (aid !== "") {
                const thisArticle = await client.findArticleById(aid);
                setArticle(thisArticle);
            }
        } catch (error) {
            console.error("Failed to fetch article:", error);
        }
    };

    const saveArticle = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (!article.title.trim() || !article.content.trim()) {
            setError("Title and content cannot be empty.");
            return;
        }
        try {
            let thisArticle;
            if (articleId) {
                thisArticle = await client.editArticle(aid, article);
                setArticle(thisArticle);
            } else {
                thisArticle = await client.createArticle(article);
                setArticle(thisArticle);
            }
            navigate(`/PurrfectBite/articles/${thisArticle._id}`);
        } catch (error) {
            console.error("Failed to save article:", error);
        }
    };

    useEffect(() => {
        fetchArticle();
    }, [articleId]);

    return (
        <div id="article-editor" className="container-fluid">
            <form className="container-fluid" onSubmit={saveArticle}>
                <h3>Article Editor:</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3 row">
                    <label htmlFor="title" className="form-label col-sm-2">Title</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            id="title"
                            value={article.title}
                            onChange={(e) => setArticle({ ...article, title: e.target.value })}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="content" className="form-label col-sm-2">Content</label>
                    <div className="col-sm-10">
                        <textarea
                            className="form-control"
                            id="content"
                            value={article.content}
                            onChange={(e) => setArticle({ ...article, content: e.target.value })}
                        />
                    </div>
                </div>
                <button className="btn btn-brown float-end" type="submit">Save</button>
                <button className="btn btn-yellow float-end mx-3" type="button" onClick={() => navigate("/PurrfectBite/articles")}>Cancel</button>
            </form>
        </div>
    );
}
