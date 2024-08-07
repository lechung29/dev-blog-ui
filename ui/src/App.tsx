import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import { SignUp } from "./pages/auth/Register";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";
import Profile from "./pages/profile/Profile";
import CommonRoute from "./components/PrivateRoute/CommonRoute";
import AdminRoute from "./components/PrivateRoute/AdminRoute";
import UserRoute from "./components/PrivateRoute/UserRoute";
import CreatePost from "./pages/dashboard/createpost/CreatePost";

function App() {
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
	return (
		<React.Fragment>
			<BrowserRouter>
				<Routes>
					<Route key={"blog-home"} path="/" element={<Home />} />
					<Route key={"blog-login"} path="/login" element={isLoggedIn ? <Navigate to={"/"} /> : <Login />} />
					<Route key={"blog-register"} path="/register" element={isLoggedIn ? <Navigate to={"/"} /> : <SignUp />} />
					<Route element={<CommonRoute />}>
						<Route key={"blog-user-profile"} path="/profile" element={<Profile />} />
					</Route>
					<Route path="/admin-dashboard" element={<AdminRoute />}>
						<Route key={"create-post"} path="create-post" element={<CreatePost />} />
					</Route>
					<Route path="/user-dashboard" element={<UserRoute />}>
						<Route key={"create-post"} path="create-post" element={<CreatePost />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default App;
