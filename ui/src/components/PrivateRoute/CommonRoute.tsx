import React from "react";
import { Outlet } from "react-router-dom";
import RedirectPage from "../redirectPage/RedirectPage";

const CommonRoute: React.FunctionComponent = () => {
	const token = localStorage.getItem("access_token")
	return token ? <Outlet /> : <RedirectPage to="/login" message="Bạn cần đăng nhập để thực hiện chức năng này" />;
};

export default CommonRoute;
