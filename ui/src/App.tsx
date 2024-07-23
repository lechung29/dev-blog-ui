import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import { SignUp } from "./pages/auth/Register";

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                  <Route key={"blog-home"} path="/" element={<Home />} />
                  <Route key={"blog-login"} path="/login" element={<Login />} />
                  <Route key={"blog-register"} path="/register" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
