import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";
import RedirectPage from "../redirectPage/RedirectPage";
import { userState } from "../../redux/reducers/users/UserSlice";

const UserRoute: React.FunctionComponent = () => {
	const { user } = useAppSelector(userState)
    const token = localStorage.getItem("access_token")
	return !token 
    ?   <RedirectPage to={"/login"} message="Bạn cần đăng nhập để thực hiện chức năng này" />
    :   user?.role === "user" 
        ? <Outlet />
        : <RedirectPage to={"/"} message="Đang điều hướng đến trang chủ do đường dẫn không hợp lệ"/>
};

export default UserRoute;
