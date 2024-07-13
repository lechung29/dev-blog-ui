import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                  <Route key={"blog-home"} path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
