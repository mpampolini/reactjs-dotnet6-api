import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Book from "./pages/Book";

export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path="/" exact Component={Login} />
                <Route path="/Book" Component={Book} />
            </Routes>
        </Router>
    );
}