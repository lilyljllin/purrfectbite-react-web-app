import { Route, Routes, Navigate } from "react-router";
import { Provider } from "react-redux";
import Home from "./Home";
import Recipes from "./Recipes";
import Heading from "./Heading";
import Menu from "./Menu";
import UserTable from "./Users/UserTable";
import Account from "./Account";
import store from "./store";
import Session from "./Account/Session";
import Articles from "./Articles";
import ProjectInformation from "./ProjectInformation";
export default function RecipeWebPage() {
    return (
      
      <Provider store={store}>
        <Session>
      <div id="recipe-page">
        <div id="heading-and-menu">
        <Heading />
        <Menu />
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home/*" element={<Home />} />
          <Route path="recipes/*" element={<Recipes/>} />
          <Route path="account/*" element={<Account />} />
          <Route path="articles/*" element={<Articles />} />
          <Route path="users" element={<UserTable />} />
          <Route path="about" element={<ProjectInformation />} />
        </Routes>
        </div>
        </div>
        </Session>
        </Provider>
        
    );
}