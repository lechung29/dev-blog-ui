import React from "react";
import "./index.scss";
import { Image, ImageFit } from "../common/image/Image";
import { engFlag, smallogoSrc, vieFlag } from "../utils/common/common";
import { Link, NavLink } from "react-router-dom";
import Search from "../common/searchbox/Search";
import { useImmerState } from "../../hook/useImmerState";
import Language from "./Language";
import LoginIcon from '@mui/icons-material/Login';

export interface IHeaderOwnProps {
    search?: string
}

const initialState: IHeaderOwnProps = {
    search: "",
}

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
    }
]

const Header: React.FunctionComponent<IHeaderOwnProps> = (props) => {
    const logoHeight: Readonly<number> = 30;
    const logoWidth: Readonly<number> = 220;
    const [state, setState] = useImmerState<IHeaderOwnProps>(initialState)
    const {search} = state


    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({search: e.target.value})
    }
    return <section className="g-header-section">
        <div className="g-header-main-section">
            <div className="g-header-main-left-section">
                <div className="g-header-main-left-logo">
                    <Image src={smallogoSrc} objectFit={ImageFit.COVER} width={logoWidth} height={logoHeight} alt={"logo"} />
                </div>
                <div className="g-header-main-left-navbar">
                    {navbarListUrl.map((item, index) => (
                        <NavLink className="g-header-main-left-navbar-item" key={index} to={item.path} >{item.name}</NavLink>
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
                            {title: "Vietnamese", name: "vie", image: vieFlag},
                            {title: "English", name: "eng", image: engFlag},
                        ]}
                    />
                    <Link className="g-header-main-right-link-auth" to={"/login"} >
                        <LoginIcon fontSize={"small"} />
                        <span>{"Đăng nhập/Đăng ký"}</span>
                    </Link>
                </div>
            </div>
        </div>
    </section>
};

export default Header;
