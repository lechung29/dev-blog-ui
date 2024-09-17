import React from "react";
import "./index.scss";
import Search from "../common/searchbox/Search";
import { useImmerState } from "../../hook/useImmerState";
import ChangeLanguage from "../changeLanguage/ChangeLanguage";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store/store";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Divider } from "../common/divider/Divider";
import { IPageRoute } from "../navigationPanel/NavigationPanel";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { logout, userState } from "../../redux/reducers/users/UserSlice";
import { Image, ImageFit } from "../common/image/Image";
import { smallLogoSrc } from "../utils/common/common";
import { IAction, IAction1 } from "../../types/Function";
import { useTranslation } from "react-i18next";

export interface IDashboardHeaderState {
	search?: string;
	lang: string;
	anchorEl: null | HTMLElement
}
;

const DashboardHeader: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useAppSelector(userState)
	const logoHeight: Readonly<number> = 34;
	const logoWidth: Readonly<number> = 240;
	const { t, i18n } = useTranslation()
	const initialState: IDashboardHeaderState = {
		search: "",
		lang: i18n.language,
		anchorEl: null,
	}
	const [state, setState] = useImmerState<IDashboardHeaderState>(initialState);
	const { anchorEl, lang, search } = state
	const open = Boolean(anchorEl);

	const avatarMenuList: IPageRoute[] = [
		{
			title: t("Common.Homepage"),
			route: "/",
			icon: <HomeIcon style={{ color: "#5488c7" }} />,
			onClick: () => {
				navigate("/");
			},
		},
		{
			title: t("Common.Information.Page"),
			route: "/profile",
			icon: <PersonIcon style={{ color: "#5488c7" }} />,
			onClick: () => {
				navigate("/profile");
			},
		},
		{
			title: t("Common.Logout"),
			route: "/login",
			icon: <LogoutIcon style={{ color: "#5488c7" }} />,
			onClick: () => {
				dispatch(logout());
				navigate("/login");
			},
		},
	];

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

	const handleClick: IAction1<React.MouseEvent<HTMLElement>> = (event) => {
		setState({ anchorEl: event.target })
	};
	const handleClose: IAction = () => {
		setState({ anchorEl: null })
	};

	const onChangeLanguage: IAction = () => {
		if (state.lang === "vn") {
			i18n.changeLanguage("en")
			setState({ lang: "en" });
		} else if (state.lang === "en") {
			i18n.changeLanguage("vn")
			setState({ lang: "vn" });
		}
	};

	return (
		<div className="g-dashboard-header-section">
			<div className="g-dashboard-panel-logo" onClick={() => navigate("/")}>
				<Image
					src={smallLogoSrc}
					objectFit={ImageFit.COVER}
					width={logoWidth}
					height={logoHeight}
					alt={"logo"}
				/>
			</div>
			<div className="g-dashboard-header-searchbox">
				<Search
					id="id-g-searchbox-devblog"
					placeholder={t("Common.Header.Search.Placeholder")}
					type="text"
					autoComplete="off"
					name="searchInput"
					value={search}
					onChange={onChangeSearch}
					onSearch={onSearchSubmit}
					onKeyDown={onKeyDown}
				/>
			</div>
			<div className="g-dashboard-header-info">
				<ChangeLanguage
					language={lang}
					onChangeLanguage={onChangeLanguage}
				/>
				<Avatar
					className="g-dashboard-header-avatar"
					alt={user?.displayName}
					src={user?.avatar}
					onClick={handleClick}
				/>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
							mt: 1.5,
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							"&::before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: "background.paper",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0,
							},
						},
					}}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				>
					<MenuItem className="g-dashboard-avatar-row">
						<Avatar
							className="g-dashboard-avatar-image"
							alt={user?.displayName}
							src={user?.avatar}
						/>
						<div className="g-dashboard-avatar-info">
							<p className="g-dashboard-avatar-info-name">{user?.displayName}</p>
							<p className="g-dashboard-avatar-info-email">{user?.email}</p>
						</div>
					</MenuItem>
					<Divider />
					{avatarMenuList.map((item, index) => (
						<MenuItem
							key={index}
							className="g-avatar-menu-item"
							onClick={item.onClick}
						>
							{item.icon}
							<p className="g-avatar-menu-item-title">{item.title}</p>
						</MenuItem>
					))}
				</Menu>
			</div>
		</div>
	);
};

export default DashboardHeader;
