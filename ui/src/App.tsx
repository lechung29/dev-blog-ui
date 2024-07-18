import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                  <Route key={"blog-home"} path="/" element={<Home />} />
                  <Route key={"blog-login"} path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
