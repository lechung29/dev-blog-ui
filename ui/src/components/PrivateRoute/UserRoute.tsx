import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";
import RedirectPage from "../redirectPage/RedirectPage";
import { userState } from "../../redux/reducers/users/UserSlice";
import { useTranslation } from "react-i18next";

const UserRoute: React.FunctionComponent = () => {
    const { user } = useAppSelector(userState)
    const { t } = useTranslation()
    const token = localStorage.getItem("access_token")
    return !token
        ? <RedirectPage to={"/login"} message={t("Required.Login.To.Access")} />
        : user?.role === "user"
            ? <Outlet />
            : <RedirectPage to={"/"} message={t("NotFound.Url.Redirect.HomePage")} />
};

export default UserRoute;
