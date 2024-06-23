import React from 'react';
import logo from './logo.svg';
import Home from './RecipeWebPage/Home';
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Recipes from './RecipeWebPage/Recipes';
import Profile from './RecipeWebPage/Account';
import RecipeWebPage from './RecipeWebPage';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="PurrfectBite" />} />
          <Route path="/PurrfectBite/*" element={<RecipeWebPage />} />
          
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
