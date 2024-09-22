/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./index.scss";
import { Image, ImageFit } from "../common/image/Image";
import { engFlag, smallLogoSrc, vieFlag } from "../utils/common/common";
import { Link, useNavigate, useParams } from "react-router-dom";
import Search from "../common/searchbox/Search";
import { useImmerState } from "../../hook/useImmerState";
import Language from "./Language";
import LoginIcon from "@mui/icons-material/Login";
import { useAppSelector } from "../../redux/store/store";
import { IAction, IAction1, IFunc } from "../../types/Function";
import { Avatar } from "@mui/material";
import NavigationPanel from "../navigationPanel/NavigationPanel";
import { TooltipHost } from "../common/tooltiphost/TooltipHost";
import { userState } from "../../redux/reducers/users/UserSlice";
import { useTranslation } from "react-i18next";
import AppsIcon from '@mui/icons-material/Apps';
import { IconButton } from "../common/button/iconbutton/IconButton";
import { useMiniMobile, useMobile, useTablet } from "../../utils/Responsive";

export interface IHeaderOwnProps { }

export interface IHeaderState {
    isNavigatePanelOpen: boolean;
    search: string;
}

const Header: React.FunctionComponent<IHeaderOwnProps> = (_props) => {
    const logoHeight: Readonly<number> = 30;
    const logoWidth: Readonly<number> = 220;
    const navigate = useNavigate()
    const isMobile = useMobile()
    const isMiniMobile = useMiniMobile()
    const isTablet = useTablet()
    const { searchText } = useParams()
    const { t } = useTranslation()
    const { user } = useAppSelector(userState)
    const initialState: IHeaderState = {
        isNavigatePanelOpen: false,
        search: searchText || "",
    };
    const [state, setState] = useImmerState<IHeaderState>(initialState);
    const { isNavigatePanelOpen, search } = state;


    const onChangeSearch: IAction1<React.ChangeEvent<HTMLInputElement>> = (event) => {
        setState((draft) => {
            draft.search = event.target.value;
        })
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

    const onRenderAvatar: IFunc<JSX.Element> = () => {
        return user
            ? (<TooltipHost title={user?.displayName} >
                <Avatar
                    className="g-header-avatar"
                    alt={user?.displayName}
                    src={user?.avatar}
                    onClick={() => setState({ isNavigatePanelOpen: true })}
                />
            </TooltipHost>)
            : (<Link className="g-header-main-right-link-auth" to={"/login"}>
                <LoginIcon fontSize={"small"} />
                <span>{t("Common.SignIn.SignUp")}</span>
            </Link>);
    }

    const handleOpenClosePanel: IAction1<boolean> = (status) => {
        setState((draft) => {
            draft.isNavigatePanelOpen = status;
        })
    }

    const onRenderNavigatePanel: IFunc<JSX.Element> = () => {
        return <NavigationPanel
            placement="right"
            open={isNavigatePanelOpen}
            onOpenPanel={() => handleOpenClosePanel(true)}
            onClosePanel={() => handleOpenClosePanel(false)}
        />
    }

    useEffect(() => {
        if (!isMobile && !user) {
            setState({ isNavigatePanelOpen: false })
        }
    }, [isMobile, user])

    return (
        <section className="g-header-section">
            <div className="g-header-main-section">
                <div className="g-header-main-left-section">
                    <div className="g-header-main-left-logo">
                        <Image
                            src={smallLogoSrc}
                            objectFit={ImageFit.COVER}
                            width={logoWidth}
                            height={logoHeight}
                            alt={"logo"}
                            onClick={() => {
                                navigate("/")
                            }}
                        />
                    </div>
                </div>
                {!isMiniMobile && <div className="g-header-main-center-section">
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
                <div className="g-header-main-right-section">
                    {!isTablet && !isMobile && <Language
                        languages={[
                            { title: "Language.English", name: "en", image: engFlag },
                            { title: "Language.Vietnamese", name: "vn", image: vieFlag },
                        ]}
                    />}
                    {!isMobile && onRenderAvatar()}
                    {isNavigatePanelOpen && onRenderNavigatePanel()}
                    {isMobile && <IconButton
                        size="large"
                        className="g-app-header-icon-button"
                        icon={<AppsIcon />}
                        onClick={() => setState({ isNavigatePanelOpen: true })}
                    />}
                </div>
            </div>
        </section>
    );
};

export default Header;
