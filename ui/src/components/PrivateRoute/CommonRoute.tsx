import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import RedirectPage from "../redirectPage/RedirectPage";

const CommonRoute: React.FunctionComponent = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.user);
	return isLoggedIn ? <Outlet /> : <RedirectPage to="/login" message="Bạn cần đăng nhập để thực hiện chức năng này" />;
};

export default CommonRoute;
