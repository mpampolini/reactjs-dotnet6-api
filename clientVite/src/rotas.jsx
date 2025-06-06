import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from "./pages/Login";
import Books from "./pages/Books";
import NewBook from "./pages/NewBook";



function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/books" element={<Books />} />
                <Route path="/book/new/:bookId" element={<NewBook />} />
            </Routes>
        </Router>
    );
}

export default Rotas