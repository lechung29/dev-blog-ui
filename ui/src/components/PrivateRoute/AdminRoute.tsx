import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";
import RedirectPage from "../redirectPage/RedirectPage";
import { userState } from "../../redux/reducers/users/UserSlice";
import { useTranslation } from "react-i18next";

const AdminRoute: React.FunctionComponent = () => {
    const { user } = useAppSelector(userState);
    const { t } = useTranslation()
    return !user
        ? <RedirectPage to={"/login"} message={t("Required.Login.To.Access")} />
        : user?.role === "admin"
            ? <Outlet />
            : <RedirectPage to={"/"} message={t("Redirect.HomePage")} />
};

export default AdminRoute;
