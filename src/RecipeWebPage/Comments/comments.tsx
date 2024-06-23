import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "./client";
import { Link, useNavigate } from "react-router-dom";

export default function Comments({ pid }: { pid: String }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [comment, setComment] = useState({ userId: currentUser?._id, recipeId: pid, userName: currentUser?.firstName, content: "" });
    const [comments, setComments] = useState<any[]>([]);
    const navigate = useNavigate();
    const isAdmin = currentUser && (currentUser.role === "ADMIN");
    const createComment = async (e: any) => {
        e.preventDefault();
        if (currentUser) {
            try {
                const newComment = await client.createComment(comment);
                console.log(newComment);
                setComment({ ...comment, content: "" });
                fetchComments();
            } catch (err: any) {
                console.error("Failed to create comment:", err);
            }
        } else {
            navigate("/PurrfectBite/account/signin");
        }
    };

    const fetchComments = async () => {
        try {
            const commentsList = await client.findCommentsByPost(pid);
            setComments(commentsList);
        } catch (err: any) {
            console.error(err);
        }
    };

    const deleteComments = async (event: any, commentId: string) => {
        try {
            event.preventDefault();
            await client.deleteComment(commentId);
            fetchComments();
        } catch (err: any) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [pid]);

    return (
        <div id="comments">
            <h2>Comments:</h2>
            <form className="col-8 col-md-6 mb-3" onSubmit={createComment}>
                <div id="recipe-comment-input" className="input-group">
                    <input
                        id="recipe-comment-field"
                        type="text"
                        value={comment.content}
                        onChange={(e) => setComment({ ...comment, content: e.target.value })}
                        className="form-control"
                        placeholder="Comment"
                    />
                    <button className="btn btn-brown btn-sm" type="submit">Post</button>
                </div>
            </form>
            {comments && comments.map((thisComment: any) => (
                <div className="card mb-2" key={thisComment._id}>
                    <Link 
                        to={(currentUser && thisComment.userId === currentUser._id) ? `/PurrfectBite/account/profile` :`/PurrfectBite/account/profile/${thisComment.userId}` } 
                        className="text-decoration-none" 
                        style={{ color: 'black' }}
                    >
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="card-title">
                                    {thisComment.userName}
                                </h5>
                                <p className="card-text">{thisComment.content}</p>
                            </div>
                            {currentUser && ((thisComment.userId === currentUser._id) || isAdmin) && (
                                <button 
                                    className="btn btn-danger" 
                                    onClick={(e) => deleteComments(e, thisComment._id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
