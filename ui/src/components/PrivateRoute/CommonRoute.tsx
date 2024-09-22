import React from "react";
import { Outlet } from "react-router-dom";
import RedirectPage from "../redirectPage/RedirectPage";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/store/store";
import { userState } from "../../redux/reducers/users/UserSlice";

const CommonRoute: React.FunctionComponent = () => {
	const { t } = useTranslation()
	const { user } = useAppSelector(userState)
	return user ? <Outlet /> : <RedirectPage to="/login" message={t("Required.Login.To.Access")} />;
};

export default CommonRoute;
