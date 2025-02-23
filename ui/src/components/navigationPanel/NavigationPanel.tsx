/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Anchor } from "../filterPanel/FilterPanel";
import { Box, Button, Stack, SwipeableDrawer } from "@mui/material";
import { IAction, IAction1, IFunc } from "../../types/Function";
import { Label } from "../common/label/Label";
import CloseIcon from "@mui/icons-material/Close";
import "./index.scss"
import { Divider } from "../common/divider/Divider";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { Link, useNavigate, useParams } from "react-router-dom";
import { logout, userState } from "../../redux/reducers/users/UserSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { useTranslation } from "react-i18next";
import Search from "../common/searchbox/Search";
import { useMiniMobile, useMobile, useTablet } from "../../utils/Responsive";
import LanguageIcon from '@mui/icons-material/Language';
import ChangeLanguage from "../changeLanguage/ChangeLanguage";
import { AuthService } from "../../services/auth/AuthService";

interface INavigatePanelOwnProps {
    placement: Anchor;
    open: boolean;
    onClosePanel: () => void;
    onOpenPanel: () => void;
}

export interface IPageRoute {
    title: string;
    route?: string;
    icon: JSX.Element;
    onClick?: () => void;
}


const NavigationPanel: React.FunctionComponent<INavigatePanelOwnProps> = (props) => {
    const { open, placement, onClosePanel, onOpenPanel } = props;
    const { user } = useAppSelector(userState)
    const { searchText } = useParams()
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const isTablet = useTablet()
    const isMobile = useMobile()
    const isMiniMobile = useMiniMobile()
    const [search, setSearch] = useState<string>(searchText || "")
    const [language, setLanguage] = useState<string>(i18n.language)

    const userPageList: IPageRoute[] = [
        {
            title: t("Common.Information.Page"),
            route: "/profile",
            icon: <PersonIcon style={{ color: "#5488c7" }} />
        },
        {
            title: t("Management.Activity"),
            route: user?.role === "admin" ? "/admin-dashboard/overview" : "/user-dashboard/overview",
            icon: <SpaceDashboardIcon style={{ color: "#5488c7" }} />
        },
        {
            title: t("Common.Logout"),
            icon: <LogoutIcon style={{ color: "#5488c7" }} />,
            onClick: async () => {
                await AuthService.logoutUser(user!._id)
                dispatch(logout())
                navigate("/login")
            }
        }
    ]

    const onChangeSearch: IAction1<React.ChangeEvent<HTMLInputElement>> = (event) => {
        setSearch(event.target.value)
    };

    const onKeyDown: IAction1<React.KeyboardEvent> = (event) => {
        if (event.key === "Enter") {
            onSearchSubmit();
        }
    }

    const onSearchSubmit: IAction = () => {
        if (search) {
            navigate(`/search/${search}`)
        }
    };

    const finalPanel: IFunc<IPageRoute[]> = () => {
        const tempList: IPageRoute[] = []
        if (!user && !isMobile) {
            return tempList
        } else if (!user && isMobile) {
            tempList.push({
                title: t("Common.Login"),
                route: "/login",
                icon: <LogoutIcon style={{ color: "#5488c7" }} />,
                onClick: () => {
                    navigate("/login")
                }
            })
            return tempList
        } else {
            userPageList.forEach((item) => {
                tempList.push(item)
            })
            return tempList
        }
    }


    const onRenderTitle: IFunc<JSX.Element> = () => {
        return (
            <Stack className="g-navigate-header">
                <Stack className="g-navigate-header-row">
                    <Label
                        className="g-navigate-panel-title"
                        title={t("Common.Setting")}
                        bold
                    />
                    <Button
                        variant="text"
                        className="g-panel-close-button"
                        onClick={onClosePanel}
                    >
                        <CloseIcon className="g-filter-close-button-icon" />
                    </Button>
                </Stack>
                <Divider />
            </Stack>
        );
    };

    const onChangeLanguage: IAction = () => {
        if (language === "vn") {
            i18n.changeLanguage("en")
            setLanguage("en")
        } else if (language === "en") {
            i18n.changeLanguage("vn")
            setLanguage("vn")
        }
    };

    const onRenderContent: IFunc<JSX.Element> = () => {
        return (
            <Box className="g-navigate-content">
                {isMiniMobile && <div style={{ marginBottom: "1rem" }}>
                    <Search
                        id="id-g-searchbox-devblog"
                        placeholder={t("Common.Header.Search.Placeholder")}
                        type="text"
                        className="hello"
                        autoComplete="off"
                        name="searchInput"
                        value={search}
                        onChange={onChangeSearch}
                        onSearch={onSearchSubmit}
                        onKeyDown={onKeyDown}
                    />
                </div>}
                {(isTablet || isMobile) && <Stack className="g-language-content-row">
                    <Stack className="g-change-language-label">
                        <LanguageIcon style={{ color: "#5488c7" }} />
                        <Label
                            className="g-change-language-title"
                            title={t("Language.Change")}
                        />
                    </Stack>
                    <ChangeLanguage
                        language={language}
                        onChangeLanguage={onChangeLanguage}
                    />
                </Stack>}
                {finalPanel().map((page, index) => (
                    <Stack
                        key={index}
                        className="g-navigate-content-row"
                    >
                        {page.icon}
                        {!page.route
                            ? <div
                                style={{ cursor: "pointer" }}
                                onClick={page?.onClick}
                                className="g-panel-navigate-link"
                            >
                                {page.title}
                            </div>
                            : <Link
                                to={page.route}
                                className="g-panel-navigate-link"
                            >
                                {page.title}
                            </Link>
                        }
                    </Stack>
                ))}
            </Box>
        )
    };
    return (
        <SwipeableDrawer
            anchor={placement}
            open={open}
            onClose={onClosePanel}
            onOpen={onOpenPanel}
            className="g-navigate-panel-section"
        >
            <Box className="g-navigate-panel-box">
                {onRenderTitle()}
                {onRenderContent()}
            </Box>
        </SwipeableDrawer>
    );
};

export default NavigationPanel;
