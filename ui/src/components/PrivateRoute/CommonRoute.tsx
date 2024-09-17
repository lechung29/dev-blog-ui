import React from "react";
import { Outlet } from "react-router-dom";
import RedirectPage from "../redirectPage/RedirectPage";
import { useTranslation } from "react-i18next";

const CommonRoute: React.FunctionComponent = () => {
	const { t } = useTranslation()
	const token = localStorage.getItem("access_token")
	return token ? <Outlet /> : <RedirectPage to="/login" message={t("Required.Login.To.Access")} />;
};

export default CommonRoute;
