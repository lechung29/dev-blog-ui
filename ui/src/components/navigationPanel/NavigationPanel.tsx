/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Anchor } from "../filterPanel/FilterPanel";
import { Box, Button, Stack, SwipeableDrawer } from "@mui/material";
import { IFunc } from "../../types/Function";
import { Label } from "../common/label/Label";
import CloseIcon from "@mui/icons-material/Close";
import "./index.scss"
import { Divider } from "../common/divider/Divider";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { Link } from "react-router-dom";
import { logout, userState } from "../../redux/reducers/users/UserSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { useTranslation } from "react-i18next";

interface INavigatePanelOwnProps {
    placement: Anchor;
    open: boolean;
    onClosePanel: () => void;
    onOpenPanel: () => void;
}

export interface IPageRoute {
    title: string;
    route: string;
    icon: JSX.Element;
    onClick?: () => void;
}


const NavigationPanel: React.FunctionComponent<INavigatePanelOwnProps> = (props) => {
    const { open, placement, onClosePanel, onOpenPanel } = props;
    const { user } = useAppSelector(userState)
    const dispatch = useAppDispatch();
    const { t } = useTranslation()


    const pageList: IPageRoute[] = [
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
            route: "/login",
            icon: <LogoutIcon style={{ color: "#5488c7" }} />,
            onClick: () => {
                dispatch(logout())
            }
        }
    ]


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

    const onRenderContent: IFunc<JSX.Element> = () => {
        return (
            <Box className="g-navigate-content">
                {pageList.map((page, index) => (
                    <Stack
                        key={index}
                        className="g-navigate-content-row"
                    >
                        {page.icon}
                        <Link
                            to={page.route}
                            onClick={page.onClick}
                            className="g-panel-navigate-link"
                        >
                            {page.title}
                        </Link>
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
