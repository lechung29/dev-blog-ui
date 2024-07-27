import React from "react";
import "./index.scss";
import { Image, ImageFit } from "../common/image/Image";
import { engFlag, smallogoSrc, vieFlag } from "../utils/common/common";
import { Link, NavLink } from "react-router-dom";
import Search from "../common/searchbox/Search";
import { useImmerState } from "../../hook/useImmerState";
import Language from "./Language";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { IFunc } from "../../types/Function";
import { Avatar } from "@mui/material";
import NavigationPanel from "../navigationPanel/NavigationPanel";
import { TooltipHost } from "../common/tooltiphost/TooltipHost";

export interface IHeaderOwnProps {}

export interface IHeaderState {
    search?: string;
    isNavigatePanelOpen: boolean;
}

const initialState: IHeaderState = {
    search: "",
    isNavigatePanelOpen: false,
};

export const navbarListUrl = [
    {
        name: "Bài viết",
        path: "/newest",
    },
    {
        name: "Hỏi đáp",
        path: "/questions",
    },
    {
        name: "Thảo luận",
        path: "/discussions",
    },
];

const Header: React.FunctionComponent<IHeaderOwnProps> = (_props) => {
    const logoHeight: Readonly<number> = 30;
    const logoWidth: Readonly<number> = 220;
    const [state, setState] = useImmerState<IHeaderState>(initialState);
    const { search, isNavigatePanelOpen } = state;
    const {user, isLoggedIn} = useSelector((state: RootState) => state.user);


    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ search: e.target.value });
    };

    const onRenderAvatar: IFunc<JSX.Element> = () => {
        return isLoggedIn ? (
            <TooltipHost title={user?.displayName} >
                <Avatar 
                    style={{
                        cursor: "pointer"
                    }}
                    alt={user?.displayName} 
                    src={user?.avatar} 
                    onClick={() => setState({isNavigatePanelOpen: true})}
                />
            </TooltipHost>
        ) : (
            <Link className="g-header-main-right-link-auth" to={"/login"}>
                <LoginIcon fontSize={"small"} />
                <span>{"Đăng nhập/Đăng ký"}</span>
            </Link>
        );
    };

    const onRenderNavigatePanel: IFunc<JSX.Element> = () => {
        return <NavigationPanel 
            placement="right"
            open={isNavigatePanelOpen}
            onOpenPanel={() => setState({ isNavigatePanelOpen: true})}
            onClosePanel={() => setState({ isNavigatePanelOpen: false})}
        />
    }
    return (
        <section className="g-header-section">
            <div className="g-header-main-section">
                <div className="g-header-main-left-section">
                    <div className="g-header-main-left-logo">
                        <Image src={smallogoSrc} objectFit={ImageFit.COVER} width={logoWidth} height={logoHeight} alt={"logo"} />
                    </div>
                    <div className="g-header-main-left-navbar">
                        {navbarListUrl.map((item, index) => (
                            <NavLink className="g-header-main-left-navbar-item" key={index} to={item.path}>
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="g-header-main-right-section">
                    <Search
                        id="id-g-searchbox-devblog"
                        placeholder="Tìm kiếm trên Devblog"
                        type="text"
                        autoComplete="off"
                        name="searchInput"
                        value={search}
                        onChange={onChangeSearch}
                        onSearch={() => alert(search)}
                    />
                    <div className="g-header-main-right-action">
                        <Language
                            languages={[
                                { title: "Vietnamese", name: "vie", image: vieFlag },
                                { title: "English", name: "eng", image: engFlag },
                            ]}
                        />
                        {onRenderAvatar()}
                        {onRenderNavigatePanel()}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;
