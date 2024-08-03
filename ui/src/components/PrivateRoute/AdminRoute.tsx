import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import RedirectPage from "../redirectPage/RedirectPage";

const AdminRoute: React.FunctionComponent = () => {
	const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
	return !isLoggedIn 
    ?   <RedirectPage to={"/login"} message="Bạn cần đăng nhập để thực hiện chức năng này" />
    :   user?.role === "admin" 
        ? <Outlet />
        : <RedirectPage to={"/"} message="Đang điều hướng đến trang chủ do tài khoản không đủ quyền truy cập"/>
};

export default AdminRoute;
