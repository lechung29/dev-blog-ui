/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Anchor } from "../filterPanel/FilterPanel";
import { Box, Button, Stack, SwipeableDrawer } from "@mui/material";
import { IFunc } from "../../types/Function";
import { Label } from "../common/label/Label";
import CloseIcon from "@mui/icons-material/Close";
import "./index.scss"
import { Divider } from "../common/divider/Divider";
import { ThemeSwitch } from "../themeSwitch/ThemeSwitch";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/users/UserSlice";
import { RootState } from "../../redux/store/store";

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
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch();

    const pageList: IPageRoute[] = [
        {
            title: "Thông tin cá nhân",
            route: "/profile",
            icon: <PersonIcon style={{color: "#5488c7"}} />
        },
        {
            title: "Quản lý hoạt động",
            route: user?.role === "admin" ? "/admin-dashboard/create-post" : "/user-dashboard/create-post",
            icon: <SpaceDashboardIcon style={{color: "#5488c7"}}/>
        },
        {
            title: "Đăng xuất",
            route: "/login",
            icon: <LogoutIcon style={{color: "#5488c7"}}/>,
            onClick: () => {
                dispatch(logout())
            }
        }
    ]


    const onRenderTitle: IFunc<JSX.Element> = () => {
        return (
            <Stack display={"flex"} flexDirection={"column"} gap={2}>
                <Stack 
                    direction={"row"} 
                    display={"flex"} 
                    alignItems={"center"} 
                    height={"2.5rem"} 
                    justifyContent={"space-between"}
                >
                    <Label className="g-navigate-panel-title" title="Cài đặt" />
                    <Button 
                        variant="text" 
                        className="g-panel-close-button"
                        onClick={onClosePanel}
                    >
                        <CloseIcon style={{ color: "#b9b9b9" }} />
                    </Button>
                </Stack>
                <Divider />
            </Stack>
        );
    };

    const onRenderContent: IFunc<JSX.Element> = () => {
        return (
            <Box 
                style={{ flex: 1 }} 
                display={"flex"} 
                flexDirection={"column"} 
                gap={2} width={"100%"}
            >
                <Stack 
                    display={"flex"} 
                    flexDirection={"row"}  
                    alignItems={"center"} 
                    justifyContent={"space-between"}
                >
                    <Stack 
                        display={"flex"} 
                        flexDirection={"row"} 
                        alignItems={"center"} 
                        justifyContent={"flex-start"} 
                        gap={1}
                    >
                        <DarkModeIcon style={{color: "#5488c7"}}/>
                        <Label className="g-choose-theme-label" title="Chế độ tối" />
                    </Stack>
                    <ThemeSwitch
                        size="small"
                        checked={isDarkTheme}
                        onChange={(_event, isChecked) => setIsDarkTheme(isChecked)}
                    />
                </Stack>
                {pageList.map((page, index) => (
                    <Stack 
                        key={index} 
                        display={"flex"} 
                        flexDirection={"row"} 
                        alignItems={"center"} 
                        justifyContent={"flex-start"}
                        gap={1}
                    >
                        {page.icon}
                        <Link to={page.route} onClick={page.onClick} className="g-panel-navigate-link">{page.title}</Link>
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
            <Box display={"flex"} gap={3} flexDirection={"column"} justifyContent={"center"} width={"100%"} height={"100%"}>
                {onRenderTitle()}
                {onRenderContent()}
            </Box>
        </SwipeableDrawer>
    );
};

export default NavigationPanel;
