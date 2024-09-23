import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./redux/store/store";
import { userState } from "./redux/reducers/users/UserSlice";
// import Home from "./pages/home/Home";
// import Login from "./pages/auth/Login";
// import { SignUp } from "./pages/auth/Register";
// import Profile from "./pages/profile/Profile";
import CommonRoute from "./components/PrivateRoute/CommonRoute";
import AdminRoute from "./components/PrivateRoute/AdminRoute";
import UserRoute from "./components/PrivateRoute/UserRoute";
// import CreatePost from "./pages/dashboard/createpost/CreatePost";
// import UserPostManagement from "./pages/dashboard/postmanagement/user/UserPostManagement";
// import FavouritePost from "./pages/dashboard/favouritepost/FavouritePost";
// import Overview from "./pages/dashboard/overview/Overview";
// import SearchPage from "./pages/search/SearchPage";
// import PostPage from "./pages/post/PostPage";
// import UserManagement from "./pages/dashboard/usermanagement/UserManagement";

// import NotFound from "./pages/pageNotFound/PageNotFound";
// import EditPost from "./pages/dashboard/editpost/EditPost";


const NotFound = React.lazy(() => import("./pages/pageNotFound/PageNotFound"))
const EditPost = React.lazy(() => import("./pages/dashboard/editpost/EditPost"))
const Home = React.lazy(() => import("./pages/home/Home"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const SignUp = React.lazy(() => import("./pages/auth/Register").then(module => ({ default: module.SignUp })));
const Profile = React.lazy(() => import("./pages/profile/Profile"));
const CreatePost = React.lazy(() => import("./pages/dashboard/createpost/CreatePost"));
const UserPostManagement = React.lazy(() => import("./pages/dashboard/postmanagement/user/UserPostManagement"));
const FavouritePost = React.lazy(() => import("./pages/dashboard/favouritepost/FavouritePost"));
const Overview = React.lazy(() => import("./pages/dashboard/overview/Overview"));
const SearchPage = React.lazy(() => import("./pages/search/SearchPage"));
const PostPage = React.lazy(() => import("./pages/post/PostPage"));
const UserManagement = React.lazy(() => import("./pages/dashboard/usermanagement/UserManagement"));

function App() {
	const { user } = useAppSelector(userState)
	return (
		<React.Fragment>
			<BrowserRouter>
				<Routes>
					<Route key={"blog-home"} path="/" element={<Home />} />
					<Route key={"blog-login"} path="/login" element={user ? <Navigate to={"/"} /> : <Login />} />
					<Route key={"blog-register"} path="/register" element={user ? <Navigate to={"/"} /> : <SignUp />} />
					<Route key={"blog-search"} path="/search/:searchText" element={<SearchPage />} />
					<Route key={"blog-post"} path="/post/:postId" element={<PostPage />} />
					<Route element={<CommonRoute />}>
						<Route key={"blog-user-profile"} path="/profile" element={<Profile />} />
					</Route>
					<Route path="/admin-dashboard" element={<AdminRoute />}>
						<Route key={"admin-overview"} path="overview" element={<Overview />} />
						<Route key={"admin-create-post"} path="create-post" element={<CreatePost />} />
						<Route key={"admin-edit-post"} path="edit-post/:postId" element={<EditPost />} />
						<Route key={"admin-post-management"} path="post-management" element={<UserPostManagement />} />
						<Route key={"admin-user-management"} path="user-management" element={<UserManagement />} />
						<Route key={"admin-favorite-management"} path="favourite-management" element={<FavouritePost />} />
					</Route>
					<Route path="/user-dashboard" element={<UserRoute />}>
						<Route key={"user-overview"} path="overview" element={<Overview />} />
						<Route key={"user-create-post"} path="create-post" element={<CreatePost />} />
						<Route key={"user-edit-post"} path="edit-post/:postId" element={<EditPost />} />
						<Route key={"user-post-management"} path="post-management" element={<UserPostManagement />} />
						<Route key={"user-favorite-management"} path="favourite-management" element={<FavouritePost />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default App;
