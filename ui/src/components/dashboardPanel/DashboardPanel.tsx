import React from "react";
import "./index.scss";
import { Image, ImageFit } from "../common/image/Image";
import { smallogoSrc } from "../utils/common/common";
import { List, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router-dom";
import { userPanelList } from "./index";

const DashboardPanel: React.FunctionComponent = () => {
	const logoHeight: Readonly<number> = 34;
	const logoWidth: Readonly<number> = 250;
	return (
		<div className="g-dashboard-panel">
			<div className="g-dashboard-panel-logo">
				<Image src={smallogoSrc} objectFit={ImageFit.COVER} width={logoWidth} height={logoHeight} alt={"logo"} />
			</div>
			<div className="g-dashboard-panel-content">
				<List sx={{ width: "100%", maxWidth: 360 }} component="nav" aria-labelledby="nested-list-subheader">
					{userPanelList.map((item, index) => (
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
