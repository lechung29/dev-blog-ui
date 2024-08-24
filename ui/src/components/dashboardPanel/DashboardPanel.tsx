import React from "react";
import "./index.scss";
// import { Image, ImageFit } from "../common/image/Image";
// import { smallogoSrc } from "../utils/common/common";
import { List, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router-dom";
import { adminPanelList, userPanelList } from "./index";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const DashboardPanel: React.FunctionComponent = () => {
	const role = useSelector((state: RootState) => state.user.user?.role)
	const panelList = role === "admin" ? adminPanelList : userPanelList
	return (
		<div className="g-dashboard-panel">
			<div className="g-dashboard-panel-content">
				<List sx={{ width: "100%", maxWidth: 360 }} component="nav" aria-labelledby="nested-list-subheader">
					{panelList.map((item, index) => (
                        <NavLink className={"g-dashboard-list-item"} key={index} to={item.route}>
                            <ListItemIcon style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", minWidth: "unset" }}>
                                {item.icon}
                            </ListItemIcon>
                            <p style={{textAlign: "start", flex: 1}}>{item.title}</p>
                        </NavLink>
                    ))}
				</List>
			</div>
		</div>
	);
};

export default DashboardPanel;
