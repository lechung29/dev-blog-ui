import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import { SignUp } from "./pages/auth/Register";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";

function App() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                  <Route key={"blog-home"} path="/" element={<Home />} />
                  <Route key={"blog-login"} path="/login" element={isLoggedIn ? <Navigate to={"/"} /> : <Login />} />
                  <Route key={"blog-register"} path="/register" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
