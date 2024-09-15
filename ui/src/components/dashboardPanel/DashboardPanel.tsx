import React, { useMemo } from "react";
import "./index.scss";
import { List, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router-dom";
import { adminPanelList, userPanelList } from "./index";
import { useAppSelector } from "../../redux/store/store";
import { userState } from "../../redux/reducers/users/UserSlice";
import { Label } from "../common/label/Label";
import { ITooltipHostPlacement } from "../common/tooltiphost/TooltipHost";

const DashboardPanel: React.FunctionComponent = () => {
	const { user } = useAppSelector(userState)
	
	const panelList = useMemo(() => {
		return user?.role === "admin" ? adminPanelList : userPanelList
	}, [user])

	return (
		<div className="g-dashboard-panel">
			<div className="g-dashboard-panel-content">
				<List
					className="g-dashboard-panel-list"
					component="nav"
					aria-labelledby="nested-list-subheader"
				>
					{panelList.map((item, index) => (
						<NavLink
							className={"g-dashboard-list-item"}
							key={index}
							to={item.route}
						>
							<ListItemIcon className="g-dashboard-item-icon">
								{item.icon}
							</ListItemIcon>
							<Label
								bold
								title={item.title}
								tooltipProps={{
									placement: ITooltipHostPlacement.Top,
									arrow: true,
								}}
								className="g-dashboard-item-title"
							/>
						</NavLink>
					))}
				</List>
			</div>
		</div>
	);
};

export default DashboardPanel;
