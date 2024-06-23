import { useNavigate, useParams } from "react-router";
import * as client from "./client";
import { useEffect, useState } from "react";
import Comments from "../Comments/comments";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function ArticleDetails() {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { aid } = useParams();
    const [article, setArticle] = useState<any>({});
    const [author, setAuthor] = useState<any>({});
    const fetchArticleAndAuthor = async () => {
        if (aid) {
            const thisArticle = await client.findArticleById(aid);
            setArticle(thisArticle);
            const thisAuthor = await client.getAuthorOfArticle(aid);
            setAuthor(thisAuthor);
        }
    }
    const deleteArticle = async () => {
        if (aid) {
            await client.deleteArticle(aid);
            navigate("/PurrfectBite/articles")
        }
    }
    const isAuthor = (currentUser && (currentUser._id === author._id));
    const isAdmin = (currentUser && (currentUser.role === "ADMIN"))

    useEffect(() => {
        fetchArticleAndAuthor();
    }, [aid]);
    return (
        <div id="article-detail-page" className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 mb-5">
                    <h1 className="display-4 text-center my-3 fw-bold">{article.title}</h1>
                    <h3 className="text-center mb-4">
                        Published By:
                        <a
                            className="brown-link d-inline ms-2"
                            href={(currentUser && author._id === currentUser._id) ? `#/PurrfectBite/account/profile` : `#/PurrfectBite/account/profile/${author._id}`}>
                            {`${author.firstName} ${author.lastName}`}
                        </a>
                    </h3>
                    {(isAuthor || isAdmin) && <div className="d-flex justify-content-center gap-2 mb-4">
                        <button className="btn btn-yellow" onClick={() => navigate(`/PurrfectBite/articles/editor?articleId=${aid}`)}><MdEdit className="me-1" />Edit Article</button>
                        <button className="btn btn-brown" onClick={deleteArticle}><RiDeleteBin5Fill className="me-1" />Delete Article</button>
                    </div>}

                    <p className="fs-5 lh-lg text-justify">{article.content}</p>
                </div>
            </div>

        </div>
    );
}