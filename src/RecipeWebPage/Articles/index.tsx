import { IoIosAddCircle } from "react-icons/io";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import ArticleEditor from "./ArticleEditor";
import ArticlesHome from "./ArticlesHome";
import ArticleDetails from "./ArticleDetail";
import ArticlesWrote from "./ArticlesWrote";
export default function Articles() {
    
    return (
        <div>
        <Routes>
            <Route path="/" element={<Navigate to="search" />} />
            <Route path="search" element={<ArticlesHome />} />
            <Route path="editor" element={<ArticleEditor />} />
            <Route path=":aid" element={<ArticleDetails />} />
            <Route path="author/:uid" element={<ArticlesWrote />} />
        </Routes>
        </div>
    )
}