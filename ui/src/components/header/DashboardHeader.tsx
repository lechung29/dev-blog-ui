import React, { useState } from "react";
import "./index.scss";
import Search from "../common/searchbox/Search";
import { useImmerState } from "../../hook/useImmerState";
import { ThemeSwitch } from "../themeSwitch/ThemeSwitch";
import ChangeLanguage from "../changeLanguage/ChangeLanguage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Divider } from "../common/divider/Divider";
import { IPageRoute } from "../navigationPanel/NavigationPanel";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/users/UserSlice";
import { Image, ImageFit } from "../common/image/Image";
import { smallogoSrc } from "../utils/common/common";

export interface IDashboardHeaderState {
	search?: string;
	lang: "vie" | "eng";
}

const initialState: IDashboardHeaderState = {
	search: "",
	lang: "vie",
};

const DashboardHeader: React.FunctionComponent = () => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logoHeight: Readonly<number> = 34;
	const logoWidth: Readonly<number> = 240;
	const [state, setState] = useImmerState<IDashboardHeaderState>(initialState);
	const { user } = useSelector((state: RootState) => state.user);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const avatarMenuList: IPageRoute[] = [
		{
			title: "Trang chủ",
			route: "/",
			icon: <HomeIcon style={{color: "#5488c7"}}/>,
			onClick: () => {
				navigate("/");
			},
		},
		{
			title: "Thông tin cá nhân",
			route: "/profile",
			icon: <PersonIcon style={{color: "#5488c7"}}/>,
			onClick: () => {
				navigate("/profile");
			},
		},
		{
			title: "Đăng xuất",
			route: "/login",
			icon: <LogoutIcon style={{color: "#5488c7"}}/>,
			onClick: () => {
				dispatch(logout());
				navigate("/login");
			},
		},
	];

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ search: e.target.value });
	};

	const onChangeLanguage = () => {
		if (state.lang === "vie") {
			setState({ lang: "eng" });
		} else if (state.lang === "eng") {
			setState({ lang: "vie" });
		}
	};

	return (
		<div className="g-dashboard-header-section">
			<div className="g-dashboard-panel-logo">
				<Image src={smallogoSrc} objectFit={ImageFit.COVER} width={logoWidth} height={logoHeight} alt={"logo"} />
			</div>
			<div className="g-dashboard-header-searchbox">
				<Search
					id="id-g-searchbox-devblog"
					placeholder="Tìm kiếm"
					type="text"
					autoComplete="off"
					name="searchInput"
					value={state.search}
					onChange={onChangeSearch}
					onSearch={() => alert(state.search)}
				/>
			</div>
			<div className="g-dashboard-header-info">
				<ThemeSwitch size="small" checked={isDarkTheme} onChange={(_event, isChecked) => setIsDarkTheme(isChecked)} />
				<ChangeLanguage language={state.lang} onChangeLanguage={onChangeLanguage} />
				<Avatar
					style={{
						cursor: "pointer",
					}}
					alt={user?.displayName}
					src={user?.avatar}
					sx={{ width: 48, height: 48 }}
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
					<MenuItem style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "none", pointerEvents: "none", marginBottom: 4 }}>
						<Avatar alt={user?.displayName} src={user?.avatar} sx={{ width: 40, height: 40 }} />
						<div style={{ display: "flex", flexDirection: "column" }}>
							<p style={{ fontWeight: 600, fontSize: "0.875rem", color: "rgb(20, 21, 34)" }}>{user?.displayName}</p>
							<p style={{ fontWeight: 400, fontSize: "0.75rem", color: "rgb(84, 87, 122)" }}>{user?.email}</p>
						</div>
					</MenuItem>
					<Divider />
					{avatarMenuList.map((item, index) => (
						<MenuItem key={index} style={{ display: "flex", gap: "8px" }} onClick={item.onClick}>
							{item.icon}
							<p>{item.title}</p>
						</MenuItem>
					))}
				</Menu>
			</div>
		</div>
	);
};

export default DashboardHeader;
